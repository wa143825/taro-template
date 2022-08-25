/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-08-25 17:28:50
 * @Description: 用户信息
 */
import { useState } from 'react'
import { createStore } from 'hox'
import { setToken, rmToken, getToken, getUserInfo, setUserInfo } from '@/utils/local'
import { UserInfoApi } from '@/api/user'

const localToken = getToken()
const localUserInfo = getUserInfo()

export const [useUserStore, userStoreProvider] = createStore(() => {
  const [userInfo, sUserInfo] = useState<null | any>(localUserInfo)
  const [token, sToken] = useState<string>(localToken)

  const isLogin = token !== '' && token !== null

  const login = (info: {}, t: string) => {
    sUserInfo(info)
    setUserInfo(info)
    sToken(t)
    setToken(t)
  }

  const logout = () => {
    sUserInfo(null)
    rmToken()
  }

  const refreshUserInfo = () => {
    UserInfoApi().then((res) => {
      if (res.code == 200) {
        sUserInfo(res.data)
        setUserInfo(res.data)
      }
    })
  }

  return {
    //用户信息
    userInfo,
    sUserInfo,
    refreshUserInfo,
    token,
    isLogin,
    //登陆退出
    login,
    logout,
  }
})
