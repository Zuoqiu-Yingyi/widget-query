import {
    getBlockByID,
} from './api.js';

export async function templateParse(data) {
    // 部分解析 SQL 语句中的模板参数
    let sql = data.sql;

    let block = await getBlockByID(data.id);
    sql = parseBlock(sql, block, ".block");

    let parent_block = await getBlockByID(block.parent_id);
    parent_block ? sql = parseBlock(sql, parent_block, ".parent") : null;

    let doc_block = await getBlockByID(block.root_id);
    doc_block ? sql = parseBlock(sql, doc_block, ".root") : null;
    // console.log(sql);
    return sql;
}

function parseBlock(sql, block, prefix) {
    for (let attributeName in block) {
        let templateAction = `${prefix}{.${attributeName}}`;
        // console.log(templateAction);
        let blockAttribute = block[attributeName];
        sql = sql.replaceAll(templateAction, blockAttribute);
        // console.log(sql);
    }
    return sql;
}
