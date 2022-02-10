/* 使用表格显示 SQL 查询结果 */

import { config } from './config.js';

import {
    getBlockAttrs,
    setBlockAttrs,
    prependBlock,
    getBlockByID,
    updateBlock,
    insertBlock,
    sql,
} from './../utils/api.js';
import {
    templateParse
} from './../utils/templateParser.js'

export async function initWidgetBlock(data) {
    window.document.getElementById('query').style['border-radius'] = data.config.radius;
    // window.document.querySelector('html').style.width = data.config.width;
    // window.document.querySelector('html').style.height = data.config.height;
    window.frameElement.style.width = data.config.width;
    window.frameElement.style.height = data.config.height;

    // console.log(data.id);
    getBlockAttrs(data.id).then(attrs => {
        if (attrs['custom-sql'] == null) {
            setBlockAttrs(data.id, {
                'custom-sql': data.sql,
            });
        }
        else data.sql = attrs['custom-sql'];
    });
}

export async function codeBlock(data) {
    let previous_block = data.node.previousElementSibling;
    let id = null;
    let mode = 0;
    if (previous_block == null) { // 挂件位于文档/引用块/超级快首部
        if (data.node.parentElement.getAttribute('data-node-id') == null) { // 挂件位于文档首
            id = data.node.parentElement.parentElement.querySelector('div[data-node-id]').getAttribute('data-node-id');
            mode = 1;
        }
        else { // 挂件位于引用块/超级快首部
            id = data.node.parentElement.getAttribute('data-node-id');
            mode = 2;
        }
    }
    else if (previous_block.getAttribute('class') == 'protyle-action') { // 挂件位于列表项中第一个块
        id = data.node.parentElement.getAttribute('data-node-id');
        mode = 3;
    }
    else if (previous_block.getAttribute('custom-type') == 'query'
        && previous_block.getAttribute('data-type') == 'NodeCodeBlock') { // 挂件前的块是查询代码块
        id = previous_block.getAttribute('data-node-id');
        mode = 4;
    }
    else { // 挂件前的块不是代码块/不是查询代码块
        id = previous_block.getAttribute('data-node-id');
        mode = 5;
    }
    switch (mode) {
        case 1:
        case 2:
        case 3:
            prependBlock(
                id,
                'markdown',
                `\`\`\`sql\n${data.sql}\n\`\`\`\n{: custom-type="query"}`,
            ).then(block => {
                if (block == null) return -1;
                data.code_block_id = block[0].doOperations[0].id;
                return 1;
            });
            return 2;
        case 4:
            let sql_block = await getBlockByID(id);
            data.sql = sql_block.content;
            return 0;
        case 5:
            insertBlock(
                id,
                'markdown',
                `\`\`\`sql\n${data.sql}\n\`\`\`\n{: custom-type="query"}`,
            ).then(block => {
                if (block == null) return -2;
                return 3;
            });
            return 4;
        default:
            return -3;
    }
}

export async function widgetBlock(data) {
    await setBlockAttrs(data.id, { 'custom-sql': data.sql });
    // data.rows = await sql(data.sql);
    let RealSql = await templateParse(data)
    data.rows = await sql(RealSql);
    // console.log(data.rows);
    if (data.rows == null) {
        return -1;
    }
    else if (data.rows.length <= 0) {
        // window.alert("查询结果为空!\nThe query result is empty!");
        return 1;
    }

    let markdown = [];

    if (data.config.query.regs.blocks.test(data.sql)) { // 匹配指定正则的 SQL 查询
        let header = []; // 表头
        let align = []; // 对齐样式
        header.push('|    |');
        align.push('| -: |');
        for (let field of data.config.query.fields) { // 根据自定义字段列表，构造表头
            header.push(` ${field} |`);
            align.push(` ${data.config.query.align[field]} |`);
        }
        markdown.push(header.join(''));
        markdown.push(align.join(''));

        // REF [JS几种数组遍历方式以及性能分析对比 - 撒网要见鱼 - 博客园](https://www.cnblogs.com/dailc/p/6103091.html)
        for (let i = 1, len = data.rows.length; i <= len; i++) {
            // 每一条查询记录
            let row = data.rows[i - 1];
            // console.log(row);

            let row_markdown = [];
            row_markdown.push(`| ${i} |`);
            for (let field of data.config.query.fields) { // 根据自定义字段列表，构造表格
                row_markdown.push(` ${data.config.query.handler[field](row)} |`);
            }

            markdown.push(row_markdown.join(''));
        }
    }
    else {
        let header = []; // 表头
        let align = []; // 对齐样式
        let header_row = data.rows[0];
        let keys = Object.keys(header_row)
        header.push(`|    |`);
        align.push(`| -: |`);
        for (var key of keys) {
            header.push(` ${key} |`);
            align.push(` :- |`);
        }
        markdown.push(header.join('')); // 表头
        markdown.push(align.join('')); // 对齐样式

        for (let i = 1, len = data.rows.length; i <= len; i++) {
            // 每一条查询记录
            // console.log(row);
            let row = data.rows[i - 1];
            let row_markdown = [];
            row_markdown.push(`| ${i} |`);
            for (var key of keys) {
                if (row[key] == '' || row[key] == null || row[key] == undefined) {
                    row_markdown.push(` |`);
                }
                else {
                    row_markdown.push(` \`${row[key]}\` |`);
                }
            }
            markdown.push(row_markdown.join(''));
        }
    }

    markdown.push('{: custom-type="query-result"}');
    data.markdown = markdown.join('\n');
    // console.log(data.markdown);
    return 0;
}

export async function tableBlock(data) {
    // 将查询结果渲染到页面中
    let next_block = data.node.nextElementSibling;
    // console.log(next_block);

    if (next_block
        && next_block.getAttribute('custom-type') == 'query-result'
        && next_block.getAttribute('data-type') == 'NodeTable'
    ) { // 若下一节点有查询结果
        // 更新查询结果节点
        let id = next_block.getAttribute('data-node-id');
        await updateBlock(
            id,
            'markdown',
            data.markdown,
        );
    } else { // 若下一节点无查询结果
        // 创建查询结果节点
        await insertBlock(
            data.id,
            'markdown',
            data.markdown,
        );
    }
    return 0;
}

