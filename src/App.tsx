// Import
import { useState } from "react";
import { sample } from "underscore";

import Title from "./components/Title";
import GenerateButton from "./components/GenerateButton";
import NumbersView from "./components/NumbersView";
import SelectLotoRadio from "./components/SelectLotoRadio";
import PlotlyTest from "./components/PlotlyTest";

import db from "./config/firebase-config";

import "./App.css";

// 型宣言
export type GenerateType = (e: React.FormEvent<HTMLFormElement>) => void;
export type LotoType = "LOTO6" | "LOTO7" | "MiniLOTO";
export type Numbers = {
  type: LotoType;
  main: number[];
  bonus: number[];
};
export type LotoGenerateDict = {
  [attr: string]: {
    nums: number[];
    main_n: number;
    bonus_n: number;
  };
};

// ロト値設定
const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v, k) => k + start);
const loto_values: LotoGenerateDict = {
  LOTO6: { nums: range(1, 44), main_n: 6, bonus_n: 1 },
  LOTO7: { nums: range(1, 38), main_n: 7, bonus_n: 2 },
  MiniLOTO: { nums: range(1, 32), main_n: 5, bonus_n: 1 },
};

// 本体
function App() {
  const [lotoType, setLotoType] = useState<LotoType>("LOTO6");

  // 関数定義
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

  // イベント動作定義
  const [numbers, setNumbers] = useState<Numbers>(generateNumbers(lotoType));
  const generate: GenerateType = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNumbers(generateNumbers(lotoType));
  };

  // firestore 読み込み
  const getFire = async (): Promise<number> => {
    const snapshot = await db
      .collection("loto_results")
      .doc("LOTO6")
      .collection("results")
      .doc("第1094回")
      .get();
    console.log(snapshot.data());

    return 10;
  };
  getFire();

  // 本体
  return (
    <div className="wrapper">
      <div className="container">
        <Title />
        <GenerateButton generate={generate} />
        <NumbersView numbers={numbers} />
        <SelectLotoRadio lotoType={lotoType} setLotoType={setLotoType} />
        <PlotlyTest></PlotlyTest>
      </div>
    </div>
  );
}

export default App;
