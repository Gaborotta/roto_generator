// Import
import { useState, useEffect } from "react";
import { sample } from "underscore";

import {
  GenerateType,
  LotoType,
  Numbers,
  LotoGenerateDict,
  SummaryType,
  PeriodType,
  GraphData,
} from "./types";

import Title from "./components/Title";
import GenerateButton from "./components/GenerateButton";
import NumbersView from "./components/NumbersView";
import SelectLotoRadio from "./components/SelectLotoRadio";
import SummaryGraph from "./components/SummaryGraph";
import SelectGraphSetting from "./components/SelectGraphSetting";
import GraphTitle from "./components/GraphTitle";

import db from "./config/firebase-config";

import "./App.css";

////////////////////////////////////
// 定数設定
///////////////////////////////////

const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v, k) => k + start);
const loto_values: LotoGenerateDict = {
  LOTO6: { nums: range(1, 44), main_n: 6, bonus_n: 1 },
  LOTO7: { nums: range(1, 38), main_n: 7, bonus_n: 2 },
  MINI_LOTO: { nums: range(1, 32), main_n: 5, bonus_n: 1 },
};

////////////////////////////////////
// 本体
///////////////////////////////////

function App() {
  ////////////////////////////////////////////////////
  // 共通
  ////////////////////////////////////////////////////
  const [lotoType, setLotoType] = useState<LotoType>("LOTO6");

  ////////////////////////////////////////////////////
  // 生成ボタン
  ////////////////////////////////////////////////////
  const sort_asc = (a: number, b: number) => (a > b ? 1 : -1);
  const generateNumbers = (lotoType: LotoType): Numbers => {
    let loto_set = loto_values[lotoType];
    let main: number[] = sample(loto_set.nums, loto_set.main_n);
    let bonus: number[] = sample(
      loto_set.nums.filter((v) => !main.includes(v)),
      loto_set.bonus_n
    );
    return {
      type: lotoType,
      main: main.sort(sort_asc),
      bonus: bonus.sort(sort_asc),
    };
  };
  const [numbers, setNumbers] = useState<Numbers>(generateNumbers(lotoType));
  const generate: GenerateType = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNumbers(generateNumbers(lotoType));
  };

  ////////////////////////////////////////////////////
  // firestore 読み込み 集計グラフ表示用
  ////////////////////////////////////////////////////
  const [graphSummaryType, setGraphSummaryType] =
    useState<SummaryType>("triple_num_sum");
  const [graphPeriod, setGraphPeriod] = useState<PeriodType>("過去 100 回");
  const [isGraphOK, setGraphOK] = useState<boolean>(true);
  const [graphTopN] = useState<number>(50);
  const [graphData, setGraphData] = useState<GraphData>({
    x_axis: [""],
    y_axis: [0],
  });

  // ここでuseEffectを使うとローディング中が実装できそう？
  const getFire = async (
    lType: LotoType,
    sType: SummaryType,
    pType: PeriodType
  ) => {
    const snapshot = await db
      .collection("loto_count_summary")
      .doc(lType)
      .collection(sType)
      .doc(pType)
      .get();
    const data = snapshot.data();
    if (data?.x_axis === undefined) {
      throw new Error(`Fire Error ${lType}, ${pType}, ${sType}`);
    }
    const graphData: GraphData = {
      x_axis: data?.x_axis,
      y_axis: data?.y_axis,
    };
    return graphData;
  };

  const setFireData = (
    lType: LotoType,
    sType: SummaryType,
    pType: PeriodType
  ) => {
    setGraphOK(false);
    console.log("getFire", isGraphOK);
    getFire(lType, sType, pType)
      .then((x) => {
        setGraphData(x);
        setGraphOK(true);
        console.log("getFire Done", isGraphOK);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setFireData(lotoType, graphSummaryType, graphPeriod);
  }, []);

  ////////////////////////////////////////////////////
  // 本体
  ////////////////////////////////////////////////////
  return (
    <div className="wrapper">
      <div className="container">
        <Title />

        {/* 生成 */}
        <SelectLotoRadio
          lotoType={lotoType}
          summaryType={graphSummaryType}
          periodType={graphPeriod}
          setLotoType={setLotoType}
          setFireData={setFireData}
        />
        <GenerateButton generate={generate} />
        <NumbersView numbers={numbers} />

        {/* グラフ表示 */}
        <br />
        <GraphTitle />
        <SelectGraphSetting
          lotoType={lotoType}
          summaryType={graphSummaryType}
          periodType={graphPeriod}
          setFireData={setFireData}
          setGraphSummaryType={setGraphSummaryType}
          setGraphPeriod={setGraphPeriod}
        />
        <SummaryGraph
          graphData={graphData}
          graphTopN={graphTopN}
          isGraphOK={isGraphOK}
        />
      </div>
    </div>
  );
}

export default App;
