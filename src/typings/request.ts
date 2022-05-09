/*
 * @Author: Re_Vive
 * @LastEditTime: 2022-04-22 17:51:19
 * @Description: 头部注释配置模板
 */
/**
 * @Author: revive
 * @Date: 2022-03-21 15:15:23
 */
export namespace RequestFunc {
  //request请求

  /**
   * @description 请求方法
   */
  type RequestData<T = any> = {
    /** 请求方式 */
    methodType?: "GET" | "POST" | "PUT" | "DELETE";
    /** 传递的数据 */
    data?: T;
    /** 路径 */
    url: string;
  };
  //请求设置
  export type RequestConfig = {
    /** 父路径 */
    baseUrl?: string;
    /** 请求头 */
    header?: any;
    /** 是否加载 */
    loading?: boolean;
    /** 传递的data数据类型 */
    dataType?: string;
    /** 获取task,用于取消请求 */
    task?: (task: Taro.RequestTask<any>) => void | null;
    /** 是否携带token */
    carryToken?: boolean;
    carryUserId?: boolean;
  };

  //返回数据类型
  export type ReponseData<T> = {
    code: 200 | 500 | number;
    data: T;
    rows: any[];
    total: number;
    msg: string;
  };
  /**
   * request请求
   */
  export type request = <R = any, T = any>(
    data: RequestData<T>,
    config?: RequestConfig
  ) => Promise<ReponseData<R>>;
}
