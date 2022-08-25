import toast from '@/utils/toast'
import Config from '@/config'
import Taro from '@tarojs/taro'
import { useUserStore } from '@/store/user'
import { RequestFunc } from '@/typings/request'

import { showLoading } from '.'

type requestTask<T = any> = Taro.RequestTask<T>
/**
 * 根据访问路径和data生成key
 * @param path 路径
 * @param data 请求数据
 */
const createKey = (path: string, data: any) => `${JSON.stringify(data)}${path}`

//储存request请求map
const requestList: Map<string, requestTask> = new Map()

//是否正在加载中
let loadingBox: null | (() => null) = null

/**
 * request请求
 * @param param0 必要参数
 * @param param1 配置
 */
const RequestMethod: RequestFunc.request = (
  { methodType = 'GET', data = {}, url = '' },
  {
    baseUrl = Config.baseUrl,
    header = {
      'content-type': 'application/json',
    },
    loading = true,
    dataType = 'json',
    task = null,
    carryToken = true,
    carryUserId = true,
  } = {}
) => {
  const { userInfo, token, logout } = useUserStore()
  //加载动画
  if (loading && loadingBox === null) {
    //开启加载动画
    loadingBox = showLoading()
  }

  if (carryUserId) {
    const userId = userInfo?.userId
    if (typeof userId !== 'undefined' && typeof data === 'object') {
      data['userId'] = userId
    } else {
      if (userInfo?.token) {
        toast('用户失效,请重新登陆')
      }
    }
  }

  if (carryToken) {
    if (token !== '' && typeof token !== 'undefined') {
      header['AuthorizationApi'] = token
    }
  }

  //返回
  return new Promise((resolve, reject) => {
    //生成key
    const requestKey = createKey(url, data)
    // 加载动画
    const requestTask = Taro.request({
      /** 服务器接口地址 */
      url: `${baseUrl}${url}`,
      /** 请求的参数 */
      data: data,
      /** 请求头 */
      header: header,
      /** 请求类型 */
      method: methodType,
      /** 超时时间 */
      timeout: 100000,
      /** 返回数据类型 */
      dataType: dataType,
      // 成功
      success: async (res) => {
        //返回数据
        const code = res.data.code
        if (code === 401) {
          await toast('登陆已过期,请重新登陆!')
          logout()
          reject()
        }
        resolve(res.data as any)
      },
      // 失败
      fail: (err) => {
        reject(err)
      },
      // 最终执行
      complete: () => {
        // 移除request请求
        requestList.delete(requestKey)
        // 如果加载
        if (loadingBox !== null && requestList.size === 0) {
          // 关闭提示
          loadingBox = loadingBox()
        }
      },
    })
    task && task(requestTask)
    //先关闭上一个同路径同参数请求
    requestList.get(requestKey)?.abort()
    //存储请求
    requestList.set(requestKey, requestTask)
  })
}

//get请求
export const get = <R = any, T = any>(url: string, data?: T, config?: RequestFunc.RequestConfig) =>
  RequestMethod<R, T>(
    {
      methodType: 'GET',
      url: url,
      data,
    },
    config
  )

//post请求
export const post = <R = any, T = any>(url: string, data?: T, config?: RequestFunc.RequestConfig) =>
  RequestMethod<R, T>(
    {
      methodType: 'POST',
      url: url,
      data,
    },
    config
  )

//put请求
export const put = <R = any, T = any>(url: string, data?: T, config?: RequestFunc.RequestConfig) =>
  RequestMethod<R, T>(
    {
      methodType: 'PUT',
      url: url,
      data,
    },
    config
  )

//detele请求
export const detele = <R = any, T = any>(url: string, data?: T, config?: RequestFunc.RequestConfig) =>
  RequestMethod<R, T>(
    {
      methodType: 'DELETE',
      url: url,
      data,
    },
    config
  )

export const uploadImage = (url) => {
  const { token } = useUserStore()
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: Config.uplodaImageUrl, //仅为示例，非真实的接口地址
      filePath: url,
      header: {
        AuthorizationApi: token,
      },
      name: 'file',
      success(res) {
        try {
          const data: any = JSON.parse(res.data)
          console.log(data)
          const urls = data?.url
          if (typeof urls === 'undefined') {
            reject(false)
          } else {
            resolve(urls)
          }
        } catch (error) {
          reject(false)
        }
      },
    })
  })
}
