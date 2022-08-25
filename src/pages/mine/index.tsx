/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-08-25 17:31:48
 * @Description: 头部注释配置模板
 */
import { FC } from 'react'
import { View } from '@tarojs/components'
import Layout from '@/components/layout'

const Index: FC = () => {
  return (
    <Layout
      navConfig={{
        title: '我的',
        bgColor: '#000',
        fontColor: 'white',
      }}
      hasTabbar
    >
      <View>我的</View>
    </Layout>
  )
}

export default Index
