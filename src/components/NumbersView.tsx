import { Numbers } from "../types";
import "./style/NumbersView.css";

type NumbersPropType = {
  numbers: Numbers;
};

const NumbersView = ({ numbers }: NumbersPropType) => {
  return (
    <div>
      {numbers.main.map((val) => (
        <span className="main-number" key={val}>
          {val}
        </span>
      ))}
      {numbers.bonus.map((val) => (
        <span className="bonus-number" key={val}>
          {val}
        </span>
      ))}
    </div>
  );
};

export default NumbersView;
