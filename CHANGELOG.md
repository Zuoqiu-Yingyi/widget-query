# 更改日志 | CHANGE LOG

- 更新自定义属性视图示例 | Update the example of Custom Properties View.
- 优化模板字段替换方案 | Optimize the replacement scheme of template fields.
- 添加更多字段至 IAL 黑名单 | Add more fields to the IAL Blacklist.

## v0.3.1/2022-04-10

- [v0.3.0 <=> v0.3.1](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.3.0...v0.3.1)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 适配 `blocks` 表新字段 `fcontent` | Adapt `blocks` table to new field `fcontent`.
- 添加配置选项 `config.query.render.ial.fields.forced` 设置强制渲染的 IAL 键 | Add configuration option `config.query.render.ial.fields.forced` to define IAL keys that force rendering.
- 添加配置选项 `config.query.render.ial.fields.ignore` 设置不渲染的 IAL 键(黑名单) | Add configuration option `config.query.render.ial.fields.ignore` to define IAL keys that don't be rendered (blacklist).
- 添加配置选项 `config.query.render.ial.fields.valid` 设置可渲染的 IAL 键(白名单) | Add configuration option `config.query.render.ial.fields.ignore` to define IAL keys that can be rendered (whitelist).
- 修复 IAL 多行渲染问题 | Fix IAL multi-line rendering issue.

## v0.3.0/2022-04-09

- [v0.2.4 <=> v0.3.0](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.2.4...v0.3.0)
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

- [v0.2.3 <=> v0.2.4](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.2.3...v0.2.4)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 修复自定义排序别名前缀暴露问题 | fix the issue of custom sort alias prefix exposed.

## v0.2.3/2022-03-20

- [v0.2.2 <=> v0.2.3](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.2.2...v0.2.3)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 优化部分正则表达式 | Optimize some regular expressions.
- 查询结果表格添加滚动条(需要配合 [Dark+](https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus) 主题) | Add scroll bar to the query result table (requires [Dark+](https://github.com/Zuoqiu-Yingyi/siyuan-theme-dark-plus) theme).
- 为 IAL 解析器添加 HTML 转义字符解析 | Add HTML escaping characters parsing for IAL parser.
- 调整默认 IAL 渲染方法 | Adjust the default IAL rendering method.
- 优化渲染速度 | Optimize rendering speed.
- 扩展用于样式渲染的字段别名前缀 | Extend prefixes for field aliases for style rendering.

## v0.2.2/2022-03-17

- [v0.2.1 <=> v0.2.2](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.2.1...v0.2.2)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 修复查询结果字段别名显示用于排序的前缀问题 | Fix an issue where query result field aliases display prefixes for sorting.

## v0.2.1/2022-03-15

- [v0.2.0 <=> v0.2.1](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.2.0...v0.2.1)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 使用 `node.dataset` 代替 `node.getAttribute` | Use `node.dataset` instead of `node.getAttribute`.
- 默认使用思源内部超链接(`siyuan:`)渲染查询结果 | Default use SiYuan internal hyperlinks (`siyuan://`) to render query result.
- 修复字段别名前缀 `__link__` 样式渲染问题 | Fix the issue of field alias prefix `__link__` style rendering.

## v0.2.0/2022-03-13

- [v0.1.9 <=> v0.2.0](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.9...v0.2.0)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 增加用于手动定义查询结果顺序的字段别名前缀 | Add field alias prefix for manual ordering of query results.
- 为默认块查询渲染函数句柄传递内联属性表 `IAL` 解析值 | Pass the inline attribute table `IAL` value to the default block query renderer.
- 使用按钮背景颜色表示挂件当前状态 | Use button background color to indicate the current state of the widget.

## v0.1.9/2022-03-12

- [v0.1.8 <=> v0.1.9](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.8...v0.1.9)
- 修复资源文件引用路径问题 | Fixed the resource file reference path issue.

## v0.1.8/2022-03-10

- [v0.1.7 <=> v0.1.8](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.7...v0.1.8)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 在 `config.query.render` 属性中设置默认块查询时相应字段的渲染方式 | Set the rendering of the corresponding field when the default block query is set in the `config.query.render` property.
- 更改自定义配置文件覆盖默认配置文件方案为递归覆盖 | Change the custom configuration file override the default configuration file solution to recursive overrides.

## v0.1.7/2022-03-07

- [v0.1.6 <=> v0.1.7](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.6...v0.1.7)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 使用 [All Contributors · GitHub](https://github.com/all-contributors) 自动生成贡献者列表 | Use [All Contributors · GitHub](https://github.com/all-contributors) automatically generates a table of contributors.
- 增加通过设置查询结果表格自定义块属性的方式设置渲染样式 | Added the way to set the rendering style by setting the query result table custom block attributes.

## v0.1.6/2022-03-02

- [v0.1.5 <=> v0.1.6](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.5...v0.1.6)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 添加查询记录默认最大数量(该功能默认关闭) | Add the default maximum number of query records (this feature is off by default).
  - 配置选项 | Configuration options: `config.sql.limit`
- 移除查询结果表头用于指定渲染样式的字段别名前缀 | Removes the field alias prefix that the query results header uses to specify the rendering style.

## v0.1.5/2022-02-18

- [v0.1.4 <=> v0.1.5](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.4...v0.1.5)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 使用字段别名定义查询显示样式 | Use field aliases to define query display styles.

## v0.1.4/2022-02-13

- [v0.1.3 <=> v0.1.4](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.3...v0.1.4)
- 配置文件 `config.js` 有变更 | There are changes to the configuration file `config.js`.
- 使用自定义属性实现每个挂件块的自定义配置 | Use custom attributes to implement a custom configuration for each widget block.
  - [借助于挂件的自定义属性实现每个不同的挂件可以展示不同的表格内容 by jpanda-cn · Pull Request #5 · Zuoqiu-Yingyi/widget-query](https://github.com/Zuoqiu-Yingyi/widget-query/pull/5)
- 使用配置文件设置块搜索结果各字段的宽度 | Use a configuration file to set the width of each field of the block search results.
- 查询结果为 0 时渲染表格头 | The table header is rendered when the query result is 0.
- 修复多个相同模板字段解析失败问题 | Fixed multiple failed parsing of the same template fields.

## v0.1.3/2022-02-12

- [v0.1.2 <=> v0.1.3](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.2...v0.1.3)
- 修复默认处理方法参数错误 | Fixed default processing method parameter errors.
- 默认块搜索结果排除挂件查询组合块 | The default block search results exclude the widget query combination block.

## v0.1.2/2022-02-10

- [v0.1.1 <=> v0.1.2](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.1...v0.1.2)
- 修复配置文件字段引用错误 | Fix profile field reference errors.
- 修复有序列表项与任务列表项中插入查询代码块运行时异常 | Fixed a run-time exception for inserting a query code block into a ordered list item or task list item.

## v0.1.1/2022-02-10

- [v0.1.0 <=> v0.1.1](https:///github.com/Zuoqiu-Yingyi/widget-query/compare/v0.1.0...v0.1.1)
- 修复列表项中插入查询代码块运行时异常 | Fixed a run-time exception for inserting a query code block into a list item.
- 修复引述块或超级快中插入查询代码时异常 | Fixed an exception when inserting query code in Quoted Block or Super Express.
- 新增部分思源模板参数解析 | Added the parsing of partial template parameters in the Siyuan.
- 默认查询时使用自定义处理方法 | Custom processing methods are used when querying by default.

## v0.1.0/2022-02-10

- 初始化 | Initialization.
