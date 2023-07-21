import LineChart from "./BarChart";

function MainData(props) {
  const userData = {
    labels: props.values.map((e) => e.label),
    datasets: [
      {
        label: "Expense Done of last 12 days",
        data: props.values.map((data) => data.value),
        fill: true,
        tension: 0.5,
        pointRadius: 5,
        pointHoverRadius: 15,
        maintainAspectRatio: false,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return <LineChart data={userData} options={chartOptions} />;
}

export default MainData;
