/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-05-09 16:16:20
 * @Description: 头部注释配置模板
 */
import { FC } from '@tarojs/react'
import { useEffect, useState } from 'react'
import { View, RichText } from '@tarojs/components'
import Layout from '@/components/layout'

import { Agreement } from '@/api/index'
import { toPage } from '@/utils'

const Index: FC = () => {
	const [data, sData] = useState()

	useEffect(() => {
		Agreement().then((res) => {
			sData(res.data.configContent)
		})
	}, [])

	const confirm = () => {
		toPage('back')
	}

	return (
		<Layout
			navConfig={{
				title: '富文本',
				bgColor: 'white',
				hasBack: true,
			}}
			scrollConfig={{
				bgColor: 'white',
			}}
			btmHandle={
				<View className="col-c w-full h-full">
					<View onClick={confirm} className="w-600rpx h-80rpx col-c bg-black text-white">
						我已阅读并同意
					</View>
				</View>
			}
		>
			<View className="px-30rpx">
				<RichText nodes={data}></RichText>
			</View>
		</Layout>
	)
}

export default Index
