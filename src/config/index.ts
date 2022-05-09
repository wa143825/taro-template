/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-04-25 16:35:19
 * @Description: 头部注释配置模板
 */
//

const isPro: boolean = process.env.NODE_ENV === 'production'

// const BaseUrl = "http://192.168.0.109:9091/api/";
const BaseUrl = "https://api.yuexinche.com/api/";

const Config = {
  baseUrl: isPro ? "https://api.yuexinche.com/api/" : BaseUrl,
  uplodaImageUrl: `${BaseUrl}upload`
};

export default Config;
