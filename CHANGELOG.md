# 更改日志 | CHANGE LOG

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
