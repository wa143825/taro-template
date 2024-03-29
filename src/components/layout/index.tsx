/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-08-25 17:36:02
 * @Description: 头部注释配置模板
 */
import { ReactElement, FC } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Tabbar, { IItem } from '@/components/tarbar'
import NavBar, { INavBar } from '@/components/navbar'

import { useSysStore } from '@/store/system'

interface IScorll {
  loading?: boolean
  refresherEnabled?: boolean
  bgColor?: string
  onRefresherRefresh?: () => void
}

interface ILayout {
  navConfig: INavBar
  scrollConfig?: IScorll
  hasTabbar?: boolean
  hasNavbar?: boolean
  btmHandle?: ReactElement
}

const tabList: IItem[] = [
  {
    title: '首页',
    path: 'index/index',
    icon: 'home1',
  },
  {
    title: '福利',
    path: 'mall/index',
    icon: 'shangcheng',
  },
  {
    title: '一键救援',
    path: '',
    icon: 'data:image/png;base64,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',
    func: () => {},
  },
  {
    title: '发现',
    path: 'article/index',
    icon: 'chanpinliebiaopubuliumoshi',
  },
  {
    title: '我的',
    path: 'mine/index',
    icon: 'gerenzhongxin',
  },
]

const Layout: FC<ILayout> = ({ children, navConfig, scrollConfig, hasTabbar, hasNavbar, btmHandle }) => {
  const { navbarH, screenHeight, actualRatio, isPhoneX } = useSysStore()

  const { title, fontColor, bgColor, bgUrl, hasBack } = navConfig

  return (
    <View>
      {hasNavbar && <NavBar title={title} fontColor={fontColor} bgColor={bgColor} bgUrl={bgUrl} hasBack={hasBack} />}

      <ScrollView
        enableFlex
        refresher-default-style="white"
        refresher-triggered={scrollConfig?.loading}
        scrollY
        refresher-background="rgba(0,0,0,0)"
        onRefresherRefresh={scrollConfig?.onRefresherRefresh}
        // refresherEnabled
        style={{
          height: `${screenHeight - (hasNavbar ? navbarH : 0) - (hasTabbar || btmHandle !== undefined ? 130 * actualRatio : 0)}px`,
          background: scrollConfig?.bgColor,
        }}
      >
        {children}
      </ScrollView>
      {hasTabbar && btmHandle === undefined && <Tabbar items={tabList} midBulge />}
      {btmHandle !== undefined && (
        <View className="bottom-0 shadow-md bg-white w-full relative" style={{ height: `${130 * actualRatio}px`, bottom: isPhoneX ? '40rpx' : 0 }}>
          {btmHandle}
        </View>
      )}
    </View>
  )
}

Layout.defaultProps = {
  scrollConfig: {
    loading: false,
    refresherEnabled: false,
    bgColor: '#f3f3f3',
    onRefresherRefresh: () => true,
  },
  hasTabbar: false,
  hasNavbar: true,
}

export default Layout
