/* 杂项工具 */
import { lsNotebooks } from "./api.js";
export {
    merge, // 递归合并对象
    notebookId2Name, // 获取笔记本名称
}

const notebooks = {
    list: [], // 笔记本列表
    map: new Map(), // 笔记本 ID -> 笔记本
};
updateNotebooks();

/**
 * 通过 ID 获取笔记本名称
 * @params {string} id: 笔记本 ID
 * @return {string}: 笔记本名称
 * @return {null}: 未找到匹配的笔记本
 */
function notebookId2Name(id) {
    if (notebooks.map.has(id)) {
        return notebooks.map.get(id).name;
    }
    else {
        updateNotebooks();
        return null;
    }
}

/**
 * 更新笔记本列表
 */
async function updateNotebooks() {
    if (window.top?.siyuan?.notebooks?.length > 0) {
        notebooks.list = window.top.siyuan.notebooks;
    }
    else {
        const data = await lsNotebooks();
        if (data?.notebooks) {
            notebooks.list = data.notebooks;
        }
        else return;
    }
    notebooks.map.clear();
    notebooks.list.forEach(notebook => {
        notebooks.map.set(notebook.id, notebook);
    });
}


// REF [js - 对象递归合并merge - zc-lee - 博客园](https://www.cnblogs.com/zc-lee/p/15873611.html)
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
function isArray(arr) {
    return Array.isArray(arr)
}
function merge(target, ...arg) {
    return arg.reduce((acc, cur) => {
        return Object.keys(cur).reduce((subAcc, key) => {
            const srcVal = cur[key]
            if (isObject(srcVal)) {
                subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
            } else if (isArray(srcVal)) {
                // series: []，下层数组直接赋值
                subAcc[key] = srcVal.map((item, idx) => {
                    if (isObject(item)) {
                        const curAccVal = subAcc[key] ? subAcc[key] : []
                        return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
                    } else {
                        return item
                    }
                })
            } else {
                subAcc[key] = srcVal
            }
            return subAcc
        }, acc)
    }, target)
}
