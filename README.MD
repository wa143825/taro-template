<!--
 * @Author: Re_Vive
 * @LastEditTime: 2022-06-01 16:53:26
 * @Description: 配置
-->
<div align="center">
  <h1>Taro</h1>
  <p>开放式跨端跨框架解决方案，轻松构建可以运行在 小程序/Web/APP 上的应用</p>
  <a href="https://taro-docs.jd.com/taro/docs/README">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e04c79e7bfd420c939f8b5e2b708ad3~tplv-k3u1fbpfcp-zoom-1.image">
  </a>
  <a href="https://reactjs.org/">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16473fc4202542ad86b139330bf018f7~tplv-k3u1fbpfcp-zoom-1.image">
  </a>
  <a href="https://github.com/umijs/hox">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0053025b9133449c89ba2399055b20b1~tplv-k3u1fbpfcp-zoom-1.image">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf443410582541768e4bc43a0819fccb~tplv-k3u1fbpfcp-zoom-1.image">
  </a>
  <a href="https://windicss.org/">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7ed1081dbd540b99f1ae71cf054fcb1~tplv-k3u1fbpfcp-zoom-1.image">
  </a>

</div>

# 一、简介

使用 taro 3.4.1 框架，完全使用 hooks 语法 + ts 语言进行编写，结合 windicss 做页面布局，目前只完成了自定义 tabbar 和 navbar，当然还是有不少需要完善的地方，后期项目开展过程中，讲将新的公共组件和函数等加入进来，持续维护这个模板，作为后面开发的基石。

> app.config.ts里有自动读取pages的方法，会自动配置路由，不需要写一个页面配置一个页面

# 二、安装方法

```
// 安装依赖
yarn / npm i

// 运行
yarn dev
```

# 三、编码规范

- 作为新项目的话，第一步应该去 tailwind.config.js 文件修改全局公共样式
- 作为一个 ts 项目，前期可以使用 any，中后期应逐步将 any 替换
- 部分公共方法和参数应使用 jsdoc 进行标记，方便调用的时候查看

# 文件格式规范

1. 相关业务文件应放在一个文件夹
2. 尽量(非必须)使用 windi，避免自己写 css
3. 尽量抽离公共组件，方便下次使用
4. 公共组件分为通用组件(src/components)、个性化组件(pages/components)

## 引入顺序

1. 官方核心依赖(react,taro)
2. 官方组件库(componets,taro-ui)
3. 自定义全局组件(Btn,Navbar)
4. 自定义全局方法(utils,api 方法)
5. 第三方方法库(big-js)
6. 自定义页面模板(Layout)
7. 本目录组件

## 命名规范

1. 变量名应使用英文名词单数形式
2. 无歧义且常用的单词可省略至 3~5 位（category -> cate）
3. 一般变量和函数使用小驼峰命名法
4. 接口函数等公共方法使用大驼峰命名法
5. 是否为某值以 is 开头，是否含有某值以 has 开头
6. type 以大写 T 开头、interface 以大写 I 开头 + 大驼峰命名
7. 常量使用全大写

## 代码书写格式

这些都由 eslint + prettier 配合编辑器自动格式化

1. 结尾去掉分号
2. 使用单引号
3. 括号内前后留一个空格
4. 使用 2 个 tab 作为缩进
5. (建议)中英文或符号间有个半角空格

# 四、开发注意事项

1. 大多数位置都需要 3 种状态【未登录，已登录有数据，无数据】
2. 与用户数据相关的页面做强制登陆操作，不需要强制登陆则做请登陆提示
3. 动态全局数据都放在 store 里，并暴露出刷新方法【userInfo, refreshUserInfo】
4. 静态全局信息放在 storage 里，并在`utils/local.ts`里写好存取方法，方便调用

# 五、插件安装及编辑器设置
推荐使用vscode来进行开发，为了配合代码格式，建议安装以下插件：
1、ESLint
2、EditorConfig
3、Prettier
4、koroFileHeader
5、Document This

编辑设置设置
```
  "editor.quickSuggestions": {
    "strings": true
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "javascriptreact", "html", "vue", "typescript"],
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "[typescriptreact, javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "prettier.jsxSingleQuote": true,
  "prettier.jsxBracketSameLine": true,
  "prettier.printWidth": 150,
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",

  "fileheader.customMade": {
    "Author": "Re_Vive",
    "LastEditTime": "Do not edit",
    "Description": "头部注释配置模板"
  },

  "docthis.dateTagFormat": "yyyy/mm/dd",
  "docthis.includeDescriptionTag": true,
```

# 0、 目录树说明

```
src
├─app.config.ts
├─app.scss
├─app.tsx
├─index.html
├─utils // 公共方法
├─typings // 公共请求方法的type
|    ├─methods.ts
|    └request.ts
├─store // 全局状态管理文件
├─pages // 所有页面放在pages里
|   ├─login
|   |   ├─components //页面内组件
|   ├─index
|   ├─components // 专用组件，根据不同项目调整
|   |     ├─layout
|   |     ├─formItem
|   |     ├─blockTitle
|   ├─article
├─model // 将不同数据的interface放在这里
├─hooks // 自定hooks
├─config // 项目全局配置
├─components // 公共组件，大多数项目都可通用
|     ├─tarbar
|     ├─nextPage
|     ├─navbar
|     ├─empty
|     ├─btn
├─assets
|   ├─temp // 开发时临时文件
|   ├─tabbar // tabbar 使用的图片
|   ├─no // empty组件使用的图片
|   ├─iconfont // 字体图标
|   ├─home // 首页使用的图片
├─api // api接口文件
```
