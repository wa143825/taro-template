/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-04-25 14:12:22
 * @Description: 头部注释配置模板
 */
import { get, post } from "@/utils/request"


/** 用户登陆 */
export const LoginApi = (d) => {
  return post("login", d, {carryUserId: false, carryToken: false})
}

/** 获取用户openid */
export const UserOpenId = (d) => {
  return get(`noAuth/getUserOpenid`, d)
}

/** 获取用户手机号 */
export const WxPhoneNumber = (d) => {
  return post(`noAuth/getWxPhoneNumber`, d)
}

/** 获取用户信息 */
export const UserInfoApi = () => {
  return get(`user/getUserInfo`, {}, {carryUserId: false})
}

/** 修改用户信息 */
export const MotifyUserInfo = (d) => {
  return post(`user/motifyUserInfo`, d)
}

/** 用户签到 */
export const AddSign = () => {
  return post(`sign/addSign`)
}

/** 获取签到记录 */
export const SignList = () => {
  return get(`sign/signList`)
}

/** 积分几率 */
export const ScoreList = (d) => {
  return get(`score/scoreList`, d)
}


// 车辆列表
export const CarList = () => {
  return get('car/getCarList')
}

// 添加车辆
export const AddCar = (d) => {
  return post('car/addCar', d)
}

// 解绑车辆
export const unBindCar = (id) => {
  return get(`car/unbindCar/${id}`)
}

// 获取车辆详情
export const Ocr = (d) => {
  return post(`ocrVehicleLicense`, d, {
		header: {
			"content-type": "multipart/form-data"
		}
	})
}

// 获取车辆详情
export const CarDetail = (id) => {
  return get(`car/getCarDetail/${id}`)
}

// 获取保养记录
export const MaintenanceList = (d) => {
  return get(`maintenance/getList`, d)
}

// 获取保养记录
export const MaintenanceAdd = (d) => {
  return post(`maintenance/addInfo`, d)
}

// 获取保养记录
export const RepaireList = (d) => {
  return get(`repaire/getList`, d)
}


// 获取车辆审核
export const CarApprove = () => {
  return post('car/approveCar')
}

// 切换主体车辆
export const ToggleMainCar = (vin) => {
  return post(`car/toggleMainCar/${vin}`)
}
