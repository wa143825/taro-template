/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-08-25 17:34:16
 * @Description: 导航条
 */
import Taro from '@tarojs/taro'
import { Image, View, Text } from '@tarojs/components'
import { useMemo, FC } from 'react'
import { useSysStore } from '@/store/system'

export interface INavBar {
  title?: string
  bgUrl?: string
  fontColor?: string
  bgColor?: string
  hasBack?: boolean
}

/**
 * @description 头部导航条参数
 * @interface INavBar
 * @param title 标题
 * @param bgUrl 背景图片
 * @param fontColor 字体颜色
 * @param bgColor 背景颜色
 * @param hasBack 是否需要返回键
 */
const NavBar: FC<INavBar> = ({ title, bgUrl, fontColor, bgColor, hasBack }) => {
  const { navbarH, top, iv, height } = useSysStore()
  return useMemo(() => {
    const customH = height
    const fontSize = customH / 2

    const goBack = () => {
      Taro.navigateBack()
    }

    return (
      <View style={{ height: navbarH, background: bgColor }}>
        <View className="pl-25rpx font-bold" style={{ paddingTop: top, height: customH, paddingBottom: iv, backgroundColor: bgColor }}>
          <View className="flex items-center" style={{ color: fontColor, fontSize }}>
            {hasBack && (
              <Text
                onClick={goBack}
                className="iconfont i-arrow inline-block transform rotate-180"
                style={{ fontSize: customH / 1.2, color: fontColor }}
              />
            )}
            {title}
          </View>

          {bgUrl && (
            <Image
              style={{
                top: `0`,
              }}
              mode="widthFix"
              src={bgUrl}
            ></Image>
          )}
        </View>
      </View>
    )
  }, [title])
}

NavBar.defaultProps = {
  fontColor: '#333',
  bgColor: 'transparent',
  hasBack: false,
}

export default NavBar
