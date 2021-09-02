import Plot from "react-plotly.js";
import { GraphData } from "../types";

type GraphPropType = {
  graphData: GraphData;
  graphTopN: number;
  isGraphOK: boolean;
};

const createGraph = ({ x_axis, y_axis }: GraphData) => {
  return (
    <Plot
      data={[
        {
          x: x_axis, //横軸のため反転
          y: y_axis,
          type: "bar",
          marker: { color: "red" },
          // orientation: "h",
        },
      ]}
      useResizeHandler={true}
      layout={{ title: "", autosize: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const PlotlyTest = ({ graphData, graphTopN, isGraphOK }: GraphPropType) => {
  return (
    <div>
      {isGraphOK &&
        createGraph({
          x_axis: graphData?.x_axis?.slice(0, graphTopN - 1),
          y_axis: graphData?.y_axis?.slice(0, graphTopN - 1),
        })}
      {!isGraphOK &&
        createGraph({
          x_axis: [],
          y_axis: [],
        })}
    </div>
  );
};

export default PlotlyTest;
