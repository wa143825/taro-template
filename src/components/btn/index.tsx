import { CSSProperties, useMemo, FC } from 'react'
import Taro from '@tarojs/taro'
import { Button, ButtonProps, ITouchEvent, View } from '@tarojs/components'

interface DefaultButtonProps {
  /** 宽度 高度 圆角 */
  size?: [number | string | undefined, number] | [number | string]
  /** 是否圆角 */
  radius?: boolean
  /** 是否投影 */
  shadow?: boolean
  /** 主题 */
  theme: 'primary' | 'transB' | 'transW'
  /** 加载 */
  loading?: boolean
  /** 按钮失效状态 */
  disabled?: boolean
  /** 图标 */
  icon?: string
  /** 点击事件 */
  onClick?: (e: ITouchEvent) => void
  /** 样式 */
  style?: CSSProperties
  //
  fontSize?: number
  //按钮属性
  other?: ButtonProps
}

const getSize = (number: any) => {
  if (typeof number === 'number') {
    return Taro.pxTransform(number)
  }
  return number
}

/** 默认按钮 */
const DefaultButton: FC<DefaultButtonProps> = ({ children, loading, size, theme, disabled, radius, shadow, style, onClick, fontSize, other }) => {
  const styleMsg = useMemo(() => {
    const btnColors = {
      primary: {
        border: '1rpx solid white',
        color: 'white',
        background: '#920926',
      },
      transB: {
        border: '1rpx solid black',
        color: 'black',
      },
      transW: {
        border: '1rpx solid white',
        color: 'white',
      },
    }

    const styleInfo: CSSProperties = {
      borderRadius: radius ? 30 : 0,
      boxShadow: shadow ? '0 4rpx 5rpx rgba(8,8,8,.5)' : 'none',
      fontSize: `${fontSize}rpx`,
      display: 'flex',
      margin: 0,
      background: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      ...btnColors[theme],
    }

    if (Array.isArray(size)) {
      const [width, height] = size
      //宽度
      if (width) {
        styleInfo.width = getSize(width)
      }
      //高度
      if (height) {
        styleInfo.padding = 0
        styleInfo.height = getSize(height)
        try {
          if (radius) styleInfo.borderRadius = getSize(height / 2)
        } catch (error) {
          //
        }
      }
      //padding
      // 有高度宽度的圆角
    }
    return styleInfo
  }, [])

  return useMemo(() => {
    let DOM: any = View

    if (typeof other !== 'undefined') {
      DOM = Button
    }
    //计算style
    return (
      <DOM
        {...other}
        style={{
          ...styleMsg,
          ...style,
        }}
        disabled={disabled}
        loading={loading}
        onClick={
          onClick
            ? (e) => {
                onClick(e)
                return e.stopPropagation()
              }
            : onClick
        }
      >
        {children}
      </DOM>
    )
  }, [loading, children, disabled, onClick, other])
}

DefaultButton.defaultProps = {
  theme: 'primary',
  style: {},
  fontSize: 30,
}

export default DefaultButton
