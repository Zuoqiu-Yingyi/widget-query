/* 配置文件(可以被 data/widgets/custom.js 覆盖) */

import { merge } from './../utils/misc.js';

import {
    cutString,
    ReplaceSpace,
    ReplaceCRLF,
    markdown2span,
    dateFormat,
    timeFormat,
    timestampFormat,
    isEmptyString,
} from './../utils/string.js';

import {
    templateParse
} from './../utils/templateParser.js';

export var config = {
    token: '', // API token, 无需填写
    query: { // 查询配置
        width: '128px', // 挂件宽度
        height: '32px', // 挂件高度
        radius: '8px', // 挂件圆角
        color: {
            default: 'rgb(255, 255, 255)', // 默认颜色
            success: 'rgb(183, 223, 185)', // 成功颜色
            info: 'rgb(166, 213, 250)', // 信息颜色
            warning: 'rgb(255, 213, 153)', // 警告颜色
            error: 'rgb(250, 179, 174)', // 错误颜色
        },
        regs: {
            blocks: /^\s*SELECT\s+\*\s+FROM\s+blocks\s+.*/i, // 块查询的正则表达式
            limit: /\s+LIMIT\s+\d+/i, // SQL LIMIT 关键字正则表达式
            sort: /^__(\d+)__(.*)$/i, // 手动排序字段正则表达式
            render: /^__(\w+)__(.*)$/i, // 渲染控制字段正则表达式
            hex: /^[0-9a-fA-F]+$/, // 16 进制正则表达式 
        },
        attribute: { // 块属性
            code: 'query-code', // 查询代码块
            widget: 'query-widget', // 查询挂件块
            table: 'query-table', // 查询结果表格块
        },
        sql: {
            // SQL 语句处理
            limit: { // 查询记录数量限制, 若启用且为设置 LIMIT 语句, 则在查询语句末尾添加 "LIMIT begin, end"
                enable: false, // 是否启用限制
                begin: 0, // 开始记录数
                end: 100, // 结束记录数
            },
        },
        template: { // 类似模板字段解析支持, 类似 .prefix{.field}, 目前支持的有 .root{.<挂件所在文档块的字段名>} .parent{.<挂件上级块的字段名>} .block{挂件块的字段名}
            enable: true, // 是否启用模板解析
            handler: async (data) => { // 模板解析处理函数
                return await templateParse(data);
            }
        },
        index: {
            enable: true, // 查询结果是否显示索引序号
        },
        render: {
            // 块查询部分字段渲染方案
            /**
             * 'ref': 渲染为块引用
             * 'link': 渲染为块超链接
             */
            type: 'link', // 块类型
            hpath: 'link', // 块所在文档路径
            id: 'link', // 块 ID
            parent_id: 'link', // 块的上级块 ID
            root_id: 'link', // 块所在文档 ID

            ial: { // 内联属性样式
                /**形状
                 * 'rows': 一列中分行显示
                 * 'columns': 一行中分列显示
                 */
                shape: 'rows',
                /**样式
                 * 's': 该字段渲染为删除线
                 * 'u': 该字段渲染为下划线
                 * 'em': 该字段渲染为斜体
                 * 'tag': 该字段渲染为标签
                 * 'kbd': 该字段渲染为按键样式
                 * 'sub': 该字段渲染为下标样式
                 * 'sup': 该字段渲染为上标样式
                 * 'code': 该字段渲染为行内代码
                 * 'mark': 该字段渲染为标记
                 * 'math': 该字段渲染为公式
                 * 'strong': 该字段渲染为粗体
                 */
                style: 'kbd', // 内联属性样式
            },
        },
        limit: 'row', // 查询结果字段限制, (null 为不限制, 'len' 为限制长度, 'row' 为限制行数)
        maxlen: 64, // 查询结果每个字段最大长度
        maxrow: 3, // 查询结果每个字段最大行数
        CRLF: '<br />', // 换行符替换
        space: ' ', // 空白字符替换
        fields: [ // 需渲染的 blocks 表的字段, 顺序分先后
            'type', // 内容块类型，参考((20210210103523-ombf290 "类型字段"))
            // 'content', // 去除了 Markdown 标记符的文本
            'markdown', // 包含完整 Markdown 标记符的文本
            'ial', // 内联属性列表，形如 `{: name="value"}`
            'hpath', // 人类可读的内容块所在文档路径
            'created', // 创建时间
            'updated', // 更新时间

            // 'id', // 内容块 ID
            // 'parent_id', // 双亲块 ID, 如果内容块是文档块则该字段为空
            // 'root_id', // 文档块 ID
            // 'box', // 笔记本 ID
            // 'path', // 内容块所在文档路径
            // 'name', // 内容块名称
            // 'alias', // 内容块别名
            // 'memo', // 内容块备注
            // 'hash', // content 字段的 SHA256 校验和
            // 'length', // markdown 字段文本长度
            // 'subtype', // 内容块子类型，参考((20210210103411-tcbcjja "子类型字段"))
            // 'sort', // 排序权重, 数值越小排序越靠前
        ],
        style: {
            // 查询结果样式
            table: {
                // 表格样式
                enable: true, // 是否启用使用块自定义属性设置表格样式
                attributes: [
                    {
                        // 表格自定义属性, 表格自动折行, 详情请参考 [siyuan-theme-dark-plus/custom-table-width.css at main · Zuoqiu-Yingyi/siyuan-theme-dark-plus](https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus/blob/main/style/module/custom-table-width.css)
                        enable: false, // 是否启用该自定义属性
                        key: 'custom-table-width', // 属性名
                        value: 'auto', // 属性值
                    },
                    {
                        // 块自定义属性, 为块设置滚动条, 详情请参考 [siyuan-theme-dark-plus/custom-render-scroll.css at main · Zuoqiu-Yingyi/siyuan-theme-dark-plus](https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus/blob/main/style/module/custom-render-scroll.css)
                        enable: true, // 是否启用该自定义属性
                        key: 'custom-render', // 属性名
                        value: 'scroll', // 属性值
                    },
                ],
            },
            column: {
                // 列样式, 自定义宽度的字段可以设置为 '{: style="width: 512px"}'
                content: '',
                markdown: '',
                created: '',
                updated: '',
                type: '',
                hpath: '',

                id: '',
                parent_id: '',
                root_id: '',
                hash: '',
                box: '',
                path: '',
                name: '',
                alias: '',
                memo: '',
                length: '',
                subtype: '',
                ial: '',
                sort: '',
            },
            align: { // 查询结果字段对齐样式(':-' 左对齐, ':-:' 居中, '-:' 右对齐)
                content: ':-',
                markdown: ':-',
                created: ':-:',
                updated: ':-:',
                type: ':-:',
                hpath: ':-',

                id: ':-:',
                parent_id: ':-:',
                root_id: ':-:',
                hash: ':-:',
                box: ':-:',
                path: ':-',
                name: ':-',
                alias: ':-',
                memo: ':-',
                length: '-:',
                subtype: '-:',
                ial: ':-',
                sort: '-:',
            },
        },
        filter: {
            // 查询结果过滤器
            blocks: { // 块查询的过滤
                enable: true, // 是否启用过滤
                handlers: [ // 过滤处理方法序列
                    (row, data) => { // 过滤查询结果中的查询结构(查询代码块, Query 挂件块)
                        // row: 查询结果一条记录
                        // data: 挂件数据
                        // return: 返回 true 则过滤掉当前记录, 返回 false 则不过滤
                        switch (true) {
                            case row.ial.indexOf(`custom-type="${config.query.attribute.code}"`) != -1:
                            case row.ial.indexOf(`custom-type="${config.query.attribute.widget}"`) != -1:
                            case row.ial.indexOf(`custom-type="${config.query.attribute.table}"`) != -1:
                                return true;
                            default:
                                return false;
                        }
                    },
                ],
            }
        },
        rows: { // 查询结果处理方法
            ials: { // IAL 处理方法
                keys: (rows, ialParser) => {
                    // 获得查询结果所有记录 IAL 键
                    let keys = new Set();
                    if (rows.length > 0) {
                        for (let i = 0, len = rows.length; i < len; i++) {
                            let ial = ialParser(rows[i].ial);
                            Object.keys(ial).forEach(key => {
                                if (config.query.rows.ials.ignore.has(key)) return;
                                keys.add(key);
                            });
                        }
                    }
                    return keys;
                },
                ignore: new Set([ // 忽略的 IAL 键
                    'id',
                    'fold',
                    'style',
                    'updated',
                    'heading-fold',
                ]),
            }
        },
        handler: { // 块查询结果各字段处理方法
            content: (row, ial, ...args) => {
                switch (config.query.limit) {
                    case 'len':
                        return markdown2span(cutString(ReplaceSpace(row.content, config.query.space), config.query.maxlen));
                    case 'row':
                        return markdown2span(ReplaceCRLF(cutString(row.content, undefined, config.query.maxrow), config.query.CRLF));
                    default:
                        return markdown2span(row.content);
                }
            },
            markdown: (row, ial, ...args) => {
                switch (config.query.limit) {
                    case 'len':
                        return markdown2span(cutString(ReplaceSpace(row.markdown, config.query.space), config.query.maxlen));
                    case 'row':
                        return markdown2span(ReplaceCRLF(cutString(row.markdown, undefined, config.query.maxrow), config.query.CRLF));
                    default:
                        return markdown2span(row.markdown);
                }
            },
            created: (row, ial, ...args) => {
                return timestampFormat(row.created);
            },
            updated: (row, ial, ...args) => {
                return timestampFormat(row.updated);
            },
            type: (row, ial, ...args) => {
                switch (config.query.render.type) {
                    case 'link':
                        return `[${config.query.map.blocktype[row.type]}](siyuan://blocks/${row.id})`;
                    case 'ref':
                    default:
                        return `((${row.id} "${config.query.map.blocktype[row.type]}"))`;
                }
            },
            hpath: (row, ial, ...args) => {
                switch (config.query.render.hpath) {
                    case 'link':
                        return `[${row.hpath}](siyuan://blocks/${row.root_id})`;
                    case 'ref':
                    default:
                        return `((${row.root_id} "${row.hpath}"))`;
                }
            },

            id: (row, ial, ...args) => {
                switch (config.query.render.id) {
                    case 'link':
                        return `[${row.id}](siyuan://blocks/${row.id})`;
                    case 'ref':
                    default:
                        return `((${row.id} "${row.id}"))`;
                }
            },
            parent_id: (row, ial, ...args) => {
                if (isEmptyString(row.parent_id)) return '';
                else {
                    switch (config.query.render.parent_id) {
                        case 'link':
                            return `[${row.parent_id}](siyuan://blocks/${row.parent_id})`;
                        case 'ref':
                        default:
                            return `((${row.parent_id} "${row.parent_id}"))`;
                    }
                }
            },
            root_id: (row, ial, ...args) => {
                switch (config.query.render.root_id) {
                    case 'link':
                        return `[${row.root_id}](siyuan://blocks/${row.root_id})`;
                    case 'ref':
                    default:
                        return `((${row.root_id} "${row.root_id}"))`;
                }
            },
            hash: (row, ial, ...args) => {
                return `\`${row.hash}\``;
            },
            box: (row, ial, ...args) => {
                return `\`${row.box}\``;
            },
            path: (row, ial, ...args) => {
                return `\`${row.path}\``;
            },
            name: (row, ial, ...args) => {
                return markdown2span(row.name, 'kbd');
            },
            alias: (row, ial, ...args) => {
                return markdown2span(row.alias, 'kbd', /\\s+,\\s+/g);
            },
            memo: (row, ial, ...args) => {
                return markdown2span(row.memo);
            },
            length: (row, ial, ...args) => {
                return row.length;
            },
            subtype: (row, ial, ...args) => {
                return config.query.map.subtype[row.subtype];
            },
            ial: (row, ial, ...args) => {
                let ial_markdown = [];
                switch (config.query.render.ial.shape) {
                    case 'columns':
                        args[0].forEach((key) => {
                            if (!config.query.rows.ials.ignore.has(key) && ial[key]) {
                                switch (key) {
                                    case 'id':
                                    case 'fold':
                                    case 'style':
                                    case 'updated':
                                    case 'heading-fold':
                                        ial_markdown.push('');
                                        break;

                                    case 'icon':
                                        if (ial[key].startsWith(':') && ial[key].endsWith(':')) {
                                            // 自定义图标
                                            ial_markdown.push(ial[key]);
                                            break;
                                        }
                                    default:
                                        ial_markdown.push(markdown2span(ial[key], config.query.render.ial.style));
                                        break;
                                }
                            }
                            else ial_markdown.push('');
                        });
                        return ial_markdown.join(' | ');
                    case 'rows':
                    default:
                        for (let key of Object.keys(ial)) {
                            if (config.query.rows.ials.ignore.has(key)) continue;
                            switch (key) {
                                case 'id':
                                case 'fold':
                                case 'style':
                                case 'updated':
                                case 'heading-fold':
                                    continue;
                                case 'icon':
                                    if (ial[key].startsWith(':') && ial[key].endsWith(':')) {
                                        // 自定义图标
                                        ial_markdown.push(`<kbd>${key}</kbd>\:${ial[key]}`);
                                        break;
                                    }
                                default:
                                    ial_markdown.push(`<kbd>${key}</kbd>\:\`${ial[key]}\``);
                                    break;
                            }
                        }
                        return ial_markdown.join(config.query.CRLF);
                }
            },
            sort: (row, ial, ...args) => {
                return row.sort;
            },
        },
        map: {
            // 映射表
            blocktype: { // 块类型映射
                d: '文档块',
                h: '标题块',
                l: '列表块',
                i: '列表项',
                c: '代码块',
                m: '公式块',
                t: '表格块',
                b: '引述块',
                s: '超级块',
                p: '段落块',
                tb: '分隔线',
                video: '视频块',
                audio: '音频块',
                widget: '挂件块',
                iframe: 'iframe',
                query_embed: '嵌入块',
                '': '',
                null: '',
                undefined: '',
            },
            subtype: { // 子类型映射
                o: '有序列表',
                u: '无序列表',
                t: '任务列表',
                h1: '一级标题',
                h2: '二级标题',
                h3: '三级标题',
                h4: '四级标题',
                h5: '五级标题',
                h6: '六级标题',
                '': '',
                null: '',
                undefined: '',
            },
        },
        prefix: {
            // 非默认查询时字段别名前缀
            hidden: '__hidden__', // 不显示此字段，仅用于数据查询

            ref: '__ref__', // 该字段渲染为引用
            link: '__link__', // 该字段渲染为链接
            pre: '__pre__', // 该字段渲染为预览
            raw: '__raw__', // 该字段渲染为原始值
            date: '__date__', // 该字段渲染为日期
            time: '__time__', // 该字段渲染为时间
            datetime: '__datetime__', // 该字段渲染为日期时间

            s: '__s__', // 该字段渲染为删除线
            u: '__u__', // 该字段渲染为下划线
            em: '__em__', // 该字段渲染为斜体
            tag: '__tag__', // 该字段渲染为标签
            kbd: '__kbd__', // 该字段渲染为按键样式
            sub: '__sub__', // 该字段渲染为下标样式
            sup: '__sup__', // 该字段渲染为上标样式
            code: '__code__', // 该字段渲染为行内代码
            mark: '__mark__', // 该字段渲染为标记
            math: '__math__', // 该字段渲染为公式
            strong: '__strong__', // 该字段渲染为粗体
        },
        default: {
            // 非块查询的处理模式
            name: (key) => { // 字段名称处理函数
                let name = config.query.regs.sort.test(key) ? config.query.regs.sort.exec(key)[2] : key;
                return config.query.regs.render.test(name) ? config.query.regs.render.exec(name)[2] : name;
            },
            handler: (key) => { // 其他查询结果默认处理方法生成函数, key 是字段名, 返回一个处理方法
                let name = config.query.regs.sort.test(key) ? config.query.regs.sort.exec(key)[2] : key;
                switch (true) {
                    case name.startsWith(config.query.prefix.ref):
                        return (row, key) => `((${row[key]} "${row[key]}"))`;
                    case name.startsWith(config.query.prefix.link):
                        return (row, key) => `[${row[key]}](siyuan://blocks/${row[key]})`;
                    case name.startsWith(config.query.prefix.pre):
                        return (row, key) => markdown2span(row[key]);
                    case name.startsWith(config.query.prefix.date):
                        return (row, key) => dateFormat(row[key]);
                    case name.startsWith(config.query.prefix.time):
                        return (row, key) => timeFormat(row[key]);
                    case name.startsWith(config.query.prefix.datetime):
                        return (row, key) => timestampFormat(row[key]);

                    case name.startsWith(config.query.prefix.s):
                        return (row, key) => markdown2span(row[key], 's');
                    case name.startsWith(config.query.prefix.u):
                        return (row, key) => markdown2span(row[key], 'u');
                    case name.startsWith(config.query.prefix.em):
                        return (row, key) => markdown2span(row[key], 'em');
                    case name.startsWith(config.query.prefix.kbd):
                        return (row, key) => markdown2span(row[key], 'kbd');
                    case name.startsWith(config.query.prefix.sub):
                        return (row, key) => markdown2span(row[key], 'sub');
                    case name.startsWith(config.query.prefix.sup):
                        return (row, key) => markdown2span(row[key], 'sup');
                    case name.startsWith(config.query.prefix.tag):
                        return (row, key) => markdown2span(row[key], 'tag');
                    case name.startsWith(config.query.prefix.mark):
                        return (row, key) => markdown2span(row[key], 'mark');
                    case name.startsWith(config.query.prefix.math):
                        return (row, key) => markdown2span(row[key], 'math');
                    case name.startsWith(config.query.prefix.strong):
                        return (row, key) => markdown2span(row[key], 'strong');

                    case name.startsWith(config.query.prefix.raw):
                    case name.startsWith(config.query.prefix.code):
                    default:
                        return (row, key) => markdown2span(row[key], 'code');
                }
            },
            style: {
                column: '',
                align: ':-',
            },
        },
    },
};

try {
    let custom = await import('/widgets/custom.js');
    if (custom.config != null) {
        config = merge(config, custom.config);
    }
} catch (err) {
    console.log(err);
} finally {
    console.log(config);
}
