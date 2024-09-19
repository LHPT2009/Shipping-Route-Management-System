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

ChartJS.defaults.font.family = "Montserrat";

const LineGraph: React.FC = () => {
  const chartData = {
    xLabels: ["March", "April", "May", "June", "July", "August", "September"],
    yLabels: [1000000, 4000000, 1000000, 12000000, 6000000, 8000000, 5000000],
  };

  const labels: string[] = chartData.xLabels;
  const yLabels: number[] = chartData.yLabels;
  const stepRevenue: number = Math.max(...chartData.yLabels) / 4;
  const maxRevenue: number = Math.min(15000000, Math.max(...chartData.yLabels) + stepRevenue);
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
