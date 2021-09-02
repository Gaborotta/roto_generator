import { LotoType, SummaryType, PeriodType } from "../types";
import "./style/SelectLotoRadio.css";

type SelectLotoPropsType = {
  lotoType: LotoType;
  summaryType: SummaryType;
  periodType: PeriodType;
  setLotoType: React.Dispatch<React.SetStateAction<LotoType>>;
  setFireData: (lType: LotoType, sType: SummaryType, pType: PeriodType) => void;
};

type LotoDict = {
  ja_nm: String;
  en_nm: LotoType;
}[];
const lotoDict: LotoDict = [
  { ja_nm: "ロト6", en_nm: "LOTO6" },
  { ja_nm: "ロト7", en_nm: "LOTO7" },
  { ja_nm: "ミニロト", en_nm: "MINI_LOTO" },
];

const SelectLotoRadio = ({
  lotoType,
  summaryType,
  periodType,
  setLotoType,
  setFireData,
}: SelectLotoPropsType) => {
  return (
    <form>
      {lotoDict.map(({ ja_nm, en_nm }) => (
        <label className="loto-radio-label" key={en_nm}>
          <input
            className="loto-radio"
            type="radio"
            name="loto_type"
            checked={lotoType === en_nm}
            onChange={() => {
              setLotoType(en_nm);
              setFireData(en_nm, summaryType, periodType);
            }}
          />
          {ja_nm}
        </label>
      ))}
    </form>
  );
};

export default SelectLotoRadio;
