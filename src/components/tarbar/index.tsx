/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-08-25 17:37:00
 * @Description: 头部注释配置模板
 */
import Taro from '@tarojs/taro'
import { Image, View, Text } from '@tarojs/components'
import { useMemo, FC } from 'react'
import { useSysStore } from '@/store/system'

export interface IItem {
  title: string
  path: string
  icon: string
  func?: () => void
}

interface ITabBar {
  items: IItem[]
  textColor?: string
  selColor?: string
  bgColor?: string
  midBulge?: boolean
}

const TabBar: FC<ITabBar> = ({ items, textColor = '#9496a3', selColor = '#000000', bgColor = 'white', midBulge = false }) => {
  const { isPhoneX, tabIdx, sTabIdx } = useSysStore()

  const switchTab = (item: IItem, idx: number) => {
    sTabIdx(idx)
    if (item.func != undefined) {
      item.func()
    } else {
      Taro.switchTab({ url: `../${item.path}` })
    }
  }

  return useMemo(() => {
    return (
      <View
        className="flex items-center fixed bottom-0 w-full h-130rpx"
        style={{ backgroundColor: bgColor, boxShadow: '0 -5rpx 10rpx rgba(185,185,185,0.5)', marginBottom: isPhoneX ? '40rpx' : 0 }}
      >
        {midBulge && (
          <Image
            className="absolute w-292rpx h-70rpx -top-70rpx left-230rpx"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAAdCAYAAABBnTWDAAAACXBIWXMAABYlAAAWJQFJUiTwAAAFG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuZGFiYWNiYiwgMjAyMS8wNC8xNC0wMDozOTo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTE4VDE0OjQ4OjAzKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0xOFQxNTowMToyNyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wMi0xOFQxNTowMToyNyswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMWQ0ZTE1NS0yMDBh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"
          ></Image>
        )}
        {items.map((i: IItem, idx: number) => (
          <View onClick={() => switchTab(i, idx)} className="flex flex-col items-center w-1_5" key={idx}>
            {midBulge && idx === 2 ? (
              <View onClick={() => i.func} className="w-50rpx h-50rpx relative">
                <Image className="w-120rpx h-120rpx absolute -top-65rpx -left-35rpx" src={i.icon} />
              </View>
            ) : (
              <Text className={`'text-50rpx iconfont i-${i.icon}'`} style={{ color: tabIdx === idx ? selColor : textColor }} />
            )}
            <View className="text-sm mt-10rpx" style={{ color: tabIdx === idx ? selColor : textColor }}>
              {i.title}
            </View>
          </View>
        ))}
      </View>
    )
  }, [])
}

export default TabBar
