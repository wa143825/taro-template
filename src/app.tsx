/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-04-18 16:55:50
 * @Description: 头部注释配置模板
 */
import Taro, { FC } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss' //taro-ui
import '@/assets/iconfont/iconfont.css' // iconfont
import 'windi.css' // 使用windi必须导入

const App: FC = ({ children }) => {
	Taro.showShareMenu({
		withShareTicket: true,
		showShareItems: ['shareAppMessage', 'shareTimeline'],
	})

	return <>{children}</>
}

export default App
