/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-08-25 17:26:53
 * @Description: 头部注释配置模板
 */
import Taro from '@tarojs/taro'
import { useEffect } from 'react'

import { HoxRoot } from 'hox'

import 'taro-ui/dist/style/index.scss' //taro-ui
import '@/assets/iconfont/iconfont.css' // iconfont
import 'windi.css' // 使用windi必须导入

//检查是否需要更新
const checkForUpdate = () => {
  try {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function () {})
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        },
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  } catch (error) {}
}

const App = ({ children }) => {
  Taro.showShareMenu({
    withShareTicket: true,
    showShareItems: ['shareAppMessage', 'shareTimeline'],
  })

  useEffect(() => {
    checkForUpdate()
  }, [])

  return <HoxRoot>{children}</HoxRoot>
}

export default App
