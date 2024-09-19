import React from "react";
import styles from "./dashboard.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { COLOR } from "@/constant/color";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "Rubik";

interface LineGraphProps {
  locationNames: string[];
  locationCounts: number[];
}

const LineGraph: React.FC<LineGraphProps> = ({ locationNames, locationCounts }) => {
  const chartData = {
    xLabels: locationNames,
    yLabels: locationCounts,
  };

  const labels: string[] = chartData.xLabels;
  const yLabels: number[] = chartData.yLabels;
  const stepRevenue: number = 1;
  const maxRevenue: number = Math.round(Math.min(30, Math.max(...chartData.yLabels) + 5));
  const data = {
    labels,
    datasets: [
      {
        data: yLabels,
        borderColor: COLOR.PRIMARY,
        backgroundColor: "#FFFFFF",
        pointBackgroundColor: COLOR.PRIMARY,
        borderWidth: 2,
        pointRadius: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: maxRevenue,
        ticks: {
          stepSize: stepRevenue,
        },
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default LineGraph;
