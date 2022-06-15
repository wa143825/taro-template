/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-05-09 16:14:49
 * @Description: 头部注释配置模板
 */
import { FC } from '@tarojs/taro'
import { useState, useEffect, useRef } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import useSystem from '@/store/system'
import NextPage from '@/components/nextPage'
import { usePaging } from '@/hooks/paging'
import { ArticleCate, ArticleList } from '@/api/article'
import { toPage } from '@/utils'

import Layout from '@/components/layout'

interface ITab {
  id: number
  title: string
}

const Index: FC = () => {
  const { navbarH, screenHeight, actualRatio } = useSystem()

  const cur = useRef(0)
  const [tablist, sTablist] = useState<ITab[]>([{ id: -1, title: '全部' }])

  useEffect(() => {
    ArticleCate({ orderByColumn: 'sort' }).then((res) => {
      if (res.code === 200) {
        let list: ITab[] = []
        res.rows.forEach((i) => {
          list.push({ id: i.id, title: i.typeName })
        })
        sTablist((d) => [...d, ...list])
      }
    })
  }, [])

  const { listData, nextPage, staus, reload } = usePaging({
    getList(d) {
      return ArticleList({
        typeId: tablist[cur.current].id,
      })
    },
  })

  const tabChange = (idx) => {
    cur.current = idx
    reload()
  }

  return (
    <Layout
      navConfig={{
        title: '文章列表',
        bgColor: 'white',
      }}
      hasTabbar
    >
      <ScrollView className="bg-white" scrollX>
        <View className="flex">
          {tablist.map((i, idx) => (
            <View onClick={() => tabChange(idx)} key={i.id} className={`"p-24rpx ${cur.current == idx ? 'font-semibold' : ''}"`}>
              {i.title}
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView scrollY style={{ height: `${screenHeight - navbarH - 130 * actualRatio - 47}px` }}>
        {listData.map((i, idx) => (
          <View className="w-690rpx mx-30rpx mt-30rpx" onClick={() => toPage(`/pages/other/webview?id=${i.id}`)} key={idx}>
            <Image className="w-690rpx block" src={i.coverImage}></Image>
            <View className="flex justify-between bg-white p-30rpx w-690rpx box-border">
              <View>{i.articleName}</View>
              <View className="text-gary">{i.createTime}</View>
            </View>
          </View>
        ))}
        <NextPage staus={staus} next={nextPage} padding={[40, 50]} />
        <View className="h-70rpx"></View>
      </ScrollView>
    </Layout>
  )
}

export default Index
