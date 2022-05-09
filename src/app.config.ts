/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-05-09 16:11:55
 * @Description: 头部注释配置模板
 */
export default defineAppConfig({
  pages: [
    // tabbar
    'pages/index/index',
    'pages/mall/index',
    'pages/article/index',
    'pages/mine/index',

		//other
    'pages/other/webview',
    'pages/other/richtext',
  ],
  window: {
    navigationStyle: "custom",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/mall/index',
        text: '商城',
      },
      {
        pagePath: 'pages/article/index',
        text: '专栏',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
      }
    ]
  }
})
