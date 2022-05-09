import Taro from "@tarojs/taro";

enum ELocal {
  userInfo = 'USER_INFO',
  token = 'TOKEN',
  order = 'ORDER'
}

const storage = {
  get: Taro.getStorageSync,
  set: Taro.setStorageSync,
  rm: Taro.removeStorageSync
}


/**
 * @description 获取用户信息
 * @return {*}
 */
const getUserInfo = () => {
  const data = storage.get(ELocal.userInfo)
  return data || null
}

const setUserInfo = (info) => {
  return storage.set(ELocal.userInfo, info)
}

const  rmUserInfo = () => {
  return storage.rm(ELocal.userInfo)
}

const  getToken = () => {
  const data = storage.get(ELocal.token)
  return data || null
}

const  setToken = (token) => {
  return storage.set(ELocal.token, token)
}

const  rmToken = () => {
  return storage.rm(ELocal.token)
}

export {
  getUserInfo,
  setUserInfo,
  rmUserInfo,

  getToken,
  setToken,
  rmToken,

}
