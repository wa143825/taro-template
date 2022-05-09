/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-04-29 15:08:58
 * @Description: 头部注释配置模板
 */
import { FC, useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { WebView } from '@tarojs/components'

import { ArticleDetail } from '@/api/article'

const Index: FC = () => {
	const { params } = useRouter()
	const [url, sUrl] = useState('')

	useEffect(() => {
		ArticleDetail(params.id).then((res) => res.code === 200 && sUrl(res.data.articleUrl))
	}, [])

	return <WebView src={url}></WebView>
}

definePageConfig({
	navigationBarTextStyle: 'white',
	navigationBarBackgroundColor: '#000',
	navigationBarTitleText: '文章详情',
})

export default Index
