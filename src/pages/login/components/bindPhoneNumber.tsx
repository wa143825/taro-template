/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-08-25 17:40:30
 * @Description: 头部注释配置模板
 */
import { FC } from 'react'
import { OpenData, View } from '@tarojs/components'

import Btn from '@/components/btn'

import { useSysStore } from '@/store/system'

interface BindPhoneNumberProps {
  bindPhoneNumber: (info: any) => void
}

const BindUserInfo: FC<BindPhoneNumberProps> = ({ bindPhoneNumber }) => {
  const { isPhoneX } = useSysStore()

  return (
    <View className="z-5 absolute h-full w-full" style={{ background: 'rgba(0,0,0,.5)' }}>
      <View className="absolute bottom-0 bg-white col-c w-full pt-50rpx" style={{ borderTopLeftRadius: '15rpx', borderTopRightRadius: '15rpx' }}>
        <View className="w-150rpx h-150rpx rounded-circle overflow-hidden mb-30rpx">
          <OpenData type="userAvatarUrl"></OpenData>
        </View>

        <Btn
          radius
          theme="primary"
          size={[700, 84]}
          style={{ marginBottom: `${isPhoneX ? 40 : 0}px` }}
          fontSize={36}
          onClick={bindPhoneNumber}
          other={{
            openType: 'getPhoneNumber',
            onGetPhoneNumber: bindPhoneNumber,
          }}
        >
          同意获取手机号
        </Btn>
      </View>
    </View>
  )
}

export default BindUserInfo
