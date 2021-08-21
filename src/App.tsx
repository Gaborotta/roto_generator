// Import
import { useState } from "react";
import { sample } from "underscore";

import Title from "./components/Title";
import GenerateButton from "./components/GenerateButton";
import NumbersView from "./components/NumbersView";
import SelectRotoRadio from "./components/SelectRotoRadio";

import "./App.css";

// 型宣言
export type GenerateType = (e: React.FormEvent<HTMLFormElement>) => void;
export type RotoType = "ROTO6" | "ROTO7" | "MiniROTO";
export type Numbers = {
  type: RotoType;
  main: number[];
  bonus: number[];
};
export type RotoGenerateDict = {
  [attr: string]: {
    nums: number[];
    main_n: number;
    bonus_n: number;
  };
};

// ロト値設定
const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v, k) => k + start);
const roto_values: RotoGenerateDict = {
  ROTO6: { nums: range(1, 44), main_n: 6, bonus_n: 1 },
  ROTO7: { nums: range(1, 38), main_n: 7, bonus_n: 2 },
  MiniROTO: { nums: range(1, 32), main_n: 5, bonus_n: 1 },
};

// 本体
function App() {
  const [rotoType, setRotoType] = useState<RotoType>("ROTO6");

  // 関数定義
  const sort_asc = (a: number, b: number) => (a > b ? 1 : -1);
  const generateNumbers = (rotoType: RotoType): Numbers => {
    let roto_set = roto_values[rotoType];
    let main: number[] = sample(roto_set.nums, roto_set.main_n);
    let bonus: number[] = sample(
      roto_set.nums.filter((v) => !main.includes(v)),
      roto_set.bonus_n
    );
    return {
      type: rotoType,
      main: main.sort(sort_asc),
      bonus: bonus.sort(sort_asc),
    };
  };

  // イベント動作定義
  const [numbers, setNumbers] = useState<Numbers>(generateNumbers(rotoType));
  const generate: GenerateType = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNumbers(generateNumbers(rotoType));
  };

  // 本体
  return (
    <div className="wrapper">
      <div className="container">
        <Title />
        <GenerateButton generate={generate} />
        <NumbersView numbers={numbers} />
        <SelectRotoRadio rotoType={rotoType} setRotoType={setRotoType} />
      </div>
    </div>
  );
}

export default App;
