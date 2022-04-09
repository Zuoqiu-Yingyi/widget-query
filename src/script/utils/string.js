/* 字符串处理工具 */
export function cutString(str, len = null, row = null) {
    // 字符串截取指定长度
    // 如果指定了行数，则按行截取，否则按字符截取
    if (len) {
        if (str.length <= len) {
            return str;
        }
        else {
            return `${str.substr(0, len - 3)}...`;
        }
    }
    else if (row) {
        return str.split(/[\r\n]+/g).slice(0, row).join('\n');
    }
}

function HTMLDecode(text) {
    // HTML 解码
    // REF: [javascript处理HTML的Encode(转码)和Decode(解码)总结 - 孤傲苍狼 - 博客园](https://www.cnblogs.com/xdp-gacl/p/3722642.html)
    let temp = document.createElement("div");
    temp.innerHTML = text;
    return temp.textContent;;
}

export function ialParser(ial) {
    // 解析 ial 字符串
    // ial 字符串格式： {: key="value" key="value" ...}
    // 返回对象：{key: value, key: value, ...}
    if (ial == '' || ial == null) {
        return {};
    }
    let IAL = ial.replace(/\s*(\S+)="(.*?)"/g, ',"$1":"$2"');
    // console.log(IAL);
    IAL = JSON.parse(`{${IAL.substr(3)}`);
    for (let key of Object.keys(IAL)) {
        IAL[key] = HTMLDecode(IAL[key]);
    }
    return IAL;
}

export function isEmptyString(str) {
    // 判断字符串是否为空
    return str == null || str == '';
}

export function ReplaceCRLF(str, c) {
    // 换行符替换
    return str.replace(/[\r\n]+/g, c)
}

export function ReplaceSpace(str, c) {
    // 空白字符替换
    return str.replace(/\s+/g, c)
}

export function timestampFormat(timestamp) {
    return timestamp.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3 $4:$5:$6");
}

export function dateFormat(timestamp) {
    return timestamp.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3");
}

export function timeFormat(timestamp) {
    return timestamp.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$4:$5:$6");
}

/**
 * markdown 转 span (格式化)
 * @param {string} markdown: Markdown 文本
 * @param {string} mode: 格式化样式
 * @param {regexp} reg: 需要被替换文本的正则
 * @param {string} br: 替换文本
 * @return {string}: 格式化后的文本
 */
export function markdown2span(markdown, mode = 'raw', reg = /[\r\n]+/g, br = '<br/>') {
    if (typeof (markdown) == 'string') {
        let prefix, suffix;
        switch (mode) {
            case 's': // 该字段渲染为删除线
                prefix = '~~';
                suffix = '~~';
                break;
            case 'u': // 该字段渲染为下划线
                prefix = '<u>';
                suffix = '</u>';
                break;
            case 'em': // 该字段渲染为斜体
                prefix = '*';
                suffix = '*';
                break;
            case 'tag': // 该字段渲染为标签
                prefix = '#';
                suffix = '#';
                break;
            case 'kbd': // 该字段渲染为按键样式
                prefix = '<kbd>';
                suffix = '</kbd>';
                break;
            case 'sub': // 该字段渲染为下标样式
                prefix = '~';
                suffix = '~';
                break;
            case 'sup': // 该字段渲染为上标样式
                prefix = '^';
                suffix = '^';
                break;
            case 'code': // 该字段渲染为行内代码
                prefix = '`';
                suffix = '`';
                break;
            case 'mark': // 该字段渲染为标记
                prefix = '==';
                suffix = '==';
                break;
            case 'math': // 该字段渲染为公式
                prefix = '$';
                suffix = '$';
                break;
            case 'strong': // 该字段渲染为粗体
                prefix = '**';
                suffix = '**';
                break;
            case 'raw': // 仅替换换行符
            default:
                let temp = markdown.replaceAll('|', '\\|');
                return temp.replace(reg, br);
        }
        return `${prefix}${markdown}${suffix}`.replace(reg, `${prefix}${br}${suffix}`);
    }
    return markdown;
}

