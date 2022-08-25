import { useUserStore } from '@/store/user'
import { Methods } from '@/typings/methods'
import Taro from '@tarojs/taro'
import toast from './toast'

const pageType: Record<Methods.ToPageType, Methods.ToPageFunc> = {
  to: 'navigateTo',
  back: 'navigateBack',
  redirect: 'redirectTo',
  reLaunch: 'reLaunch',
  switchTab: 'switchTab',
  preload: 'preloadPage',
}

export const toPage: Methods.ToPage = (path, type = 'to') => {
  return new Promise((resolve) => {
    let pagePathConfig: any

    if (typeof path === 'object') {
      //如果传入为object 则直接执行跳转方法
      pagePathConfig = path
    } else if (path === 'back') {
      //如果path为back
      type = 'back'
      pagePathConfig = {
        delta: -1,
      }
    } else if (type === 'back') {
      //如果type为back
      pagePathConfig = {
        delta: path,
      }
    } else {
      // 如果传递为string 跳转方式为配置
      //微信小程序有几率超出页面十级失败 所以失败使用不保留跳转
      pagePathConfig = {
        url: path,
        success: () => {
          resolve(true)
        },
        fail: () => {
          //二次跳转
          Taro[pageType['redirect']]({
            url: 'path',
          })
        },
      }
    }
    //跳转
    Taro[pageType[type]](pagePathConfig)
  })
}

export const requestResultToast = ({ msg, code }: any, tips = '操作成功') => {
  if (code === 200) {
    return toast.success(tips)
  } else {
    return toast(msg)
  }
}

export const showLoading = (tips = '加载中...'): (() => null) => {
  Taro.showLoading({
    title: tips,
    mask: true,
  })
  Taro.showNavigationBarLoading()
  return () => {
    Taro.hideLoading()
    Taro.hideNavigationBarLoading()
    return null
  }
}
const timespanType = [
  {
    txt: '天',
    diff: 86400000,
  },
  {
    txt: '时',
    diff: 3600000,
  },
  {
    txt: '分',
    diff: 60000,
  },
  {
    txt: '秒',
    diff: 1000,
  },
]

export const getCountDown = (timespan: number) => {
  const timeList: {}[] = []
  let value = ''
  let lastNumber = timespan
  for (const { txt, diff } of timespanType) {
    if (timespan >= diff) {
      const num = ~~(lastNumber / diff)
      const content = `${num}${txt}`
      value += `${content}`
      timeList.push({
        value: content,
        number: num,
      })
      lastNumber = timespan % diff
    }
  }
  return { timeList, value }
}

export const parseRichText = (nodes) => {
  return nodes.replace(/\<img/gi, '<img style="max-width:100%;height:auto;margin:10px 0" ')
}

export const returnDataTips = async ({ msg, code }: any, callBack?: string | (() => void), tips = '操作成功') => {
  if (code !== 200) {
    await toast(msg)
  } else if (typeof callBack === 'string') {
    await toast(callBack)
  } else if (typeof callBack === 'function') {
    await toast(tips)
    callBack()
  }
}

export const checkLogin = () => {
  const { isLogin } = useUserStore()
  if (!isLogin) {
    Taro.showModal({
      title: '提示',
      content: '您还未登录,请您先登录!',
      success: ({ confirm }) => {
        if (confirm) {
          toPage('/pages/login/index')
        }
      },
      cancelText: '稍后登录',
      confirmText: '立即登录',
    })
  } else {
    return true
  }
}
