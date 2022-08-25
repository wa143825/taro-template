import { FC } from 'react'
import { View } from '@tarojs/components'
import Layout from '@/components/layout'

const Index: FC = () => {
  return (
    <Layout
      navConfig={{
        title: '首页',
        bgColor: '#920926',
        fontColor: 'white',
      }}
      hasTabbar
    >
      <View className="">首页</View>
    </Layout>
  )
}

definePageConfig({
  navigationBarTextStyle: 'white',
})

export default Index
