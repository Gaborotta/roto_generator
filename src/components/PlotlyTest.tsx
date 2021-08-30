import Plot from "react-plotly.js";

const PlotlyTest = () => {
  return (
    <div>
      <Plot
        data={[
          {
            y: ["D", "G", "A"],
            x: [2, 6, 3],
            type: "bar",
            marker: { color: "red" },
            orientation: "h",
          },
          // { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        useResizeHandler={true}
        layout={{ title: "", autosize: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default PlotlyTest;
