import Chart from "react-apexcharts";
import { useState } from 'react';

const UsageChart = (props) => {
  const [series, setSeries] = useState([
    {
      name: 'Available',
      data: [10, 6, 17]
    },
    {
      name: 'Reserved',
      data: [5, 10, 17]
    },
    {
      name: 'Occupied',
      data: [4, 5, 10]
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10
      },
    },
    xaxis: {
      type: 'string',
      categories: ['West car park', 'East car park', 'Main car park'],
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  });

  return (
    <div id="space-usage-chart">
      <span className="chart-title">Parking space usage</span>
      <Chart options={options} series={series} type="bar" height={350} width={700} />
    </div>
  );
};

export default UsageChart;
