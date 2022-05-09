import { CSSProperties, useMemo } from "react";
import { FC } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { PagingStaus } from "@/hooks/paging";
import { AtActivityIndicator } from "taro-ui";
import toast from "@/utils/toast";

import Style from "./index.module.scss";
import Empty, { EmptyProps } from "../empty";

interface NextPageProps {
  staus: PagingStaus;
  next?: () => void;
  style?: CSSProperties;
  color?: string;
  padding?: number | number[];
  empty?: EmptyProps;
  hasNo?: boolean;
}

const NextPage: FC<NextPageProps> = ({
  staus,
  next,
  style,
  color,
  hasNo,
  padding,
  empty
}) => {
  return useMemo(() => {
    let dom;
    const styleJson: CSSProperties = {};
    if (typeof color !== "undefined") {
      styleJson["color"] = color;
    }
    switch (staus.type) {
      case "noData":
        dom = (
          <View
            style={styleJson}
            className={`${Style.ani} ${Style.noData}`}
            onClick={() => toast("暂无数据~~")}
          >
            {hasNo ? <Empty {...empty}></Empty> : " 暂无数据"}
          </View>
        );
        break;

      case "loading":
        dom = (
          <AtActivityIndicator
            color={color}
            className={`${Style.ani} ${
              Style[`loading${color === "#fff" ? "-white" : ""}`]
            }`}
            content='正在加载中...'
          />
        );
        break;

      case "none":
        dom = (
          <View
            style={styleJson}
            className={`${Style.ani} ${Style.nextPage}`}
            hoverClass={Style.nexPageHover}
            onClick={next}
          >
            加载更多
          </View>
        );
        break;

      case "end":
        dom = (
          <View
            style={styleJson}
            className={`${Style.ani} ${Style.end}`}
            onClick={() => toast("已经到底啦~~")}
          >
            到底啦~~
          </View>
        );
        break;
    }
    let padingSize;
    if (Array.isArray(padding)) {
      padingSize = `${padding[0]}rpx 0 ${padding[1] || padding[0]}rpx`;
    } else {
      padingSize = `${padding}rpx 0`;
    }

    return (
      <View
        className={`${Style.next} row-center`}
        style={{
          height: staus.type === "noData" ? "auto" : "60rpx",
          padding: padingSize,
          ...style
        }}
      >
        {dom}
      </View>
    );
  }, [staus]);
};

NextPage.defaultProps = {
  style: {},
  empty: {}
};
export default NextPage;
