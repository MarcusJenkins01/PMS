import Chart from "react-apexcharts";
import { useState } from 'react';

const UsageChart = (props) => {
  const series = [
    {
      name: 'Available',
      data: props.availableData.map(datum => datum.length)
    },
    {
      name: 'Reserved',
      data: props.reservedData.map(datum => datum.length)
    }
  ];

  const options = {
    colors : ['#8646D7', '#FF5677'],
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
      categories: props.lotNames,
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      colors: ['#8646D7', '#FF5677']
    }
  };

  return (
    <div id="space-usage-chart">
      <span className="chart-title">Parking space usage</span>
      <Chart options={options} series={series} type="bar" height={350} width={700} />
    </div>
  );
};

export default UsageChart;
