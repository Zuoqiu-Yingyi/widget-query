/* 使用表格显示 SQL 查询结果 */

import { merge } from './../utils/misc.js';
import {
    ialParse,
    ialCreate,
    markdown2span,
    utf32Decode,
} from './../utils/string.js';
import {
    getBlockAttrs,
    setBlockAttrs,
    prependBlock,
    getBlockByID,
    updateBlock,
    insertBlock,
    sql,
} from "./../utils/api.js";

/* 更新块属性 */
export async function updateAttrs(data, attrs) {
    /* 更新 DOM 树中的块属性 */
    for (let key of Object.keys(attrs)) {
        data.node.setAttribute(key, attrs[key]);
    }
    /* 更新原数据中的块属性 */
    setBlockAttrs(data.id, attrs);
}

export async function initWidgetBlock(data) {
    /* 引入全局主题配置文件 */
    // const themeDefaultStyle = window.parent.document.getElementById('themeDefaultStyle');
    // const themeStyle = window.parent.document.getElementById('themeStyle');

    // if (themeDefaultStyle) {
    //     document.head.appendChild(themeDefaultStyle.cloneNode(true));
    // }
    // if (themeStyle) {
    //     document.head.appendChild(themeStyle.cloneNode(true));
    // }

    const query = window.document.getElementById("query");
    const checkbox = window.document.getElementById("checkbox");

    query.style.fontSize = data.config.query.theme.fontSize; // 按钮字号
    query.style.borderRadius = data.config.query.theme.radius; // 按钮圆角弧度
    query.style.color = data.config.query.theme.color.default; // 按钮文本颜色
    query.style.backgroundColor = data.config.query.theme.backgroundColor.default; // 按钮背景颜色

    window.document.body.style.color = data.config.query.theme.color.default; // 前景颜色

    window.document.documentElement.style.fontSize = `${data.fontSize}px`; // 默认字号跟随思源编辑器
    // window.document.documentElement.style.width = data.config.query.width;
    // window.document.documentElement.style.height = data.config.query.height;

    /* 设置挂件块样式 */
    window.frameElement.style.width = data.config.query.theme.width;
    window.frameElement.style.height = data.config.query.theme.height;
    window.frameElement.style.border = 'none';
    window.frameElement.style.backgroundColor = 'transparent';

    // console.log(data.id);
    return getBlockAttrs(data.id)
        .then((attrs) => {
            data.attrs = attrs;
            data.sql = attrs["custom-sql"] || data.sql;

            // 是否启用自动查询
            if (attrs["custom-query-auto"] === 'true') data.config.query.auto = true;
            window.document.getElementById('checkbox').checked = data.config.query.auto;
            if (data.config.query.auto) setTimeout(() => query.click(), 0);
            return 0;
        })
        .catch(err => {
            return err;
        });
}

export async function codeBlock(data) {
    let mode = 0; // 模式
    const previous_block = data.node.previousElementSibling; // 前置块
    data.attrs = await getBlockAttrs(data.id);
    let id = data.attrs['custom-input']; // 关联的代码块 ID
    let sql_block; // 含有 SQL 的块(代码块/嵌入块)
    // let code_block_attrs; // 前置块属性
    if (data.config.query.regs.id.test(id)) {
        sql_block = await getBlockByID(id); // 关联的代码块
        // code_block_attrs = await getBlockAttrs(id); // 关联的代码块属性
        // console.log(sql_block)
    }

    if (previous_block
        && previous_block.getAttribute("custom-type") === data.config.query.attribute.code
        && previous_block.dataset.type == "NodeCodeBlock"
    ) {
        // 挂件前的块是查询代码块
        id = previous_block.dataset.nodeId; // 代码块 ID
        mode = 4;
    }
    else if (sql_block
        && sql_block.type === 'c'
        // && code_block_attrs
        // && code_block_attrs['custom-type'] === data.config.query.attribute.code
    ) {
        // 存在关联的代码块
        await setBlockAttrs(sql_block.id, { 'custom-type': data.config.query.attribute.code }); // 设置代码块属性
        mode = 6;
    }
    else if (sql_block
        && sql_block.type === 'query_embed'
        // && code_block_attrs
        // && code_block_attrs['custom-type'] === data.config.query.attribute.code
    ) {
        // 存在关联的嵌入块
        await setBlockAttrs(sql_block.id, { 'custom-type': data.config.query.attribute.code }); // 设置代码块属性
        mode = 7;
    }
    else if (previous_block == null) {
        // 挂件位于文档/引用块/超级快首部
        if (data.node.parentElement.dataset.nodeId == null) {
            // 挂件位于文档首
            id = data.node.parentElement.parentElement
                .querySelector("div[data-node-id]")
                .dataset.nodeId; // 上级块 ID
            mode = 1;
        } else {
            // 挂件位于引用块/超级快首部
            id = data.node.parentElement.dataset.nodeId; // 上级块 ID
            mode = 2;
        }
    } else if (
        previous_block.getAttribute("class").search("protyle-action") != -1
    ) {
        // 挂件位于列表项中第一个块
        id = data.node.parentElement.dataset.nodeId; // 上级块 ID
        mode = 3;
    } else {
        // 挂件前的块不是代码块/不是查询代码块
        id = previous_block.dataset.nodeId; // 代码块 ID
        mode = 5;
    }
    switch (mode) {
        case 1:
        case 2:
        case 3:
            prependBlock(
                id,
                "markdown",
                `\`\`\`sql\n${data.sql}\n\`\`\`\n{: custom-type="${data.config.query.attribute.code}"}`
            ).then((block) => {
                if (block == null) return -1;
                data.previous_id = block[0].doOperations[0].id;
                return 1;
            });
            return 2;
        case 4:
            sql_block = await getBlockByID(id);
            data.previous_id = sql_block.id;
            data.sql = sql_block.content;
            return 0;
        case 5:
            insertBlock(
                id,
                "markdown",
                `\`\`\`sql\n${data.sql}\n\`\`\`\n{: custom-type="${data.config.query.attribute.code}"}`
            ).then((block) => {
                if (block == null) return -2;
                data.previous_id = block[0].doOperations[0].id;
                return 3;
            });
            return 4;
        case 6: // 存在关联的代码块
            data.previous_id = sql_block.id;
            data.sql = sql_block.content;
            return 0;
        case 7: // 存在关联的嵌入块
            const match = data.config.query.regs.query.exec(sql_block.markdown);
            if (match && match.length === 2) {
                data.previous_id = sql_block.id;
                data.sql = match[1];
                return 0;
            }
            else return -4;
        default:
            return -3;
    }
}

export async function widgetBlock(data) {
    // 获取配置,并合并到配置对象
    await mergeConfig(data);
    // console.log(data.config);

    // 主要目的是为了更新custom-sql属性
    await setBlockAttrs(
        data.id,
        {
            "custom-sql": data.sql,
            "custom-type": data.config.query.attribute.widget,
        }
    );

    if (data.config.query.sql.limit.enable) {
        // 是否启用默认查询记录数量限制
        if (data.sql.search(data.config.query.regs.limit) == -1) {
            // 原查询语句中不包含 LIMIT 关键字
            data.sql = `${data.sql}\nLIMIT ${data.config.query.sql.limit.begin}, ${data.config.query.sql.limit.end}`;
        }
    }

    // await setBlockAttrs(data.id, { 'custom-sql': data.sql });
    if (data.config.query.template.enable) {
        let RealSql = await data.config.query.template.handler(data);
        data.rows = await sql(RealSql);
    } else data.rows = await sql(data.sql);
    // console.log(data.rows);

    if (data.rows == null) {
        // error: SQL 语句错误
        return -1;
    }

    const markdown = [];
    const colgroup = [];

    if (data.config.query.regs.blocks.test(data.sql)) {
        // 匹配指定正则的 SQL 查询, 是 `SELECT * FROM blocks ...` 语句

        const header = ['|']; // 表头
        const align = ['|']; // 对齐样式
        const ial_keys = data.config.query.render.ial.fields.forced.length
            ? data.config.query.render.ial.fields.forced
            : []; // IAL 的有效键名

        // 过滤查询结果
        if (data.config.query.filter.blocks.enable) {
            // 启用查询结果过滤
            data.rows = data.rows.filter(row => {
                let flag_filtrate = false; // 是否过滤
                for (const handler of data.config.query.filter.blocks.handlers) {
                    if (handler(row, data)) {
                        flag_filtrate = true;
                        break;
                    }
                }
                return !flag_filtrate;
            });
        }

        // 表头
        if (data.config.query.index.enable) {
            // 是否启用编号
            header.push("    |");
            align.push(" --: |");
            colgroup.push("");
        }
        for (const field of data.config.query.fields) {
            // 根据自定义字段列表，构造表头
            if (field === 'ial') {
                if (ial_keys.length === 0) {
                    const ial_keys_raw = new Set(data.config.query.rows.ials.keys(data.rows, ialParse));
                    const ial_keys_ignore = new Set(data.config.query.render.ial.fields.ignore);
                    const ial_keys_valid = data.config.query.render.ial.fields.valid;
                    if (ial_keys_valid.length > 0) { // 白名单非空, 白名单 - 黑名单是有效的
                        for (const key of ial_keys_valid) {
                            if (ial_keys_raw.has(key) && !ial_keys_ignore.has(key)) ial_keys.push(key);
                        }
                    }
                    else { // 白名单为空时，黑名单外是有效的
                        for (const key of Array.from(ial_keys_raw).sort()) {
                            if (!ial_keys_ignore.has(key)) ial_keys.push(key);
                        }
                    }
                    // console.log(ial_keys);
                }
                switch (data.config.query.render.ial.shape) {
                    case 'columns':
                        ial_keys.forEach((key) => {
                            header.push(` ${markdown2span(key, data.config.query.render.ial.style.columns.key)} |`);
                            align.push(` ${data.config.query.style.align[field]} |`);
                        });
                        continue;
                    case 'rows':
                    default:
                        break;
                }
            }
            header.push(` ${field} |`);
            align.push(` ${data.config.query.style.align[field]} |`);
            colgroup.push(data.config.query.style.column[field]);
        }
        markdown.push(header.join(""));
        markdown.push(align.join(""));

        if (data.rows.length > 0) {
            // REF [JS几种数组遍历方式以及性能分析对比 | Dailc的个人主页](https://dailc.github.io/2016/11/25/baseKnowlenge_javascript_jsarrayGoThrough.html)
            for (let i = 0, len = data.rows.length; i < len; i++) {
                // 每一条查询记录
                const row = data.rows[i];
                // console.log(row);

                // 解析内联属性列表(inline attribute list, IAL)
                const ial = ialParse(row.ial);
                if (ial.icon) {
                    if (data.config.query.regs.hex.test(ial.icon)) {
                        // 如果是 UTF-32 编码的字符
                        ial.icon = utf32Decode(ial.icon);
                    }
                    else {
                        ial.icon = `:${ial.icon.replace(/\.\w+$/, '')}:`;
                    }
                }

                const row_markdown = ['|'];
                if (data.config.query.index.enable) {
                    row_markdown.push(` ${i + 1} |`);
                }
                for (const field of data.config.query.fields) {
                    // 根据自定义字段列表，构造表格
                    row_markdown.push(` ${data.config.query.handler[field](row, ial, ial_keys)} |`);
                }

                markdown.push(row_markdown.join(""));
                // console.log(markdown[markdown.length - 1]);
            }
        }
        else {
            // warning: 查询结果为空
            return 1;
        }
    } else {
        let header_row = null;
        if (data.rows.length > 0) {
            header_row = data.rows[0];
            const header = ['|']; // 表头
            const align = ['|']; // 对齐样式
            const renderer = {}; // 渲染器
            const keys = Object.keys(header_row);
            if (data.config.query.index.enable) {
                header.push('    |');
                align.push(' --: |');
                colgroup.push("");
            }
            for (const key of keys) {
                if (key.startsWith(data.config.query.prefix.hidden)) // 不显示该字段
                    continue;

                header.push(` ${data.config.query.default.name(key)} |`);
                align.push(` ${data.config.query.default.style.align} |`);
                colgroup.push(data.config.query.default.style.column);
                renderer[key] = data.config.query.default.handler(key);
            }
            markdown.push(header.join("")); // 表头
            markdown.push(align.join("")); // 对齐样式

            if (data.rows.length > 0) {
                for (let index = 1, len = data.rows.length; index <= len; index++) {
                    // 每一条查询记录
                    let row = data.rows[index - 1];
                    // console.log(row);

                    let row_markdown = [`|`];
                    if (data.config.query.index.enable) {
                        row_markdown.push(`${index} |`);
                    }
                    for (var key of keys) {
                        if (key.startsWith(data.config.query.prefix.hidden)) // 不显示该字段
                            continue;

                        if (row[key] == "" || row[key] == null || row[key] == undefined) {
                            row_markdown.push(` |`);
                        } else {
                            row_markdown.push(` ${renderer[key](row, key)} |`);
                        }
                    }
                    markdown.push(row_markdown.join(""));
                }
            }
        }
        else {
            // warning: 查询结果为空
            return 2;
        }
    }

    data.markdown = markdown;
    data.colgroup = colgroup;
    // console.log(data.markdown);
    return 0;
}

export async function tableBlock(data) {
    // 将查询结果渲染到页面中
    const next_block = data.node.nextElementSibling;
    // console.log(next_block);

    /* 获取使用 ID 关联的表格 */
    const table_id = data.attrs['custom-output']; // 表格块 ID
    let table_block; // 表格块
    let table_attrs, id, fn;

    if (data.config.query.regs.id.test(table_id)) table_block = await getBlockByID(table_id);

    if (next_block
        && next_block.getAttribute("custom-type") === data.config.query.attribute.table
        && next_block.dataset.type == "NodeTable"
    ) { // 下一节点为查询结果, 那么更改该块
        id = next_block.dataset.nodeId;
    }
    else if (table_block && table_block.type === 't') {
        // 下一节点不为查询结果, 且存在关联的表格块, 那么更新该表格块
        id = table_id;
    }
    else id = null; // 下一节点不为查询结果, 且不存在关联的表格块, 那么需要在下方插入新的表格块

    /* 表格块的 IAL */
    const table_ial = {
        'colgroup': data.colgroup.join('|'),
        'custom-type': data.config.query.attribute.table,
    };
    if (data.config.query.style.table.enable) {
        // 添加 config 中设置的自定义属性
        for (const attribute of data.config.query.style.table.attributes) {
            if (attribute.enable) table_ial[attribute.key] = attribute.value;
        }
    }

    if (id) {
        // 保持块属性不变的情况下更新查询结果节点
        table_attrs = await getBlockAttrs(id);
        if (table_attrs) { // 合并原有块自定义属性
            for (const key in table_attrs) { // 移除所有非自定义属性
                switch (key) {
                    case 'bookmark':
                    case 'name':
                    case 'alias':
                    case 'memo':
                    case 'fold':
                    case 'style':
                        continue; // 保留部分内置属性

                    default: // 移除其他非自定义属性
                        if (!key.startsWith("custom-")) delete table_attrs[key];
                        break;
                }
            }
            merge(table_ial, table_attrs); // 合并原自定义属性
        };
        // console.log(table_ial);
        fn = updateBlock;
    } else {
        // 若下一节点无查询结果
        // 创建查询结果节点
        id = data.id;
        fn = insertBlock;
    }
    data.markdown.push(ialCreate(table_ial));
    const response = await fn(id, "markdown", data.markdown.join('\n'));
    if (response) {
        data.next_id = response[0].doOperations[0].id;
        return 0;
    }
    else return -1;
}

async function mergeConfig(data) {
    await getBlockAttrs(data.id).then((attrs) => {
        data.attrs = attrs;
        1; // 合并展示的字段
        Object.getOwnPropertyNames(attrs).forEach(function (key) {
            assignIfNotNull(attrs[key], (v) => {
                if (key.startsWith("custom-query-")) {
                    try {
                        // 按照-分割,依次解析
                        const keys = key.substring(7).replaceAll("-", ".");

                        // 获取表达式
                        const expr = `data.config.${keys}`;

                        // 替换转义字符
                        v = v.replaceAll("&quot;", '"');

                        // 判断该属性是否合法
                        if (eval(`${expr} === undefined`))
                            throw new Error(expr);

                        // 覆盖属性
                        eval(`${expr} = ${v};`);
                    } catch (e) {
                        return;
                    }
                }
            });
        });
    });
}

function assignIfNotNull(obj, callback) {
    if (obj == null || obj === undefined) {
        return;
    }
    callback(obj);
}
