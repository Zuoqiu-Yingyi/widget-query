import {
    getBlockAttrs,
    setBlockAttrs,
    prependBlock,
    getBlockByID,
    updateBlock,
    insertBlock,
    sql,
} from './api.js';
export async function templateParse(data) {
    // 部分解析markdown中的模板参数
    let sql   = data.sql
    let block =  await getBlockByID(data.id)
    let paren_block = await getBlockByID(block.parent_id)
    let doc_block =  await getBlockByID(block.root_id)
    sql = parseBlock(sql,block,".block")
    paren_block?sql = parseBlock(sql,paren_block,".parent"):null
    doc_block?sql = parseBlock(sql,doc_block,".action"):null
    console.log(sql)
    return sql
}

function parseBlock(sql,block,prefix){
    for (let  attributeName in  block){
        let templateAction  =  `${prefix}{.${attributeName}}`
        console.log(templateAction)
        let blockAttribute = block[attributeName]
        sql = sql.replace(templateAction,blockAttribute)
        console.log(sql)

    }
    return sql
}
