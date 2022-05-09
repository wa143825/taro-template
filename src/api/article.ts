/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-04-06 11:18:02
 * @Description: 头部注释配置模板
 */
import { get } from "@/utils/request"

/** @description 获取文章分类*/
export const ArticleCate = (d) => {
  return get(`noAuth/article/getArticleCate`, d, {carryUserId: false, carryToken: false})
}

export const ArticleList =  (d) =>  {
  return get(`noAuth/article/getArticleList`, d, {carryUserId: false, carryToken: false})
}

export const ArticleDetail = (id) =>  {
  return get(`noAuth/article/getArticleDetail/${id}`, {},  {carryUserId: false, carryToken: false})
}
