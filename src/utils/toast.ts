import Taro from "@tarojs/taro";
//返回值
type ToastReturnData = Promise<null>;
type ShowToastOptions = Taro.showToast.Option;
const defaultConfig: any = {};
/** 弹框 */
export type Toast = {
  /** 默认方法 */
  (
    param: ShowToastOptions | string,
    config?: ShowToastOptions
  ): ToastReturnData;
  /** 成功方法 */
  success: (tips: string, config?: ShowToastOptions) => ToastReturnData;
  /** 加载方法 */
  loading: (tips: string, config?: ShowToastOptions) => ToastReturnData;
  /** 带层 */
  mask: (tips: string, config?: ShowToastOptions) => ToastReturnData;
};

//提示
const toast: Toast = function(param, config = defaultConfig) {
  const toastOptions: ShowToastOptions = {
    title: "",
    duration: 1500,
    icon: "none",
    mask: false
  };
  if (typeof param === "string") {
    Object.assign(toastOptions, config, { title: param });
  } else {
    Object.assign(toastOptions, param);
  }

  return new Promise((resolve, reject) => {
    Taro.showToast({
      ...toastOptions,
      success() {
        setTimeout(() => {
          resolve(null);
        }, toastOptions.duration);
      },
      fail() {
        reject(null);
      }
    });
  });
};

//成功框
toast.success = (tips, config = defaultConfig) => {
  return toast({
    icon: "success",
    ...config,
    title: tips
  });
};

//加载框
toast.loading = (tips, config = defaultConfig) => {
  return toast({
    icon: "loading",
    ...config,
    title: tips
  });
};

//触摸层 存在
toast.mask = (tips, config = defaultConfig) => {
  return toast({
    ...config,
    title: tips,
    mask: true
  });
};

export default toast;
