/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-04-25 18:08:08
 * @Description: 头部注释配置模板
 */
import { get, uploadImage } from "@/utils/request"

export const BannerList = (d) => {
  return get(`noAuth/bannerList`, d, {carryToken:false, carryUserId: false})
}

export const uploadApi = (url) => {
	return uploadImage(url)
}

export const ScoreRules = () => {
  return get(`noAuth/scoreRules/getList`, {}, {carryToken:false, carryUserId: false})
}

export const ServicePhone = () => {
  return get(`noAuth/getServicePhone`, {}, {carryToken:false, carryUserId: false})
}

export const Rescuephone = () => {
  return get(`noAuth/getRescuephone`, {}, {carryToken:false, carryUserId: false})
}

export const Agreement = () => {
  return get(`noAuth/getRegAgreement`, {}, {carryToken:false, carryUserId: false})
}
