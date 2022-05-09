import Chart from "react-apexcharts";
import { useState } from 'react';

const UsageChart = (props) => {
  const [series, setSeries] = useState([
    {
      name: 'Available',
      data: props.availableData
    },
    {
      name: 'Reserved',
      data: props.reservedData
    }
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
      categories: props.parkingLots,
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
