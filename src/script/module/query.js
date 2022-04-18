/* 使用表格显示 SQL 查询结果 */

import {
    ialParser,
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
    let query = window.document.getElementById("query");
    query.style.borderRadius = data.config.query.radius;
    window.document.body.style.borderRadius = data.config.query.radius;
    // window.document.querySelector('html').style.width = data.config.query.width;
    // window.document.querySelector('html').style.height = data.config.query.height;
    window.frameElement.style.width = data.config.query.width;
    window.frameElement.style.height = data.config.query.height;

    // console.log(data.id);
    getBlockAttrs(data.id).then((attrs) => {
        if (attrs["custom-sql"] == null) {
            setBlockAttrs(data.id, {
                "custom-sql": data.sql,
                "custom-type": data.config.query.attribute.widget,
            });
        } else data.sql = attrs["custom-sql"];

        // 是否启用自动查询
        if (attrs["custom-query-auto"] === 'true') data.config.query.auto = true;
        window.document.getElementById('checkbox').checked = data.config.query.auto;
        if (data.config.query.auto) setTimeout(() => query.click(), 0);
    });
}

export async function codeBlock(data) {
    let previous_block = data.node.previousElementSibling;
    let id = null;
    let mode = 0;
    if (previous_block == null) {
        // 挂件位于文档/引用块/超级快首部
        if (data.node.parentElement.dataset.nodeId == null) {
            // 挂件位于文档首
            id = data.node.parentElement.parentElement
                .querySelector("div[data-node-id]")
                .dataset.nodeId;
            mode = 1;
        } else {
            // 挂件位于引用块/超级快首部
            id = data.node.parentElement.dataset.nodeId;
            mode = 2;
        }
    } else if (
        previous_block.getAttribute("class").search("protyle-action") != -1
    ) {
        // 挂件位于列表项中第一个块
        id = data.node.parentElement.dataset.nodeId;
        mode = 3;
    } else if (
        previous_block.getAttribute("custom-type") ==
        data.config.query.attribute.code &&
        previous_block.dataset.type == "NodeCodeBlock"
    ) {
        // 挂件前的块是查询代码块
        id = previous_block.dataset.nodeId;
        mode = 4;
    } else {
        // 挂件前的块不是代码块/不是查询代码块
        id = previous_block.dataset.nodeId;
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
            let sql_block = await getBlockByID(id);
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

    let markdown = [];

    if (data.config.query.regs.blocks.test(data.sql)) {
        // 匹配指定正则的 SQL 查询, 是 `SELECT * FROM blocks ...` 语句

        let header = ['|']; // 表头
        let align = ['|']; // 对齐样式
        let ial_keys = data.config.query.render.ial.fields.forced.length
            ? data.config.query.render.ial.fields.forced
            : []; // IAL 的有效键名

        // 过滤查询结果
        if (data.config.query.filter.blocks.enable) {
            // 启用查询结果过滤
            data.rows = data.rows.filter(row => {
                let flag_filtrate = false; // 是否过滤
                for (let handler of data.config.query.filter.blocks.handlers) {
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
            align.push(" -: |");
        }
        for (let field of data.config.query.fields) {
            // 根据自定义字段列表，构造表头
            if (field === 'ial') {
                if (ial_keys.length === 0) {
                    let ial_keys_raw = new Set(data.config.query.rows.ials.keys(data.rows, ialParser));
                    let ial_keys_ignore = new Set(data.config.query.render.ial.fields.ignore);
                    let ial_keys_valid = data.config.query.render.ial.fields.valid;
                    if (ial_keys_valid.length > 0) { // 白名单非空, 白名单 - 黑名单是有效的
                        for (let key of ial_keys_valid) {
                            if (ial_keys_raw.has(key) && !ial_keys_ignore.has(key)) ial_keys.push(key);
                        }
                    }
                    else { // 白名单为空时，黑名单外是有效的
                        for (let key of Array.from(ial_keys_raw).sort()) {
                            if (!ial_keys_ignore.has(key)) ial_keys.push(key);
                        }
                    }
                    // console.log(ial_keys);
                }
                switch (data.config.query.render.ial.shape) {
                    case 'columns':
                        ial_keys.forEach((key) => {
                            header.push(` ${markdown2span(key, data.config.query.render.ial.style.columns.key)}${data.config.query.style.column[field]} |`);
                            align.push(` ${data.config.query.style.align[field]} |`);
                        });
                        continue;
                    case 'rows':
                    default:
                        break;
                }
            }
            header.push(` ${field}${data.config.query.style.column[field]} |`);
            align.push(` ${data.config.query.style.align[field]} |`);
        }
        markdown.push(header.join(""));
        markdown.push(align.join(""));

        if (data.rows.length > 0) {
            // REF [JS几种数组遍历方式以及性能分析对比 - 撒网要见鱼 - 博客园](https://www.cnblogs.com/dailc/p/6103091.html)
            for (let i = 0, len = data.rows.length; i < len; i++) {
                // 每一条查询记录
                let row = data.rows[i];
                // console.log(row);

                // 解析内联属性列表(inline attribute list, IAL)
                let ial = ialParser(row.ial);
                if (ial.icon) {
                    if (data.config.query.regs.hex.test(ial.icon)) {
                        // 如果是 UTF-32 编码的字符
                        ial.icon = utf32Decode(ial.icon);
                    }
                    else {
                        ial.icon = `:${ial.icon.replace(/\.\w+$/, '')}:`;
                    }
                }

                let row_markdown = ['|'];
                if (data.config.query.index.enable) {
                    row_markdown.push(` ${i + 1} |`);
                }
                for (let field of data.config.query.fields) {
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
            let header = ['|']; // 表头
            let align = ['|']; // 对齐样式
            let renderer = {}; // 渲染器
            let keys = Object.keys(header_row);
            if (data.config.query.index.enable) {
                header.push('    |');
                align.push(' -: |');
            }
            for (var key of keys) {
                if (key.startsWith(data.config.query.prefix.hidden)) // 不显示该字段
                    continue;

                header.push(` ${data.config.query.default.name(key)}${data.config.query.default.style.column} |`);
                align.push(` ${data.config.query.default.style.align} |`);
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
    let table_attrs = [];
    table_attrs.push(`custom-type="${data.config.query.attribute.table}"`);
    if (data.config.query.style.table.enable) {
        for (let attribute of data.config.query.style.table.attributes) {
            if (attribute.enable) {
                table_attrs.push(`${attribute.key}="${attribute.value}"`);
            }
        }
    }
    markdown.push(`{: ${table_attrs.join(" ")} }`);
    data.markdown = markdown.join("\n");
    // console.log(data.markdown);
    return 0;
}

export async function tableBlock(data) {
    // 将查询结果渲染到页面中
    let next_block = data.node.nextElementSibling;
    // console.log(next_block);

    if (
        next_block &&
        next_block.getAttribute("custom-type") ==
        data.config.query.attribute.table &&
        next_block.dataset.type == "NodeTable"
    ) {
        // 若下一节点有查询结果
        // 更新查询结果节点
        let id = next_block.dataset.nodeId;
        updateBlock(id, "markdown", data.markdown).then((block) => {
            if (block == null) return -1;
            data.next_id = block[0].doOperations[0].id;
        });
    } else {
        // 若下一节点无查询结果
        // 创建查询结果节点
        insertBlock(data.id, "markdown", data.markdown).then((block) => {
            if (block == null) return -2;
            data.next_id = block[0].doOperations[0].id;
        });
    }
    return 0;
}

async function mergeConfig(data) {
    await getBlockAttrs(data.id).then((attrs) => {
        1; // 合并展示的字段
        Object.getOwnPropertyNames(attrs).forEach(function (key) {
            assignIfNotNull(attrs[key], (v) => {
                if (key.startsWith("custom-")) {
                    try {
                        // 按照-分割,依次解析
                        let keys = key.substring(7).replaceAll("-", ".");

                        // 获取表达式
                        let expr = `data.config.${keys}`;

                        // 替换转义字符
                        v = v.replaceAll("&quot;", '"');

                        // 判断该属性是否合法
                        if (eval(`${expr} == null || ${expr} == undefined`))
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
