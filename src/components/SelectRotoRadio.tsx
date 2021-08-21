import { RotoType } from "../App";
import "./style/SelectRotoRadio.css";

type SelectRotoPropsType = {
  rotoType: RotoType;
  setRotoType: React.Dispatch<React.SetStateAction<RotoType>>;
};

type RotoDict = {
  ja_nm: String;
  en_nm: RotoType;
}[];
const rotoDict: RotoDict = [
  { ja_nm: "ロト6", en_nm: "ROTO6" },
  { ja_nm: "ロト7", en_nm: "ROTO7" },
  { ja_nm: "ミニロト", en_nm: "MiniROTO" },
];

const SelectRotoRadio = ({ rotoType, setRotoType }: SelectRotoPropsType) => {
  return (
    <form>
      {rotoDict.map(({ ja_nm, en_nm }) => (
        <label className="roto-radio-label" key={en_nm}>
          <input
            className="roto-radio"
            type="radio"
            name="roto_type"
            checked={rotoType === en_nm}
            onChange={() => {
              setRotoType(en_nm);
            }}
          />
          {ja_nm}
        </label>
      ))}
    </form>
  );
};

export default SelectRotoRadio;
