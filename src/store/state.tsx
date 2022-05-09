import { useState, Dispatch, SetStateAction } from "react";
import { createModel } from "hox";

export interface IPageState {
  tabIdx: number,
  sTabIdx: Dispatch<SetStateAction<number>>
}

const usePageStateModel = (): IPageState => {
  const [tabIdx, sTabIdx] = useState(0)

  return {
    tabIdx,

    sTabIdx
  }
}

const usePageState = createModel(usePageStateModel)

export default usePageState
