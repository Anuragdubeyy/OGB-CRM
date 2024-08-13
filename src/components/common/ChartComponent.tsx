
import  { FC } from "react";
import Chart, { CategoryScale } from "chart.js/auto";
import BarChart from "../graphs/BarChart";

Chart.register(CategoryScale);

interface ChartComponentProps {
  chartData: any;
  options?: any;
}

const ChartComponent: FC<ChartComponentProps> = ({ chartData, options }) => {
  return <BarChart chartData={chartData} options={options} />;
};

export default ChartComponent;
