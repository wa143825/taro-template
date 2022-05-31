/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-05-31 10:06:52
 * @Description: 头部注释配置模板
 */

import path from 'path'
import fs from 'fs'

const passList = ['template', 'test', 'components']
const INDEX_PAGES = 'pages/index/index'
const replacePath = (v) => {
	return v.replace(/^(\s|@\/)+|(\s|.tsx)+$/g, '')
}

//查询
const QueryRouters = (pathName = 'pages') => {
	//路径
	const routrPath = `./${pathName}/`
	const srcPath = path.resolve(__dirname, routrPath)

	// //过滤
	const filterFunc = (item: string, index = 0) => {
		const len = item.length
		try {
			if (index === 0 && item[0] !== '.' && !passList.includes(item)) {
				return true
			} else if (item.substring(len - 4, len) === '.tsx') {
				return true
			}
		} catch (error) {
			return false
		}
	}
	// //获取路由信息
	const getRouter = () => {
		//动态录取当前路径下所有文件
		const result: string[] = fs.readdirSync(srcPath)
		//过滤并且 添加
		const filtetrList = result.reduce<string[]>((a, b) => {
			//查询父级文件名称是否符合要求
			const resultBoolean = filterFunc(b)
			//如果不符合
			if (!resultBoolean) {
				return a
			}
			//符合  读取子集目录
			const readPathSrc: any[] = fs.readdirSync(`${srcPath}/${b}/`)

			//获取到子集目录
			readPathSrc.forEach((item) => {
				const itemBoolean = filterFunc(item, 1)
				//是否符合
				if (!itemBoolean) {
					return
				}

				const p = `${pathName}/${b}/${replacePath(item)}`

				if (p === INDEX_PAGES) {
					a.unshift(INDEX_PAGES)
					return
				}
				a.push(p)
			})

			return a
		}, [])
		console.log(filtetrList)
		return filtetrList
	}

	// //返回路由
	return getRouter()
}



export default defineAppConfig({
  pages: QueryRouters(),
	entryPagePath: 'pages/index/index',
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
