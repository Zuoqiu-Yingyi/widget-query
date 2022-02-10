# widget-query

<center>

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/Zuoqiu-Yingyi/widget-query?include_prereleases)
![GitHub Release Date](https://img.shields.io/github/release-date/Zuoqiu-Yingyi/widget-query)
![GitHub](https://img.shields.io/github/license/Zuoqiu-Yingyi/widget-query)
![GitHub last commit](https://img.shields.io/github/last-commit/Zuoqiu-Yingyi/widget-query)
![GitHub repo size](https://img.shields.io/github/repo-size/Zuoqiu-Yingyi/widget-query)
![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hy/Zuoqiu-Yingyi/widget-query?label=hits)
![GitHub all releases](https://img.shields.io/github/downloads/Zuoqiu-Yingyi/widget-query/total)

</center>

一个将思源笔记数据库查询结果以表格样式渲染的挂件  
A widget that renders the query results of the Siyuan Notes database in tabular style.

现已上架[思源笔记社区集市](https://github.com/siyuan-note/bazaar), 如果您需要订阅[思源笔记](https://github.com/siyuan-note/siyuan)增值服务，欢迎使用我的推荐码: **h0sc9rc**  
It is now on the shelves of the [Siyuan Notes Community Bazaar](https://github.com/siyuan-note/bazaar). If you need to subscribe to the value-added services of [siyuan note](https://github.com/siyuan-note/siyuan/blob/master/README_en_US.md), please use my referral code: **h0sc9rc**

## 预览 | PREVIEW

![preview](preview.png)

## 功能 | FUNCTION

1. 符合正则表达式 `^\s*SELECT\s+\*\s+FROM\s+blocks.*` 的 SQL 语句将启用自定义渲染模式  
   SQL statements that conform to the regular expression `^\s*SELECT\s+\*\s+FROM\s+blocks.*` will enable custom rendering mode.
   - 这个正则表达式在 `/src/script/module/config.js` 中的 `config.query.regs.blocks` 配置  
     This regular expression is configured in `config.query.regs.blocks` in `/src/script/module/config.js`
2. 自定义渲染模式 | Custom rendering modes
   - 可以在 `config.query.limit` 中设置过长查询结果的截取方案  
     You can set the the interception scheme for query results that are too long in `config.query.limit`.
     - `config.query.maxlen`: 最大长度 | Maximum length
     - `config.query.maxrow`: 最多行数 | Maximum number of rows
   - 可以在 `config.query.fields` 中设置想要显示的字段  
     You can set the fields you want to display in `config.query.fields`.
   - 可以在 `config.query.align` 中设置各字段的对齐方式  
     You can set the alignment of each field in `config.query.align`.
   - 可以在 `config.query.handler` 中设置各字段的处理方法  
     You can set the handling method for each field in `config.query.handler`.
3. 部分模板字段解析支持  
   Partial template field parsing support.
   - `.prefix{.field}`
     - `prefix`: 前缀字段 | prefix field
       - `block`: 挂件块 | Widget block.
       - `parent`: 挂件块的上级块 | The parent block of the pendant block.
       - `root`: 挂件块所在文档块 | The document block in which the pendant block resides.
     - `field`: 属性字段 | attribute field
       - 数据库中 `blocks` 表的字段名  
         The field name of the `blocks` table in the database.
4. 普通模式 | Normal mode
   - 完整显示查询结果  
     Displays the query results in full.

## 自定义配置 | CUSTOM CONFIG

1. 创建文件 `<工作空间>/data/widgets/custom.js`  
   Create a file `<workspace>/data/widgets/custom.js`
2. 在文件 `<工作空间>/data/widgets/custom.js` 中定义的值将覆盖 `<工作空间>/widgets/Query/src/script/module/config.js` 中对应的值  
   The value defined in file `<workspace>/data/widgets/custom.js` overwrites the corresponding value in file `<workspace>/widgets/Query/src/script/module/config.js`.

### 配置示例 | CONFIG EXAMPLE

```js
/* 路径 | Path
 * <工作空间>/data/widgets/custom.js
 * <workspace>/data/widgets/custom.js
 */

import {
    cutString,
    ReplaceSpace,
    ReplaceCRLF,
    ialParser,
    markdown2span,
    timestampFormat,
    isEmptyString,
} from '/widgets/Query/src/script/utils/string.js';

import {
    templateParse
} from '/widgets/Query/src/script/utils/templateParser.js'

export var config = {
    token: '', // API token, 无需填写
    query: { // 查询配置
        width: '128px', // 宽度
        height: '32px', // 高度
        radius: '8px', // 圆角
        regs: {
            blocks: /^\s*SELECT\s+\*\s+FROM\s+blocks.*/i, // 块查询的正则表达式
        },
        maxlen: 64, // 查询结果每个字段最大长度
        maxrow: 3, // 查询结果每个字段最大行数
        limit: 'row', // 查询结果字段限制, (null 为不限制, 'len' 为限制长度, 'row' 为限制行数)
        CRLF: '<br />', // 换行符替换
        space: ' ', // 空白字符替换
        template: { // 类似模板字段解析支持, 类似 .prefix{.field}, 目前支持的有 .root{.<挂件所在文档块的字段名>} .parent{.<挂件上级块的字段名>} .block{挂件块的字段名}
            enable: true, // 是否启用模板解析
            handler: async (data) => { // 模板解析处理函数
                return await templateParse(data);
            }
        },
        fields: [ // 需渲染的 blocks 表的字段, 顺序分先后
            // 'content', // 去除了 Markdown 标记符的文本
            'markdown', // 包含完整 Markdown 标记符的文本
            'created', // 创建时间
            'updated', // 更新时间
            'type', // 内容块类型，参考((20210210103523-ombf290 "类型字段"))
            'hpath', // 人类可读的内容块所在文档路径

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
            // 'ial', // 内联属性列表，形如 `{: name="value"}`
            // 'sort', // 排序权重, 数值越小排序越靠前
        ],
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
        default: {
            handler: (row, key) => { // 其他查询结果默认处理方法, row 是查询结果的一条记录, key 是字段名
                return `\`${row[key]}\``;
            },
        },
        handler: { // 块查询结果各字段处理方法
            content: (row) => {
                switch (config.query.limit) {
                    case 'len':
                        return markdown2span(cutString(ReplaceSpace(row.content, config.query.space), config.query.maxlen));
                    case 'row':
                        return markdown2span(ReplaceCRLF(cutString(row.content, undefined, config.query.maxrow), config.query.CRLF));
                    default:
                        return markdown2span(row.content);
                }
            },
            markdown: (row) => {
                switch (config.query.limit) {
                    case 'len':
                        return markdown2span(cutString(ReplaceSpace(row.markdown, config.query.space), config.query.maxlen));
                    case 'row':
                        return markdown2span(ReplaceCRLF(cutString(row.markdown, undefined, config.query.maxrow), config.query.CRLF));
                    default:
                        return markdown2span(row.markdown);
                }
            },
            created: (row) => {
                return timestampFormat(row.created);
            },
            updated: (row) => {
                return timestampFormat(row.updated);
            },
            type: (row) => {
                return `((${row.id} "${config.query.map.blocktype[row.type]}"))`;
            },
            hpath: (row) => {
                return `((${row.root_id} "${row.hpath}"))`;
            },

            id: (row) => {
                return `((${row.id} "${row.id}"))`;
            },
            parent_id: (row) => {
                if (isEmptyString(row.parent_id)) return '';
                else return `((${row.parent_id} "${row.parent_id}"))`;
            },
            root_id: (row) => {
                return `((${row.root_id} "${row.root_id}"))`;
            },
            hash: (row) => {
                return `\`${row.hash}\``;
            },
            box: (row) => {
                return `\`${row.box}\``;
            },
            path: (row) => {
                return `\`${row.path}\``;
            },
            name: (row) => {
                return markdown2span(row.name);
            },
            alias: (row) => {
                return markdown2span(row.alias);
            },
            memo: (row) => {
                return markdown2span(row.memo);
            },
            length: (row) => {
                return row.length;
            },
            subtype: (row) => {
                return config.query.map.subtype[row.subtype];
            },
            ial: (row) => {
                let ial = ialParser(row.ial);
                let ial_markdown = [];
                for (let key of Object.keys(ial)) {
                    switch (key) {
                        case 'id':
                        case 'updated':
                            continue;
                        case 'icon':
                            ial_markdown.push(`\`${key}\`\: :${ial[key].replace(/\.\w+$/, '')}:`);
                            break;
                        default:
                            ial_markdown.push(`\`${key}\`\: \`${ial[key]}\``);
                            break;
                    }
                }
                return ial_markdown.join(config.query.CRLF);
            },
            sort: (row) => {
                return row.sort;
            },
        },
        map: { // 映射表
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
    },
};

```

## 开始 | START

该挂件已在[思源笔记社区集市](https://github.com/siyuan-note/bazaar)上架, 可直接在集市中安装  
The widget has been put on the shelves at [SiYuan community bazaar](https://github.com/siyuan-note/bazaar) and can be installed directly in the Bazaar.

## 参考 & 感谢 | REFERENCE & THANKS

| 作者 \| Author                                      | 项目 \| Project                                                                                                                                       | 许可证 \| License |
| :-------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| **[leolee9086](https://github.com/leolee9086)**     | [leolee9086/cc-baselib](https://github.com/leolee9086/cc-baselib)                                                                                     | *Unknown*         |

## 更改日志 | CHANGE LOG

[CHANGE LOG](./CHANGELOG.md)
