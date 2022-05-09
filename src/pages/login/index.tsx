/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-05-05 16:24:02
 * @Description: 头部注释配置模板
 */
import Taro, { FC } from '@tarojs/taro'
import { BaseEventOrig, ButtonProps, OpenData, View, Text, Checkbox, CheckboxGroup } from '@tarojs/components'
import { useState } from 'react'

import { LoginApi, WxPhoneNumber } from '@/api/user'
import Btn from '@/components/btn'
import NavBar from '@/components/navbar'

import useSystem from '@/store/system'
import useUserInfo from '@/store/user'
import { toPage } from '@/utils'
import toast from '@/utils/toast'

import BindPhoneNumber from './components/bindPhoneNumber'

const Index: FC = () => {
	const { isPhoneX } = useSystem()
	const { login, refreshCars, refreshAddrs } = useUserInfo()
	const [show, sShow] = useState(false)
	const [ck, setCk] = useState<boolean>(false)

	//获取手机号信息
	const bindPhoneNumber = async ({ detail }: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>) => {
		const { encryptedData, iv, errMsg } = detail
		const { code } = await Taro.login()

		if (errMsg == 'getPhoneNumber:ok') {
			const requestJson = {
				encryptedData,
				iv,
				code,
			}
			const loginInfo = await WxPhoneNumber(requestJson)
			if (loginInfo.code === 200) {
				await toast.mask('登录成功')
				toPage('back')
			}
		} else {
			toast('请您先同意获取您的手机号')
		}
	}

	const bindUserInfo = async () => {
		if (!ck) {
			toast('请先同意用户服务协议')
			return
		}
		const userProfile = await Taro.getUserProfile({
			desc: '申请获取您的个人信息',
		})
		if (typeof userProfile.errMsg === 'undefined') return toast('您已取消登录')
		if (userProfile.errMsg === 'getUserProfile:ok') {
			const { code } = await Taro.login()
			const { gender, nickName, language, avatarUrl } = userProfile.userInfo
			const label = Taro.getStorageSync('label')
			const loginInfo = await LoginApi({
				code,
				gender,
				nickName,
				language,
				avatarUrl,
				label,
			})
			if (loginInfo.code === 200) {
				login(loginInfo.data.userInfo, loginInfo.data.token)
				if (loginInfo.data.userInfo.phonenumber) {
					await toast.mask('登录成功')
					await refreshCars()
					await refreshAddrs()
					toPage('back')
				} else {
					sShow(true)
				}
			}
		}
	}

	return (
		<View className="box flex flex-col items-center justify-center h-100vh">
			<View className="absolute top-0 left-0">
				<NavBar hasBack></NavBar>
			</View>

			<View className="rounded-circle overflow-hidden w-240rpx h-240rpx">
				<OpenData type="userAvatarUrl" />
			</View>
			<View className="text-2xl font-semibold">登陆 / 注册</View>
			<View className="text-gary my-30rpx">
				<View>获取您的公开信息（昵称、头像、地区及性别）</View>
				<View>未注册的用户，授权后将注册成为新用户</View>
			</View>
			<Btn radius theme="primary" size={[650, 98]} fontSize={36} onClick={bindUserInfo}>
				授权登陆
			</Btn>
			{show && <BindPhoneNumber bindPhoneNumber={bindPhoneNumber} />}

			<View className="absolute bottom-40rpx flex" style={{ bottom: isPhoneX ? '80rpx' : '40rpx' }}>
				<CheckboxGroup onChange={(e) => setCk(e.detail.value.length > 0)}>
					<Checkbox value="用户协议" checked={ck}></Checkbox>
				</CheckboxGroup>
				我已阅读并同意{' '}
				<Text onClick={() => toPage('/pages/other/richtext?from=yhxx')} style={{ color: 'red' }}>
					《用户服务协议》
				</Text>
			</View>
		</View>
	)
}

definePageConfig({
	navigationBarTitleText: '用户登录',
})

export default Index
