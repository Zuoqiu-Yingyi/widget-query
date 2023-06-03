# 更改日志 | CHANGE LOG

## v0.4.5/2023-06-04

- [v0.4.4 ... v0.4.5](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.4.4...v0.4.5)
- 优化行内代码渲染方案 | Optimize the inline code rendering scheme.
- 完善清单文件内容 | Improve the content of the manifest file.
- 完善英文文档 | Improve the English documentation.

## v0.4.4/2023-05-06

- [v0.4.3 ... v0.4.4](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.4.3...v0.4.4)
- 添加配置选项 `config.query.render.markdown.s.marks` 设置是否渲染超级块标志符 | Add configuration option `config.query.render.markdown.s.marks` to define whether to render superblock marks.
- 调整挂件默认样式 | Adjust the default style of the widget.
- 为自动查询复选框添加提示 | Add a tooltip to the auto query checkbox.
- 修复表格列样式设置无效问题 | Fix the issue that the table column style setting is invalid.

## v0.4.3/2023-04-26

- [v0.4.2 ... v0.4.3](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.4.2...v0.4.3)
- 默认查询结果中的 `box` 字段显示笔记本名称 | The `box` field in the default query result displays the notebook name.
- 优化 README 徽标 | Optimize README badges.

## v0.4.2/2022-10-07

- [v0.4.1 ... v0.4.2](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.4.1...v0.4.2)
- 修复代码块初始化时默认内容为空的问题 | Fixed the issue that the code block init content is empty.
- IAL 忽略记录当前文档浏览位置的属性 `scroll` | IAL ignores the attribute `scroll` which records the current document position.
- IAL 忽略记录是否显示嵌入块面包屑的属性 `breadcrumb` | IAL ignores the attribute `breadcrumb` whether to display the breadcrumb of embedded block.
- 文档块的 `markdown` 字段显示文档标题 | The `markdown` field of the document block displays the document title.

## v0.4.1/2022-06-06

- [v0.4.0 ... v0.4.1](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.4.0...v0.4.1)
- 修复读取 `custom-input` 属性时机问题 | Fixed the issue of reading `custom-input` attribute timing.

## v0.4.0/2022-06-04

- [v0.3.4 ... v0.4.0](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.3.4...v0.4.0)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 完善异常捕获 | Improve exception capture.
- 支持使用自定义块属性 `custom-input` 与 `custom-output` 所对应的块作为代码块与查询结果表格块(在没有前置代码块与后置查询结果表格块时启用) | Support custom block `custom-input` and `custom-query-table-id` as code block and query result table block (Enabled when there is no pre-code block and post-table block).

## v0.3.4/2022-05-04

- [v0.3.3 ... v0.3.4](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.3.3...v0.3.4)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 修复 IAL 解析器无法解析 `\` 字符的问题 | Fix the issue that IAL parser cannot parse `\` character.
- 提供对 `blocks` 表中字段 `tag` 的解析支持 | Provide support for parsing `blocks` table field `tag`.

## v0.3.3/2022-05-02

- [v0.3.2 ... v0.3.3](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.3.2...v0.3.3)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 添加代码块默认内容 | Added default content for code blocks.
- 正则表达式兼容 FTS | Regexp is compatible with FTS.
- 查询结果表格更新时保留原自定义块属性 | When updating the result table, preserve the original custom block attributes.
- 查询结果表格更新时保留部分内置属性 | When updating the result table, preserve some build-in attributes.

## v0.3.2/2022-04-18

- [v0.3.1 ... v0.3.2](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.3.1...v0.3.2)
- 更新自定义属性视图示例 | Update the example of Custom Properties View.
- 优化模板字段替换方案 | Optimize the replacement scheme of template fields.
- 添加更多字段至 IAL 黑名单 | Add more fields to the IAL Blacklist.
- 添加加载完成自动查询开关 | Add a switch to automatically query when loading is completed.

## v0.3.1/2022-04-10

- [v0.3.0 ... v0.3.1](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.3.0...v0.3.1)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 适配 `blocks` 表新字段 `fcontent` | Adapt `blocks` table to new field `fcontent`.
- 添加配置选项 `config.query.render.ial.fields.forced` 设置强制渲染的 IAL 键 | Add configuration option `config.query.render.ial.fields.forced` to define IAL keys that force rendering.
- 添加配置选项 `config.query.render.ial.fields.ignore` 设置不渲染的 IAL 键(黑名单) | Add configuration option `config.query.render.ial.fields.ignore` to define IAL keys that don't be rendered (blacklist).
- 添加配置选项 `config.query.render.ial.fields.valid` 设置可渲染的 IAL 键(白名单) | Add configuration option `config.query.render.ial.fields.ignore` to define IAL keys that can be rendered (whitelist).
- 修复 IAL 多行渲染问题 | Fix IAL multi-line rendering issue.

## v0.3.0/2022-04-09

- [v0.2.4 ... v0.3.0](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.2.4...v0.3.0)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 添加配置选项 `config.query.index` 用于控制是否显示查询结果序号 | Add configuration option `config.query.index` to control whether to display the query result ordinal.
- 使用字段别名前缀 `__hidden__` 在查询结果中隐藏该字段 | Use the field alias prefix `__hidden__` to hide the field in the query result.
- 修复 `.all-contributorsrc` 文件配置问题 | Fix the configuration problem of the `.all-contributorsrc` file.
- 添加多列显示块属性功能 | Add multiple column display block attribute function.
- 解析 UTF-32 编码的图标 | Parse UTF-32 encoding icon.
- 修复查询结果中自定义图标显示问题 | Fixed the issue of custom icons' display in the search results.
- 优化自定义块属性覆盖默认设置项的方式 | Optimized the way of overriding default config of custom block attributes.
- 添加忽略的块属性 | Add ignored block attributes.

## v0.2.4/2022-03-23

- [v0.2.3 ... v0.2.4](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.2.3...v0.2.4)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 修复自定义排序别名前缀暴露问题 | fix the issue of custom sort alias prefix exposed.

## v0.2.3/2022-03-20

- [v0.2.2 ... v0.2.3](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.2.2...v0.2.3)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 优化部分正则表达式 | Optimize some regular expressions.
- 查询结果表格添加滚动条(需要配合 [Dark+](https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus) 主题) | Add scroll bar to the query result table (requires [Dark+](https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus) theme).
- 为 IAL 解析器添加 HTML 转义字符解析 | Add HTML escaping characters parsing for IAL parser.
- 调整默认 IAL 渲染方法 | Adjust the default IAL rendering method.
- 优化渲染速度 | Optimize rendering speed.
- 扩展用于样式渲染的字段别名前缀 | Extend prefixes for field aliases for style rendering.

## v0.2.2/2022-03-17

- [v0.2.1 ... v0.2.2](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.2.1...v0.2.2)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 修复查询结果字段别名显示用于排序的前缀问题 | Fix an issue where query result field aliases display prefixes for sorting.

## v0.2.1/2022-03-15

- [v0.2.0 ... v0.2.1](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.2.0...v0.2.1)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 使用 `node.dataset` 代替 `node.getAttribute` | Use `node.dataset` instead of `node.getAttribute`.
- 默认使用思源内部超链接(`siyuan:`)渲染查询结果 | Default use SiYuan internal hyperlinks (`siyuan://`) to render query result.
- 修复字段别名前缀 `__link__` 样式渲染问题 | Fix the issue of field alias prefix `__link__` style rendering.

## v0.2.0/2022-03-13

- [v0.1.9 ... v0.2.0](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.9...v0.2.0)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 增加用于手动定义查询结果顺序的字段别名前缀 | Add field alias prefix for manual ordering of query results.
- 为默认块查询渲染函数句柄传递内联属性表 `IAL` 解析值 | Pass the inline attribute table `IAL` value to the default block query renderer.
- 使用按钮背景颜色表示挂件当前状态 | Use button background color to indicate the current state of the widget.

## v0.1.9/2022-03-12

- [v0.1.8 ... v0.1.9](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.8...v0.1.9)
- 修复资源文件引用路径问题 | Fixed the resource file reference path issue.

## v0.1.8/2022-03-10

- [v0.1.7 ... v0.1.8](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.7...v0.1.8)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 在 `config.query.render` 属性中设置默认块查询时相应字段的渲染方式 | Set the rendering of the corresponding field when the default block query is set in the `config.query.render` property.
- 更改自定义配置文件覆盖默认配置文件方案为递归覆盖 | Change the custom configuration file override the default configuration file solution to recursive overrides.

## v0.1.7/2022-03-07

- [v0.1.6 ... v0.1.7](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.6...v0.1.7)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 使用 [All Contributors · GitHub](https://github.com/all-contributors) 自动生成贡献者列表 | Use [All Contributors · GitHub](https://github.com/all-contributors) automatically generates a table of contributors.
- 增加通过设置查询结果表格自定义块属性的方式设置渲染样式 | Added the way to set the rendering style by setting the query result table custom block attributes.

## v0.1.6/2022-03-02

- [v0.1.5 ... v0.1.6](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.5...v0.1.6)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 添加查询记录默认最大数量(该功能默认关闭) | Add the default maximum number of query records (this feature is off by default).
  - 配置选项 | Configuration options: `config.sql.limit`
- 移除查询结果表头用于指定渲染样式的字段别名前缀 | Removes the field alias prefix that the query results header uses to specify the rendering style.

## v0.1.5/2022-02-18

- [v0.1.4 ... v0.1.5](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.4...v0.1.5)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 使用字段别名定义查询显示样式 | Use field aliases to define query display styles.

## v0.1.4/2022-02-13

- [v0.1.3 ... v0.1.4](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.3...v0.1.4)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 使用自定义属性实现每个挂件块的自定义配置 | Use custom attributes to implement a custom configuration for each widget block.
  - [借助于挂件的自定义属性实现每个不同的挂件可以展示不同的表格内容 by jpanda-cn · Pull Request #5 · Zuoqiu-Yingyi/widget-query](https://github.com/Zuoqiu-Yingyi/widget-query/pull/5)
- 使用配置文件设置块搜索结果各字段的宽度 | Use a configuration file to set the width of each field of the block search results.
- 查询结果为 0 时渲染表格头 | The table header is rendered when the query result is 0.
- 修复多个相同模板字段解析失败问题 | Fixed multiple failed parsing of the same template fields.

## v0.1.3/2022-02-12

- [v0.1.2 ... v0.1.3](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.2...v0.1.3)
- 修复默认处理方法参数错误 | Fixed default processing method parameter errors.
- 默认块搜索结果排除挂件查询组合块 | The default block search results exclude the widget query combination block.

## v0.1.2/2022-02-10

- [v0.1.1 ... v0.1.2](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.1...v0.1.2)
- 修复配置文件字段引用错误 | Fix profile field reference errors.
- 修复有序列表项与任务列表项中插入查询代码块运行时异常 | Fixed a run-time exception for inserting a query code block into a ordered list item or task list item.

## v0.1.1/2022-02-10

- [v0.1.0 ... v0.1.1](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.0...v0.1.1)
- 修复列表项中插入查询代码块运行时异常 | Fixed a run-time exception for inserting a query code block into a list item.
- 修复引述块或超级快中插入查询代码时异常 | Fixed an exception when inserting query code in Quoted Block or Super Express.
- 新增部分思源模板参数解析 | Added the parsing of partial template parameters in the Siyuan.
- 默认查询时使用自定义处理方法 | Custom processing methods are used when querying by default.

## v0.1.0/2022-02-10

- 初始化 | Initialization.
