import { FC } from '@tarojs/taro'
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
