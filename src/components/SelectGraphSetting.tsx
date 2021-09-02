import { LotoType, SummaryType, PeriodType, periodTypeList } from "../types";
import "./style/SelectLotoRadio.css";

type SelectGraphPropsType = {
  lotoType: LotoType;
  summaryType: SummaryType;
  periodType: PeriodType;
  setFireData: (lType: LotoType, sType: SummaryType, pType: PeriodType) => void;
  setGraphSummaryType: React.Dispatch<React.SetStateAction<SummaryType>>;
  setGraphPeriod: React.Dispatch<React.SetStateAction<PeriodType>>;
};

type SummaryTypeDict = {
  ja_nm: String;
  en_nm: SummaryType;
}[];
const summaryTypeDict: SummaryTypeDict = [
  { ja_nm: "１個", en_nm: "single_num_sum" },
  { ja_nm: "２個", en_nm: "double_num_sum" },
  { ja_nm: "３個", en_nm: "triple_num_sum" },
];

const SelectGraphSetting = ({
  lotoType,
  summaryType,
  periodType,
  setFireData,
  setGraphSummaryType,
  setGraphPeriod,
}: SelectGraphPropsType) => {
  return (
    <>
      <form>
        {summaryTypeDict.map(({ ja_nm, en_nm }) => (
          <label className="loto-radio-label" key={en_nm}>
            <input
              className="graph-radio"
              type="radio"
              name="summary_type"
              checked={summaryType === en_nm}
              onChange={() => {
                setGraphSummaryType(en_nm);
                setFireData(lotoType, en_nm, periodType);
              }}
            />
            {ja_nm}
          </label>
        ))}
      </form>
      <form>
        {periodTypeList.map((ja_nm) => (
          <label className="loto-radio-label" key={ja_nm}>
            <input
              className="graph-radio"
              type="radio"
              name="summary_type"
              checked={periodType === ja_nm}
              onChange={() => {
                setGraphPeriod(ja_nm);
                setFireData(lotoType, summaryType, ja_nm);
              }}
            />
            {ja_nm}
          </label>
        ))}
      </form>
    </>
  );
};

export default SelectGraphSetting;
