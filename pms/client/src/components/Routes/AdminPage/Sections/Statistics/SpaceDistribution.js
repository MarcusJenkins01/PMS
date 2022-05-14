import Chart from "react-apexcharts";
import { useState } from 'react';

const SpaceDistribution = (props) => {
  const series = props.spaceDistribution.map(spaces => spaces.length);
  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: props.lotNames,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div id="space-distribution-chart">
      <span className="chart-title">Parking space distribution</span>
      <Chart options={options} series={series} type="pie" width={380} />
    </div>
  );
};

export default SpaceDistribution;
