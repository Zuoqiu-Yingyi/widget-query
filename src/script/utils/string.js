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

export function markdown2span(markdown) {
    // markdown 转 span
    if (typeof (markdown) == 'string') {
        let temp = markdown.replaceAll('|', '\\|');
        return ReplaceCRLF(temp, '<br />');
    }
    return markdown;
}
