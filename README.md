# widget-query

<center>

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/Zuoqiu-Yingyi/widget-query?include_prereleases&style=flat-square)](https://github.com/Zuoqiu-Yingyi/widget-query/releases/latest)
[![GitHub Release Date](https://img.shields.io/github/release-date/Zuoqiu-Yingyi/widget-query?style=flat-square)](https://github.com/Zuoqiu-Yingyi/widget-query/releases/latest)
[![GitHub License](https://img.shields.io/github/license/Zuoqiu-Yingyi/widget-query?style=flat-square)](https://github.com/Zuoqiu-Yingyi/widget-query/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/Zuoqiu-Yingyi/widget-query?style=flat-square)](https://github.com/Zuoqiu-Yingyi/widget-query/commits/main)
![GitHub repo size](https://img.shields.io/github/repo-size/Zuoqiu-Yingyi/widget-query?style=flat-square)
![hits](https://hits.b3log.org/Zuoqiu-Yingyi/widget-query.svg)
[![GitHub all releases](https://img.shields.io/github/downloads/Zuoqiu-Yingyi/widget-query/total?style=flat-square)](https://github.com/Zuoqiu-Yingyi/widget-query/releases)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#贡献者--contributor)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[English](./README_en.md)

</center>

一个将思源笔记数据库查询结果以表格样式渲染的挂件

现已上架[思源笔记社区集市](https://github.com/siyuan-note/bazaar), 如果您需要订阅[思源笔记](https://github.com/siyuan-note/siyuan)增值服务，欢迎使用我的推荐码: **h0sc9rc**

思源数据库表与字段详情请见: [思源数据库表与字段 · 语雀](https://www.yuque.com/siyuannote/docs/go7uom)

## 预览

![preview](https://cdn.jsdelivr.net/gh/Zuoqiu-Yingyi/widget-query/preview.png)

背景颜色状态指示:

* 白色:

  * 初始化
  * 正在处理查询
* 绿色

  * 查询成功
* 蓝色

  * 请继续操作
* 黄色

  * 查询结果为空
* 红色

  * SQL 语句错误
  * 未知错误

## 功能

1. 符合正则表达式 `^\s*SELECT\s+\*\s+FROM\s+blocks\s+.*` 的 SQL 语句将启用<kbd>默认块查询模式</kbd>

    * 该正则表达式在 `/src/script/module/config.js` 文件中 `config.query.regs.blocks` 定义
    * 示例: `SELECT * FROM blocks WHERE content LIKE '%内容块%'`
    * 该模式下, 查询结果渲染样式将以如下配置选项进行控制

      * |字段|字段说明|字段值|字段值说明|
        | -------------------------------------------| -------------------------------------------------------------------------------------------------------------------------------------------------------------| ---------------------------------------------------------------------| ----------------------------------------------------------------------------------|
        |`config.query.render.*`|定义部分字段渲染样式<br />超链接样式形如 `[锚文本](siyuan://blocks/<块ID>)`, 不会显示在反链面板中<br />块引用样式形如 `((<块ID> "锚文本"))`, 会显示在反面面板中|`'link'`<br />`'ref'`|以超链接形式渲染字段<br />以块引用形式渲染字段|
        |`config.query.render.ial.shape`|定义块属性列表 `IAL` 排列方式<br />一列中分行显示<br />一行中分列显示<br />|`'rows'`<br />`'columns'`||
        |`config.query.render.ial.fields.forced`|定义强制渲染的 `IAL` 属性名, 若为空数组则使用黑白名单控制|`['属性名', ...]`||
        |`config.query.render.ial.fields.ignore`|定义不渲染的 `IAL` 属性名(黑名单), 优先级比白名单高|`['属性名', ...]`||
        |`config.query.render.ial.fields.ignore`|定义可渲染的 `IAL` 属性名(白名单), 若为空则渲染黑名单外的所有字段|`['属性名', ...]`||
        |`config.query.limit`|定义 `content` 或 `markdown` 字段查询结果显示样式|`null`<br />`'row'`<br />`'len'`<br />|无限制<br />限制行数<br />限制长度|
        |`config.query.maxlen`|定义 `content` 或 `markdown` 字段查询结果最大长度<br />|正整数|`config.query.limit: 'len'` 时启用|
        |`config.query.maxrow`|定义 `content` 或 `markdown` 字段查询结果最大行数<br />|正整数|`config.query.limit: 'row'` 时启用|
        |`config.query.fields`|定义查询结果需要显示的字段与字段排列顺序|`['字段名', ...]`|字段名详情请参考 [blocks](https://www.yuque.com/siyuannote/docs/go7uom#276bd8cf)|
        |`config.query.style.table.attributes`|定义查询结果表格的块属性, 可用于设置自定义样式|`[{enable: true/false, key: '块属性名', value: '块属性值'}, ...]`||
        |`config.query.style.column.*`|定义查询结果表格某一列的样式|`{: style="width: 512px"}`|指定查询结果某一列的宽度|
        |`config.query.style.align.*`|定义查询结果表格某一列的对齐方式|`:-`<br />`:-:`<br />`-:`|左对齐<br />居中<br />右对齐|
        |`config.query.filter.blocks`|定义过滤器序列, 过滤一些查询结果|`{enable: true/flase, handlers: [(row, data) => {}, ...]}`|需要过滤的返回 `true`, 需要保留的返回 `false`|
        |`config.query.handler.*`|定义具体字段值的处理函数|`(row, ial) => {}`|`row`: 当前记录<br />`ial`: 当前查询记录解析后的内联属性列表|
        |`config.query.map.*`|查询结果映射表, 将某些查询结果字段值替换为人类可读的字段|||
2. 不符合<kbd>默认块查询模式</kbd>的查询均为<kbd>普通查询模式</kbd>

    * 示例

      * 查询帮助文档 `请从这里开始` 及其下级所有的文档

        ```sql
        SELECT
            '[' || b.content || '](siyuan://blocks/' || b.id || ')' AS __1____pre__文档标题,
            b.hpath AS __2__文档路径
        FROM
            blocks AS b
        WHERE
            b.type = 'd'
            AND b.hpath LIKE '%请从这里开始%'
        ORDER BY
            b.path
        LIMIT 10
        ```

        ||文档标题|文档路径|
        | ---: | :---------------------------------------------------------------| :----------------------------------------------|
        |1|[请从这里开始](siyuan://blocks/20200812220555-lj3enxa)|`/请从这里开始`|
        |2|[编辑器](siyuan://blocks/20210808180320-abz7w6k)|`/请从这里开始/编辑器`|
        |3|[排版元素](siyuan://blocks/20200825162036-4dx365o)|`/请从这里开始/编辑器/排版元素`|
        |4|[内容块](siyuan://blocks/20210808180320-fqgskfj)|`/请从这里开始/内容块`|
        |5|[什么是内容块](siyuan://blocks/20200813004931-q4cu8na)|`/请从这里开始/内容块/什么是内容块`|
        |6|[引用内容块](siyuan://blocks/20200813013559-sgbzl5k)|`/请从这里开始/内容块/引用内容块`|
        |7|[在内容块中遨游](siyuan://blocks/20200813131152-0wk5akh)|`/请从这里开始/内容块/在内容块中遨游`|
        |8|[内容块类型](siyuan://blocks/20200905090211-2vixtlf)|`/请从这里开始/内容块/内容块类型`|
        |9|[嵌入内容块](siyuan://blocks/20201117101902-2ewjjum)|`/请从这里开始/内容块/嵌入内容块`|
        |10|[文档块和标题块的转换](siyuan://blocks/20201210103036-1x3vm8t)|`/请从这里开始/内容块/文档块和标题块的转换`|
      * 查询思源数据库所有表

        ```sql
        SELECT
            *
        FROM
            sqlite_master
        ```

        ||name|rootpage|sql|tbl_name|type|
        | --: | :-------------------------| :---------| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------| :-------------------------| :----------|
        |1|`stat`|`2`|`CREATE TABLE stat (key, value)`|`stat`|`table`|
        |2|`blocks`|`3`|`CREATE TABLE blocks (id, parent_id, root_id, hash, box, path, hpath, name, alias, memo, content, markdown, length, type, subtype, ial, sort, created, updated)`|`blocks`|`table`|
        |3|`spans`|`4`|`CREATE TABLE spans (id, block_id, root_id, box, path, content, markdown, type, ial)`|`spans`|`table`|
        |4|`assets`|`5`|`CREATE TABLE assets (id, block_id, root_id, box, docpath, path, name, title, hash)`|`assets`|`table`|
        |5|`attributes`|`6`|`CREATE TABLE attributes (id, name, value, type, block_id, root_id, box, path)`|`attributes`|`table`|
        |6|`refs`|`7`|`CREATE TABLE refs (id, def_block_id, def_block_parent_id, def_block_root_id, def_block_path, block_id, root_id, box, path, content, markdown, type)`|`refs`|`table`|
        |7|`file_annotation_refs`|`8`|`CREATE TABLE file_annotation_refs (id, file_path, annotation_id, block_id, root_id, box, path, content, type)`|`file_annotation_refs`|`table`|
      * 查询思源数据库 `blocks` 表中所有字段  

        ```sql
        PRAGMA table_info('blocks')
        ```

        ||cid|dflt_value|name|notnull|pk|type|
        | ---: | :-------| :-----------| :--------------| :--------| :---| :-----|
        |1|||`id`||||
        |2|`1`||`parent_id`||||
        |3|`2`||`root_id`||||
        |4|`3`||`hash`||||
        |5|`4`||`box`||||
        |6|`5`||`path`||||
        |7|`6`||`hpath`||||
        |8|`7`||`name`||||
        |9|`8`||`alias`||||
        |10|`9`||`memo`||||
        |11|`10`||`content`||||
        |12|`11`||`markdown`||||
        |13|`12`||`length`||||
        |14|`13`||`type`||||
        |15|`14`||`subtype`||||
        |16|`15`||`ial`||||
        |17|`16`||`sort`||||
        |18|`17`||`created`||||
        |19|`18`||`updated`||||
      * 自定义属性视图

        ```sql
        SELECT
            '[' || b.content || '](siyuan://blocks/' || a.block_id || ')' AS __1____pre__文档标题,
            MAX(
                CASE
                    WHEN a.name = 'name' THEN a.value
                    ELSE NULL
                END
            ) AS __2____kbd__命名,
            MAX(
                CASE
                    WHEN a.name = 'alias' THEN REPLACE(
                        '<kbd>' || a.value || '</kbd>',
                        ',',
                        '</kbd><br/><kbd>'
                    )
                    ELSE NULL
                END
            ) AS __3____pre__别名,
            MAX(
                CASE
                    WHEN a.name = 'memo' THEN REPLACE(
                        '<kbd>' || a.value || '</kbd>',
                        ',',
                        '</kbd><br/><kbd>'
                    )
                    ELSE NULL
                END
            ) AS __3____pre__备注
        FROM
            attributes AS a
            INNER JOIN blocks AS b ON a.block_id = b.id
        WHERE
            (
                a.name = 'name'
                OR a.name = 'alias'
                OR a.name = 'memo'
            )
            AND b.type = 'd'
        GROUP BY
            a.block_id
        ORDER BY
            RANDOM()
        LIMIT
            10;
        ```

        ![自定义属性视图](https://cdn.jsdelivr.net/gh/Zuoqiu-Yingyi/widget-query/image/README/1649676356928.png)
    * 使用字段别名前缀定义查询显示样式

      * `__hidden__别名0`:

        * 该字段不显示在查询结果中
      * `__ref__别名1`:

        * 该字段渲染为块引用
        * 示例: `((<value> "<value>"))`
      * `__link__别名2`:

        * 该字段渲染为块链接
        * 示例: `[<value>](siyuan://blocks/<value>)`
      * `__raw__别名3`:

        * 该字段渲染为原始值(行内代码样式)
        * 示例: ``<value>``
      * `__date__别名4`:

        * 该字段渲染为日期
        * 示例: `yyyy-MM-dd`
      * `__time__别名5`:

        * 该字段渲染为时间
        * 示例: `HH:mm:ss`
      * `__datetime__别名6`:

        * 该字段渲染为日期时间
        * 示例: `yyyy-MM-dd HH:mm:ss`
      * `__s__别名7`:

        * 该字段渲染为删除线
        * 示例: `~~<value>~~`
      * `__u__别名8`:

        * 该字段渲染为下划线
        * 示例: `<u><value></u>`
      * `__em__别名9`:

        * 该字段渲染为斜体
        * 示例: `*<value>*`
      * `__tag__别名10`:

        * 该字段渲染为标签
        * 示例: `<kbd><value></kbd>`
      * `__kbd__别名11`:

        * 该字段渲染为按键样式
        * 示例: `~<value>~`
      * `__sub__别名12`:

        * 该字段渲染为下标样式
        * 示例: `^<value>^`
      * `__sup__别名13`:

        * 该字段渲染为上标样式
        * 示例: `#<value>#`
      * `__code__别名14`:

        * 该字段渲染为行内代码
        * 示例: ``<value>``
      * `__mark__别名15`:

        * 该字段渲染为标记
        * 示例: `==<value>==`
      * `__math__别名16`:

        * 该字段渲染为公式
        * 示例: `$<value>$`
      * `__strong__别名17`:

        * 该字段渲染为粗体
        * 示例: `**<value>**`
      * `__pre__别名18`:

        * 该字段渲染为预览(渲染 markdown 行级标识符)
        * 示例: `<value>`
    * 使用字段别名前缀定义查询结果字段顺序

      * `__<数字>__别名8`:

        * 该字段可以放置在查询样式前缀字段的前面
        * 示例:

          * `__1____pre__别名9`
          * `__02____raw__别名10`
    * 默认显示查询结果原始值(使用行内代码)
    * 字段别名前缀示例

      * ```sql
        SELECT
            b.id AS __00____ref__ref,
            b.id AS __01____link__link,
            b.id AS __02____pre__pre,
            b.id AS __03____raw__raw,
            b.created AS __04____date__date,
            b.created AS __05____time__time,
            b.created AS __06____datetime__datetime,
            b.id AS __07____s__s,
            b.id AS __08____u__u,
            b.id AS __09____em__em,
            b.id AS __10____tag__tag,
            b.id AS __11____kbd__kbd,
            b.id AS __12____sub__sub,
            b.id AS __13____sup__sup,
            b.id AS __14____code__code,
            b.id AS __15____mark__mark,
            b.id AS __16____math__math,
            b.id AS __17____strong__strong
        FROM
            blocks AS b
        WHERE
            id = '.root{.id}'
        ```

        ![字段别名前缀示例](https://cdn.jsdelivr.net/gh/Zuoqiu-Yingyi/widget-query//image/README/1648568044659.png)
3. 部分模板字段解析支持

    * `.<prefix>{.<field>}`

      * `<prefix>`: 前缀字段

        * `block`: 挂件块
        * `parent`: 挂件块的上级块
        * `root`: 挂件块所在文档块
      * `<field>`: 属性字段

        * 数据库中 `blocks` 表的字段名, 详情请参考 [blocks](https://www.yuque.com/siyuannote/docs/go7uom#276bd8cf)
      * 示例: `SELECT * FROM blocks WHERE id = '.root{.id}' content LIKE '%内容块%'`

        * 等价于 `SELECT * FROM blocks WHERE id = '.block{.root_id}' content LIKE '%内容块%'`
        * 查询挂件所在文档中所有含有 `内容块` 三个字的块

## 自定义配置

### 全局自定义配置

1. 创建文件 `<工作空间>/data/widgets/custom.js`
2. 在文件 `<工作空间>/data/widgets/custom.js` 中定义的值将覆盖 `<工作空间>/data/widgets/Query/src/script/module/config.js` 中对应的值

#### 配置示例

```js
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
                style: {
                    rows: {
                        key: 'kbd', // 内联属性键样式
                        value: 'code', // 内联属性值样式
                        null: 'NULL', // 内联属性为空时占位符
                    },
                    columns: {
                        key: 'kbd', // 内联属性键样式
                        value: 'kbd', // 内联属性值样式
                        null: '', // 内联属性为空时占位符
                    },
                },
                fields: { // 内联属性字段
                    forced: [], // 强制显示的 IAL 键, 为空则使用黑白名单
                    ignore: [ // 需渲染的 IAL 键黑名单
                        'id',
                        'fold',
                        'style',
                        'updated',
                        'colgroup',
                        'heading-fold',
                    ],
                    valid: [], // 按照顺序渲染的 IAL 键白名单, 为空则全部渲染
                },
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
            // 'fcontent', // 容器块第一个子块的内容
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
            // 'length', // content 字段文本长度
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
                fcontent: '',
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
                fcontent: ':-',
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
                            Object.keys(ial).forEach(key => keys.add(key));
                        }
                    }
                    return keys;
                },
            },
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
            fcontent: (row, ial, ...args) => {
                switch (config.query.limit) {
                    case 'len':
                        return markdown2span(cutString(ReplaceSpace(row.fcontent, config.query.space), config.query.maxlen));
                    case 'row':
                        return markdown2span(ReplaceCRLF(cutString(row.fcontent, undefined, config.query.maxrow), config.query.CRLF));
                    default:
                        return markdown2span(row.fcontent);
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
                let ial_keys = args[0];
                switch (config.query.render.ial.shape) {
                    case 'columns':
                        ial_keys.forEach((key) => {
                            if (ial[key]) {
                                switch (key) {
                                    case 'icon':
                                        if (ial[key].startsWith(':') && ial[key].endsWith(':')) {
                                            // 自定义图标
                                            ial_markdown.push(ial[key]);
                                            break;
                                        }
                                    default:
                                        ial_markdown.push(markdown2span(ial[key], config.query.render.ial.style.columns.value));
                                        break;
                                }
                            }
                            else ial_markdown.push(config.query.render.ial.style.columns.null
                                ? markdown2span(config.query.render.ial.style.columns.null, config.query.render.ial.style.columns.value)
                                : '');
                        });
                        return ial_markdown.join(' | ');
                    case 'rows':
                    default:
                        ial_keys.forEach((key) => {
                            if (config.query.render.ial.fields.forced.length > 0 || ial[key])
                                console.log(key, config.query.render.ial.fields.forced, ial[key], ial);
                            if (config.query.render.ial.fields.forced.length > 0 || ial[key] !== undefined) {
                                let ial_key = markdown2span(key, config.query.render.ial.style.rows.key)
                                let ial_value = ial[key] || (config.query.render.ial.style.rows.null
                                    ? markdown2span(config.query.render.ial.style.rows.null, config.query.render.ial.style.rows.value)
                                    : '');
                                switch (key) {
                                    case 'icon':
                                        if (ial_value.startsWith(':') && ial_value.endsWith(':')) {
                                            // 自定义图标
                                            ial_markdown.push(`${ial_key}\:${ial_value}`);
                                            break;
                                        }
                                    default:
                                        ial_markdown.push(`${ial_key}\:${markdown2span(ial_value, config.query.render.ial.style.rows.value)}`);
                                        break;
                                }
                            }
                        });
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
```

### 块自定义配置

* 在挂件块（笔记中的Query按钮）中设置自定义块属性

  * 自定义属性名称为 `src/script/module/config.js` 文件中 `config` 对象中的属性
  * 例如, 如果想要自定义查询结果字段列表, 可以设置自定义块属性 `query-fields`: `["hpath", "type", "markdown"]`, 在该块中将会替换 `config.query.fields` 字段

## 开始

该挂件已在[思源笔记社区集市](https://github.com/siyuan-note/bazaar)上架, 可直接在集市中安装

## 参考 & 感谢

|作者|项目|许可证|
| :------------------------------------------------------| :------------------------------------------------------------------| :------------|
|**[leolee9086](https://github.com/leolee9086)**|[leolee9086/cc-baselib](https://github.com/leolee9086/cc-baselib)|*Unknown*|

注: 排序不分先后

## 贡献者

<!-- [![贡献者](https://contrib.rocks/image?repo=Zuoqiu-Yingyi/widget-query)](https://github.com/Zuoqiu-Yingyi/widget-query/graphs/contributors) -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/leolee9086"><img src="https://avatars.githubusercontent.com/u/19915077?v=4?s=100" width="100px;" alt=""/><br /><sub><b>leolee9086</b></sub></a><br /><a href="https://github.com/Zuoqiu-Yingyi/widget-query/issues?q=author%3Aleolee9086" title="Bug reports">🐛</a> <a href="https://github.com/Zuoqiu-Yingyi/widget-query/commits?author=leolee9086" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jpanda-cn"><img src="https://avatars.githubusercontent.com/u/50101020?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jpanda-cn</b></sub></a><br /><a href="https://github.com/Zuoqiu-Yingyi/widget-query/commits?author=jpanda-cn" title="Code">💻</a> <a href="#ideas-jpanda-cn" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.cnblogs.com/duanguyuan/"><img src="https://avatars.githubusercontent.com/u/5968678?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wang Yong</b></sub></a><br /><a href="https://github.com/Zuoqiu-Yingyi/widget-query/commits?author=whuwangyong" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/banjuer"><img src="https://avatars.githubusercontent.com/u/18739609?v=4?s=100" width="100px;" alt=""/><br /><sub><b>banjuer</b></sub></a><br /><a href="#ideas-banjuer" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Tlonglan"><img src="https://avatars.githubusercontent.com/u/38731172?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tlonglan</b></sub></a><br /><a href="#ideas-Tlonglan" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://git.io/k.r"><img src="https://avatars.githubusercontent.com/u/2762704?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tim Zhang</b></sub></a><br /><a href="#ideas-ttimasdf" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Zuoqiu-Yingyi/widget-query/commits?author=ttimasdf" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lmmxj"><img src="https://avatars.githubusercontent.com/u/13883162?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lmmxj</b></sub></a><br /><a href="#ideas-lmmxj" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

注: 该表格使用 [All Contributors · GitHub](https://github.com/all-contributors) 自动生成, 请到 [emoji key](https://allcontributors.org/docs/en/emoji-key) 查看贡献类型

## 更改日志

[CHANGE LOG](./CHANGELOG.md)
