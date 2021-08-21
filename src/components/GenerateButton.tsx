import { GenerateType } from "../App";
import "./style/GenerateButton.css";

type GeneratePropType = {
  generate: GenerateType;
};

const GenerateButton = ({ generate }: GeneratePropType) => {
  return (
    <form onSubmit={generate}>
      <button className="generateButton" type="submit">
        生成
      </button>
    </form>
  );
};

export default GenerateButton;
