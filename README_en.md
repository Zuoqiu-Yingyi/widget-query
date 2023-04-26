# widget-query

<div align="center">

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/Zuoqiu-Yingyi/widget-query?include_prereleases&style=flat-square)](https://github.com/Zuoqiu-Yingyi/widget-query/releases/latest)
[![GitHub Release Date](https://img.shields.io/github/release-date/Zuoqiu-Yingyi/widget-query?style=flat-square)](https://github.com/Zuoqiu-Yingyi/widget-query/releases/latest)
[![GitHub License](https://img.shields.io/github/license/Zuoqiu-Yingyi/widget-query?style=flat-square)](https://github.com/Zuoqiu-Yingyi/widget-query/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/Zuoqiu-Yingyi/widget-query?style=flat-square)](https://github.com/Zuoqiu-Yingyi/widget-query/commits/main)
![GitHub repo size](https://img.shields.io/github/repo-size/Zuoqiu-Yingyi/widget-query?style=flat-square)
![hits](https://hits.b3log.org/Zuoqiu-Yingyi/widget-query.svg)
[![GitHub all releases](https://img.shields.io/github/downloads/Zuoqiu-Yingyi/widget-query/total?style=flat-square)](https://github.com/Zuoqiu-Yingyi/widget-query/releases)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

---
[简体中文](./README.md) \| English

</div>

---
A widget that renders the query results of the Siyuan Notes database in tabular style.

It is now on the shelves of the [Siyuan Notes Community Bazaar](https://github.com/siyuan-note/bazaar). If you like this widget, welcome to light up ⭐ for this project!

## PREVIEW

![preview](https://cdn.jsdelivr.net/gh/Zuoqiu-Yingyi/widget-query/preview.png)

Background color status indication:

* White:

  * Initialization.
  * Processing query.
* Green:

  * Query success.
* Blue:

  * Please continue to operate.
* Yellow:

  * Query result is empty.
* Red:

  * SQL SQL statement error.
  * Unknown error.

## FUNCTION

1. Click the Auto query check box to automatically query once the next time you open the page.
2. Set custom attribute <kbd>input</kbd> for a widget block can specify the content of a SQL code block or an embedded block as a query statement.

    * For example, in other documents there is a code block or an embedded block ID which ID is `20220418210605-ibussa1`, then set the custom block attribute <kbd>input</kbd>: `20220418210605-ibussa1` for the widget block can reference the block's SQL statement for query.
    * Only if the pre-block of the widget block is not a code block with the custom attribute <kbd>type</kbd>: `query-code`.
2. Set custom attribute <kbd>output</kbd> for a widget block can specify a table block as a display block for query results.

    * For example, in other documents there is a table block ID which ID is `20220604112815-sfiwyi7`, then set the custom block attribute <kbd>output</kbd>: `20220604112815-sfiwyi7` for the widget block can render the query results into the table.
    * Only if the post-block of the widget block is not a table block with the custom attribute <kbd>type</kbd>: `query-table`.
3. SQL statements that conform to the regular expression `^\s*SELECT\s+\*\s+FROM\s+blocks\s+.*` will enable the default block query mode.

    * This regular expression is configured in `config.query.regs.blocks` in `/src/script/module/config.js`
    * Example: `SELECT * FROM blocks WHERE content LIKE '%Content block%'`
    * In this mode, the query result rendering style is controlled with the following configuration options.

      * **TODO**
4. Queries that do not conform to the <kbd>default block query mode</kbd> are <kbd>normal query mode</kbd>

    * Example:

      * Query the help document `请从这里开始` and all of its subordinate documents.

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
      * Query all tables in Siyuan database.

        ```sql
        SELECT
            *
        FROM
            sqlite_master
        ```
      * Query all fields in the `blocks` table of Siyuan database.

        ```sql
        PRAGMA table_info('blocks')
        ```
      * Customized property views.

        ```sql
        SELECT
            '[' || b.content || '](siyuan://blocks/' || a.block_id || ')' AS __1____pre__Title,
            MAX(
                CASE
                    WHEN a.name = 'name' THEN a.value
                    ELSE NULL
                END
            ) AS __2____kbd__Name,
            MAX(
                CASE
                    WHEN a.name = 'alias' THEN REPLACE(
                        '<kbd>' || a.value || '</kbd>',
                        ',',
                        '</kbd><br/><kbd>'
                    )
                    ELSE NULL
                END
            ) AS __3____pre__Alias,
            MAX(
                CASE
                    WHEN a.name = 'memo' THEN REPLACE(
                        '<kbd>' || a.value || '</kbd>',
                        ',',
                        '</kbd><br/><kbd>'
                    )
                    ELSE NULL
                END
            ) AS __3____pre__Memo
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
    * Use field aliases prefix to define query display styles.

      * `__hidden__alias0`:

        * This field does not appear in the query results.
      * `__ref__alias1`:

        * The field is rendered as a block reference.
        * example: `((<value> "<value>"))`
      * `__link__alias2`:

        * The field is rendered as a block link.
        * example: `[<value>](siyuan://blocks/<value>)`
      * `__raw__alias3`:

        * The field is rendered as the original value (inline code style).
        * example: ``<value>``
      * `__date__alias4`:

        * The field is rendered as a date.
        * example: `yyyy-MM-dd`
      * `__time__alias5`:

        * The field is rendered as a time.
        * example: `HH:mm:ss`
      * `__datetime__alias6`:

        * The field is rendered as a datetime.
        * example: `yyyy-MM-dd HH:mm:ss`
      * `___s__alias7`:

        * The field is rendered as strikethrough.
        * example: `~~<value>~~`
      * `___u__alias8`:

        * The field is rendered as underline.
        * example: `<u><value></u>`
      * `___em__alias9`:

        * The field is rendered as emphasis.
        * example: `*<value>*`
      * `__tag__alias10`:

        * The field is rendered as tag.
        * example: `<kbd><value></kbd>`
      * `__kbd__alias11`:

        * The field is rendered as keyboard.
        * example: `~<value>~`
      * `__sub__alias12`:

        * The field is rendered as subscript.
        * example: `^<value>^`
      * `__sup__alias13`:

        * The field is rendered as superscript.
        * example: `#<value>#`
      * `__code__alias14`:

        * The field is rendered as inline code.
        * example: ``<value>``
      * `__mark__alias15`:

        * The field is rendered as mark.
        * example: `==<value>==`
      * `__math__alias16`:

        * The field is rendered as math formula.
        * example: `$<value>$`
      * `__strong__alias17`:

        * The field is rendered as weightbold.
        * example: `**<value>**`
      * `__pre__alias7`:

        * The field is rendered as a preview (rendering the markdown row-level identifier).
        * example: `<value>`
    * Use field aliases prefix to define query result field order.

      * `__<number>__alias8`:

        * The field can be placed in front of the query style prefix field.
        * example:

          * `__1____pre__alias9`
          * `__02____raw__alias10`
    * Displays the original value of the query result by default (using inline code).
    * Example of a field alias prefix

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
5. Partial template field parsing support
6. Partial template field parsing support.

    * `.<prefix>{.<field>}`

      * `<prefix>`: prefix field

        * `block`: Widget block.
        * `parent`: The parent block of the pendant block.
        * `root`: The document block in which the pendant block resides.
      * `<field>`: attribute field

        * The field name of the `blocks` table in the database.
      * Example: `SELECT * FROM blocks WHERE id = '.root{.id}' content LIKE '%content blocks%'`

        * Equivalent to `SELECT * FROM blocks WHERE id = '.block{.root_id}' content LIKE '%content blocks%'`
        * Query all blocks in the document where the pendant is located that contain the word `content blocks`

## CUSTOM CONFIG

### GLOBAL CUSTOM CONFIG

1. Create a file `<workspace>/data/widgets/custom.js`
2. The value defined in file `<workspace>/data/widgets/custom.js` overwrites the corresponding value in file `<workspace>/data/widgets/Query/src/script/module/config.js`.

#### CONFIG EXAMPLE

```js
/**
 * File Path
 *    <workspace>/data/widgets/custom.js
 * Example function:
 *    Block attributes are displayed in columns in the default block query results.
 */

export const config = {
    query: {
        render: {
            ial: {
                shape: 'columns',
            },
        },
    },
};


```

For more configuration items, see [config.js](./src/script/module/config.js)

### BLOCK CUSTOM CONFIG

* Set custom block attributes in the widget block(the Query button in your note).

  * Custom block attribute names are property in the `config` object under the file `src/script/module/config.js`.
  * For example, if you want to customize the query result field list, you can set the custom block attribute `query-fields`: `["hpath", "type", "markdown"]`, where the `config.query.fields` property will be replaced in this block.

## START

The widget has been put on the shelves at [SiYuan community bazaar](https://github.com/siyuan-note/bazaar) and can be installed directly in the Bazaar.

## REFERENCE & THANKS

|Author|Project|License|
| :------------------------------------------------------| :------------------------------------------------------------------| :------------|
|**[leolee9086](https://github.com/leolee9086)**|[leolee9086/cc-baselib](https://github.com/leolee9086/cc-baselib)|*Unknown*|

PS: Sort in no particular order.

## CONTRIBUTORS

<!-- [![CONTRIBUTOR](https://contrib.rocks/image?repo=Zuoqiu-Yingyi/widget-query)](https://github.com/Zuoqiu-Yingyi/widget-query/graphs/contributors) -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/leolee9086"><img src="https://avatars.githubusercontent.com/u/19915077?v=4?s=100" width="100px;" alt="leolee9086"/><br /><sub><b>leolee9086</b></sub></a><br /><a href="https://github.com/Zuoqiu-Yingyi/widget-query/issues?q=author%3Aleolee9086" title="Bug reports">🐛</a> <a href="https://github.com/Zuoqiu-Yingyi/widget-query/commits?author=leolee9086" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jpanda-cn"><img src="https://avatars.githubusercontent.com/u/50101020?v=4?s=100" width="100px;" alt="jpanda-cn"/><br /><sub><b>jpanda-cn</b></sub></a><br /><a href="https://github.com/Zuoqiu-Yingyi/widget-query/commits?author=jpanda-cn" title="Code">💻</a> <a href="#ideas-jpanda-cn" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.cnblogs.com/duanguyuan/"><img src="https://avatars.githubusercontent.com/u/5968678?v=4?s=100" width="100px;" alt="Wang Yong"/><br /><sub><b>Wang Yong</b></sub></a><br /><a href="https://github.com/Zuoqiu-Yingyi/widget-query/commits?author=whuwangyong" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/banjuer"><img src="https://avatars.githubusercontent.com/u/18739609?v=4?s=100" width="100px;" alt="banjuer"/><br /><sub><b>banjuer</b></sub></a><br /><a href="#ideas-banjuer" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Tlonglan"><img src="https://avatars.githubusercontent.com/u/38731172?v=4?s=100" width="100px;" alt="Tlonglan"/><br /><sub><b>Tlonglan</b></sub></a><br /><a href="#ideas-Tlonglan" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://git.io/k.r"><img src="https://avatars.githubusercontent.com/u/2762704?v=4?s=100" width="100px;" alt="Tim Zhang"/><br /><sub><b>Tim Zhang</b></sub></a><br /><a href="#ideas-ttimasdf" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Zuoqiu-Yingyi/widget-query/commits?author=ttimasdf" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lmmxj"><img src="https://avatars.githubusercontent.com/u/13883162?v=4?s=100" width="100px;" alt="lmmxj"/><br /><sub><b>lmmxj</b></sub></a><br /><a href="#ideas-lmmxj" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/frostime"><img src="https://avatars.githubusercontent.com/u/27268127?v=4?s=100" width="100px;" alt="Frostime"/><br /><sub><b>Frostime</b></sub></a><br /><a href="https://github.com/Zuoqiu-Yingyi/widget-query/commits?author=frostime" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

PS: The table is generated automatically using [All Contributors · GitHub](https://github.com/all-contributors), go to [emoji key](https://allcontributors.org/docs/en/emoji-key) to see the contribution type.

## CHANGE LOG

[CHANGE LOG](./CHANGELOG.md)
