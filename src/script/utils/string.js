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

/* HTML 转义 */
export function HTMLEncode(text) {
    // REF: [javascript处理HTML的Encode(转码)和Decode(解码)总结 - 孤傲苍狼 - 博客园](https://www.cnblogs.com/xdp-gacl/p/3722642.html)
    let temp = document.createElement("div");
    temp.textContent = text;
    return temp.innerHTML;
}

/* HTML 反转义 */
export function HTMLDecode(text) {
    // REF: [javascript处理HTML的Encode(转码)和Decode(解码)总结 - 孤傲苍狼 - 博客园](https://www.cnblogs.com/xdp-gacl/p/3722642.html)
    let temp = document.createElement("div");
    temp.innerHTML = text;
    return temp.textContent;
}

/**
 * 内联属性表解析
 * @params {string} ial: 字符串, 格式： {: key="value" key="value" ...}
 * @return {object}: 属性表对象
 */
export function ialParse(ial) {
    // 解析 ial 字符串
    // ial 字符串格式： {: key="value" key="value" ...}
    // 返回对象：{key: value, key: value, ...}
    if (ial == '' || ial == null) return {};
    let IAL = ial
        .replace(/\\/g, '\\\\')
        .replace(/\s*(\S+)="(.*?)"/g, ',"$1":"$2"')
        .replace(/^\{\:\s*\,\s*/, '{');
    // console.log(ial, IAL);
    IAL = JSON.parse(IAL);
    for (const key in IAL) IAL[key] = HTMLDecode(IAL[key]);
    return IAL;
}

/**
 * 内联属性表创建
 * @params {object} obj: 属性表对象
 * @return {string}: ial 字符串, 格式： {: key="value" key="value" ...}
 */
export function ialCreate(obj) {
    let IAL = [];
    for (const key in obj) {
        IAL.push(`${key}="${HTMLEncode(obj[key]).replaceAll('\n', '_esc_newline_')}"`);
    }
    return `{: ${IAL.join(' ')}}`;
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
 * @params {string} markdown: Markdown 文本
 * @params {string} mode: 格式化样式
 * @params {regexp} reg: 需要被替换文本的正则
 * @params {string} br: 替换文本
 * @return {string}: 格式化后的文本
 */
export function markdown2span(markdown, mode = 'raw', reg = /[\r\n]+/g, br = '<br />') {
    if (typeof (markdown) == 'string') {
        let prefix, suffix;
        switch (mode) {
            case 's': // 该字段渲染为删除线
                prefix = '~~';
                suffix = '~~';
                // prefix = '<span data-type="s">';
                // suffix = '</span>';
                break;

            case 'u': // 该字段渲染为下划线
                prefix = '<u>';
                suffix = '</u>';
                // prefix = '<span data-type="u">';
                // suffix = '</span>';
                break;

            case 'em': // 该字段渲染为斜体
                prefix = '*';
                suffix = '*';
                // prefix = '<span data-type="em">';
                // suffix = '</span>';
                break;

            case 'tag': // 该字段渲染为标签
                prefix = '#';
                suffix = '#';
                // prefix = '<span data-type="tag">';
                // suffix = '</span>';
                break;

            case 'kbd': // 该字段渲染为按键样式
                prefix = '<kbd>';
                suffix = '</kbd>';
                // prefix = '<span data-type="kbd">';
                // suffix = '</span>';
                break;

            case 'sub': // 该字段渲染为下标样式
                prefix = '~';
                suffix = '~';
                // prefix = '<span data-type="sub">';
                // suffix = '</span>';
                break;

            case 'sup': // 该字段渲染为上标样式
                prefix = '^';
                suffix = '^';
                // prefix = '<span data-type="sup">';
                // suffix = '</span>';
                break;

            case 'code': // 该字段渲染为行内代码
                // prefix = '`';
                // suffix = '`';

                // 使用 <span> 可以保留内部的 ` 符号
                prefix = '<span data-type="code">';
                suffix = '</span>';
                break;

            case 'mark': // 该字段渲染为标记
                prefix = '==';
                suffix = '==';
                // prefix = '<span data-type="mark">';
                // suffix = '</span>';
                break;

            case 'math': // 该字段渲染为公式
                prefix = '$';
                suffix = '$';
                // prefix = '<span data-type="inline-math" data-content="';
                // markdown = markdown.replaceAll('"', '&quot;');
                // suffix = '"></span>';
                break;

            case 'strong': // 该字段渲染为粗体
                prefix = '**';
                suffix = '**';
                // prefix = '<span data-type="strong">';
                // suffix = '</span>';
                break;

            case 'raw': // 仅替换换行符与列表分隔符
            default:
                let temp = markdown.replaceAll('|', '\\|');
                return temp.replace(reg, br);
        }
        return `${prefix}${markdown}${suffix}`.replace(reg, `${prefix}${br}${suffix}`);
    }
    return markdown;
}

/**
 * UTF-32 解码
 * REF [javascript 的 字符串编码 - 知乎](https://zhuanlan.zhihu.com/p/386511092)
 * @params {string} hex: 16 进制 UTF-32 字符串
 * @return {string}: 解码后字符串
 */
export function utf32Decode(hex) {
    return String.fromCodePoint(parseInt(hex, 16));
}

/**
 * 移除超级块标志符
 * @params {string} markdown: 含有超级块标志符的 markdown 字符串
 * @return {string}: 移除超级块标志符的 markdown 字符串
 */
export function removeSuperBlockMarks(markdown) {
    return markdown
        .split('\n')
        .filter(row => row !== '}}}' && row !== '{{{row' && row !== '{{{col')
        .join('\n');
}
