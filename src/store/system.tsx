import Taro from "@tarojs/taro";
import { useMemo } from "react";
import { createModel } from "hox";

const data = Taro.getMenuButtonBoundingClientRect();
const systemInfo = Taro.getSystemInfoSync();
const actualRatio = systemInfo.screenWidth / 750
const isIPhoneX = systemInfo.screenHeight !== systemInfo.safeArea.bottom;
const iv = 15;



type UseSystemType = {
  tabbarH: number;
  iv: number;
  isPhoneX: boolean;
  actualRatio: number
} & Taro.getMenuButtonBoundingClientRect.Rect &
  Taro.getSystemInfoSync.Result;

const useSystemModel = (): UseSystemType => {

  return useMemo(() => {
    return {
      ...data,
      tabbarH: data.top + data.height + iv,
      iv: iv,
      isPhoneX: isIPhoneX,
      actualRatio,
      ...systemInfo
    }
  }, [])
}

const useSystem = createModel(useSystemModel)

export default useSystem
