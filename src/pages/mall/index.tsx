/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-06-15 14:52:32
 * @Description: 头部注释配置模板
 */
import { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'

import Layout from '@/components/layout'

import './index.scss'

const Index: FC = () => {
  return (
    <Layout
      navConfig={{
        title: '商城',
        bgColor: '#920926',
        fontColor: 'white',
      }}
      hasTabbar
    >
      <View>商城</View>
    </Layout>
  )
}

definePageConfig({
  navigationBarTextStyle: 'white',
})

export default Index
