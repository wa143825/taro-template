/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-08-25 17:29:54
 * @Description: 头部注释配置模板
 */
import { Image, View } from '@tarojs/components'
import { CSSProperties, FC } from 'react'

import collection from '@/assets/no/collection.svg'
import content from '@/assets/no/content.svg'
import data from '@/assets/no/data.svg'
import eva from '@/assets/no/eva.svg'
import img from '@/assets/no/img.svg'
import msg from '@/assets/no/msg.svg'
import order from '@/assets/no/order.svg'
import search from '@/assets/no/search.svg'
import bill from '@/assets/no/bill.svg'
import permission from '@/assets/no/permission.svg'
import pay from '@/assets/no/pay.svg'

import Style from './index.module.scss'

const SVG_TYPE = {
  collection,
  content,
  data,
  eva,
  img,
  msg,
  order,
  bill,
  permission,
  pay,
  search,
}

type SVG_KEY = keyof typeof SVG_TYPE

export interface EmptyProps {
  type?: SVG_KEY
  size?: 'mini' | 'default' | 'big'
  tips?: any
  tipsStyle?: CSSProperties
  style?: CSSProperties
}

const Empty: FC<EmptyProps> = ({ type, size, tips, children, tipsStyle, style }) => {
  return (
    <View className={`${Style.box} col-center ${Style[size || '']}`} style={style}>
      <Image src={SVG_TYPE[type || 'content']} className={Style.image}></Image>
      <View className={Style.tips} style={tipsStyle}>
        {tips}
      </View>
      {children}
    </View>
  )
}

Empty.defaultProps = {
  size: 'default',
  tips: '暂无数据',
}

export default Empty
