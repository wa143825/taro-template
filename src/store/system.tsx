/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-08-25 17:28:45
 * @Description: 头部注释配置模板
 */
import Taro, { getSystemInfoSync } from '@tarojs/taro'
import { useState } from 'react'
import { createGlobalStore } from 'hox'

const data = Taro.getMenuButtonBoundingClientRect()
const systemInfo = getSystemInfoSync()
const actualRatio = systemInfo.screenWidth / 750
const isIPhoneX = systemInfo.screenHeight !== systemInfo.safeArea?.bottom
const iv = 15

type TUseSystemType = {
  navbarH: number
  iv: number
  isPhoneX: boolean
  actualRatio: number

  tabIdx: number
  sTabIdx: any
} & Taro.getMenuButtonBoundingClientRect.Rect &
  Taro.getSystemInfoSync.Result

export const [useSysStore, SysStoreProvider] = createGlobalStore<TUseSystemType>(() => {
  const [tabIdx, sTabIdx] = useState(0)

  return {
    ...data,
    navbarH: data.top + data.height + iv,
    iv: iv,
    isPhoneX: isIPhoneX,
    actualRatio,
    ...systemInfo,

    tabIdx,
    sTabIdx,
  }
})
