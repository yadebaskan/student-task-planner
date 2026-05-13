import { Pie } from "react-chartjs-2";

function ChartSection({ chartData }) {
  return (
    <div style={{ width: "250px", margin: "20px auto" }}>
      <Pie data={chartData} />
    </div>
  );
}

export default ChartSection;