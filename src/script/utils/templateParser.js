import {
    getBlockByID,
} from './api.js';

export async function templateParse(data) {
    return await parseBlock(data.sql, data.id);
}

const PREFIXS = [
    'block',
    'parent',
    'root',
];
const ATTRIBUTE_NAMES = [
    'id',
    'parent_id',
    'root_id',
    'hash',
    'box',
    'path',
    'hpath',
    'name',
    'alias',
    'memo',
    'content',
    'fcontent',
    'markdown',
    'length',
    'type',
    'subtype',
    'ial',
    'sort',
    'created',
    'updated',
];

async function parseBlock(sql, id) {
    let widget_block = null;
    let parent_block = null;
    let root_block = null;
    let block = null;
    for (let prefix of PREFIXS) {
        for (let attrName of ATTRIBUTE_NAMES) {
            let templateAction = `.${prefix}{.${attrName}}`;

            // console.log(templateAction);
            if (sql.includes(templateAction)) {
                switch (prefix) {
                    case PREFIXS[0]:
                        if (!widget_block) widget_block = await getBlockByID(id);
                        block = widget_block;
                        break;
                    case PREFIXS[1]:
                        if (!widget_block) widget_block = await getBlockByID(id);
                        if (!parent_block) parent_block = await getBlockByID(widget_block.parent_id);
                        block = parent_block;
                        break;
                    case PREFIXS[2]:
                        if (!widget_block) widget_block = await getBlockByID(id);
                        if (!root_block) root_block = await getBlockByID(widget_block.root_id);
                        block = root_block;
                        break;
                    default:
                        continue;
                }
                // console.log(block);
                let blockAttribute = block[attrName];
                sql = sql.replaceAll(templateAction, blockAttribute);
            }
            // console.log(sql);
        }
    }
    return sql;
}
