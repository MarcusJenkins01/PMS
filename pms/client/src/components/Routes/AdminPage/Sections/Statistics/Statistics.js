import SpaceDistribution from "./SpaceDistribution";
import UsageChart from "./UsageChart";
import './Statistics.css';

const Statistics = (props) => {
  return (
    <div className="statistics-container">
      <SpaceDistribution></SpaceDistribution>
      <UsageChart></UsageChart>
    </div>
  );
};

export default Statistics;
