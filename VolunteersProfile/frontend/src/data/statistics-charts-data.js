import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [5, 2, 1, 6, 8, 1, 4],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500, 200, 100, 300],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 200, 100, 300],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "blue",
    title: "Weekly View",
    description: "Weekly performance Hours spent on learning",
    footer: "last updated on monday",
    chart: websiteViewsChart,
  },
  {
    color: "pink",
    title: "Monthly view",
    description: "Monthly performance Hours spent on learning",
    footer: "last updated 1st june 2023",
    chart: dailySalesChart,
  },
  {
    color: "green",
    title: "Completed Tasks",
    description: "Completed Tasks Hours spent on learning",
    footer: "last updated yesterday",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
