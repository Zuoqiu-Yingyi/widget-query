/* 杂项工具 */
import { getNotebookConf } from "./api.js";
export {
    merge, // 递归合并对象
    getNotebookName, // 获取笔记本名称
}

var notebookNames = {};

function getNotebookName(notebookId) {
    if (!(notebookId in notebookNames)) {
        updateNotebookNames(notebookId);
    }
    return notebookNames?.[notebookId];
}

/**
 * 更新笔记本名称
 * @param {string} notebookId 
 */
function updateNotebookNames(notebookId) {
    if (notebookId) {
        getNotebookConf(notebookId).then((conf) => {
            let name = conf?.name;
            if (name) {
                notebookNames[notebookId] = name;
            }
        });
    }
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
