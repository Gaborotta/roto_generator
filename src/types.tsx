////////////////////////////////////
// 型宣言
///////////////////////////////////
export type GenerateType = (e: React.FormEvent<HTMLFormElement>) => void;
export type LotoType = "LOTO6" | "LOTO7" | "MINI_LOTO";
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
export type SummaryType =
  | "double_num_sum"
  | "single_num_sum"
  | "triple_num_sum";

export const periodTypeList = [
  "過去 20 回",
  "過去 30 回",
  "過去 50 回",
  "過去 100 回",
  "過去 300 回",
  "過去 500 回",
  "過去 1000 回",
  "過去全期間",
];
export type PeriodType = typeof periodTypeList[number];
export type GraphData = {
  x_axis: string[];
  y_axis: number[];
};
