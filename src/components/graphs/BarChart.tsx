import  { FC } from "react";
import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

interface BarChartProps {
  chartData: ChartData<"bar", any>;
  options?: ChartOptions<"bar">;
}

const BarChart: FC<BarChartProps> = ({ chartData, options }) => {
  return <Bar {...{ data: chartData, options }} />;
};

export default BarChart;