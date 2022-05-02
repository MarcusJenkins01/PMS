import Chart from "react-apexcharts";
import { useState } from 'react';

const SpaceDistribution = (props) => {
  const [series, setSeries] = useState([19, 21, 44]);
  const [options, setOptions] = useState({
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['West car park', 'East car park', 'Main car park'],
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
  });

  return (
    <div id="space-distribution-chart">
      <span className="chart-title">Parking space distribution</span>
      <Chart options={options} series={series} type="pie" width={380} />
    </div>
  );
};

export default SpaceDistribution;
