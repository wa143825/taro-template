import { RequestFunc } from "@/typings/request";
import { useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";

type statusTypeInter = "end" | "noData" | "loading" | "none";
export type PagingStaus = {
  pageSize: number;
  total: number;
  type: statusTypeInter;
};

interface ReturunDataInterface {
  /** 当前页面数量 */
  pageNum: number;
  /** 列表数据 */
  listData: any[];
  /** 加载状态 */
  loading: boolean;
  /** 更改page */
  nextPage: () => void;
  /** 页面参数 */
  staus: PagingStaus;
  /** 重新加载 */
  reload: () => void;
  /** 是否加载完毕 */
  loadOver: boolean;
}

interface usePagingInter {
  pageSize?: number;
  initData?: boolean;
  getList: (screen: any) => Promise<RequestFunc.ReponseData<any>>;
  hasCloseRefresh?: boolean;
}

type stausType = {
  total: number;
  type: statusTypeInter;
};

export const usePaging = <T = any>({
  pageSize = 10,
  getList,
  initData = true,
  hasCloseRefresh = false
}: usePagingInter): ReturunDataInterface => {
  const initRef = useRef(false);
  const [pageNum, setPageNum] = useState(1);
  const [listData, setListData] = useState<T[]>([]);
  const [staus, setStaus] = useState<stausType>({
    total: 0,
    type: "none"
  });

  const getListFunc = async () => {
    setStaus(d => ({ ...d, type: "loading" }));
    const { rows, total, code } = await getList({
      pageSize,
      pageNum,
    });

    if (hasCloseRefresh) {
      Taro.stopPullDownRefresh();
    }
    console.log(code)

    if(code === 200) {
      const countFloat = total / pageSize;
      const countNum = total % pageSize === 0 ? countFloat : ~~countFloat + 1;

      if (pageNum === 1 && total === 0) {
        //如果没有数据  数据列表存在数据 则清空数据
        setStaus({
          total: 0,
          type: "noData"
        });

        if (listData.length !== 0) {
          setListData([]);
        }
        return;
      }

      //分页内
      if (pageNum <= countNum) {
        setStaus({
          total,
          type: pageNum >= countNum ? "end" : "none"
        });
        setListData(d => {
          if(rows != undefined) {
            if (pageNum === 1) {
              return [...rows];
            } else {
              return [...d, ...rows];
            }
          } else {
            return []
          }
        });
      }
    } else {
      setStaus({total: 0, type: 'noData'})
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!initData && !initRef.current) {
        initRef.current = true;
        return;
      }
      await getListFunc();
      if (!initRef.current) {
        initRef.current = true;
        console.log(initRef.current);
      }
    };
    init();
  }, [pageNum]);

  //下一页
  const nextPage = () => {
    switch (staus.type) {
      case "none":
        setPageNum(n => n + 1);
        break;
      default:
        break;
    }
  };

  const reload = () => {
    if (pageNum === 1) {
      return getListFunc();
    } else {
      setPageNum(() => 1);
    }
  };

  return {
    loading: staus.type === "loading",
    listData,
    staus: {
      pageSize,
      ...staus
    },
    loadOver: initRef.current,
    pageNum,
    nextPage,
    reload
  };
};
