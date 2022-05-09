/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-04-29 17:13:35
 * @Description: 头部注释配置模板
 */
import { get, post, put, detele } from "@/utils/request"

export const GoodsRecommend = () => {
  return get(`noAuth/goods/getRecommendGoods`, {} , {carryToken: false, carryUserId: false})
}

export const VipServiceList = () => {
  return get(`noAuth/vip/getVipServiceList`, {} , {carryToken: false, carryUserId: false})
}

export const GoodsCate = () => {
  return get(`noAuth/goods/getCategory`, {}, {carryToken: false, carryUserId: false})
}

export const GoodsList =  (d) =>  {
  return get(`noAuth/goods/getGoodsList`, d, {carryToken: false, carryUserId: false})
}

export const GoodsDetail = (d) =>  {
  return get(`noAuth/goods/getGoodsDetail/${d}`, {}, {carryToken: false, carryUserId: false})
}

export const AddAddress = (d) =>  {
  return post(`address/addAddress`, d)
}

export const AddrList =  () =>  {
  return get(`address/getReceiveAddrList` )
}

export const DefaultAddr =  (d) =>  {
  return put(`address/setDefaultAddr/${d}`,)
}

export const updateAddr =  d =>  {
  return put(`address/updateAddr`, d)
}

export const deleteAddr =  d =>  {
  return detele(`address/deleteAddr/${d}`)
}

export const Purchacse =  (d) =>  {
  return post(`order/purchacseIntegral`, d)
}

export const OrderList =  (d) =>  {
  return get(`order/getScoreOrderList`, d)
}

export const OrderDetail =  (d) =>  {
  return get(`order/getScoreOrderDetail`, d)
}

// 服务列表
export const ProductList =  () =>  {
  return get(`noAuth/product/getProductList`)
}

export const ProductDetail =  (id) =>  {
  return get(`noAuth/product/getProductDetail/${id}`)
}

export const InsuranceProjectList =  () =>  {
  return get(`noAuth/product/getInsuranceProjectList`)
}

export const CarProductList =  (d) =>  {
  return get(`noAuth/car/getProductList`, d)
}

export const PriceCompute = (d) =>  {
  return get(`noAuth/car/getPriceCompute`, d)
}

export const CreateOrder = (d) =>  {
  return post(`order/createOrder`, d)
}

export const InsuranceOrderList = (d) =>  {
  return get(`order/getList`, d)
}

export const WxPay = (orderNumber) =>  {
  return get(`wxPay/${orderNumber}`)
}

export const WxPayTradeQuery = (orderNumber) =>  {
  return get(`wxPay/tradeQuery`, {
		orderNumber
	})
}

export const Contract = (orderNumber) =>  {
  return get(`contract/getElectronicContract`, {
		orderNumber
	})
}

export const ElectronicInvoice = (orderNumber) =>  {
  return get(`invoice/getElectronicInvoicing`, {
		orderNumber
	})
}

export const Invoice = (d) =>  {
  return post(`invoice/getPaperInvoice`, d)
}

export const InvoiceList = () =>  {
  return get(`invoice/getList`)
}

export const InvoiceListDetail = (id) =>  {
  return get(`invoice/getInfo/${id}`)
}

export const confirmReceipt = (id) =>  {
  return get(`invoice/confirmReceipt/${id}`)
}

export const Attorney = () =>  {
  return get(`invoice/getInvoicePowerAttorney`)
}


export const Supplement = (d) =>  {
  return post(`car/supplement/add`, d)
}
