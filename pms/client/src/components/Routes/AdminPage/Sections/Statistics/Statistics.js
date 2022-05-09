import SpaceDistribution from "./SpaceDistribution";
import UsageChart from "./UsageChart";
import SpacesMap from "./SpacesMap";
import Divider from "../../../../Shared/Divider";

import './Statistics.css';

const Statistics = (props) => {
  return (
    <div id="statistics-container">
      <div className="chart-container">
        <SpaceDistribution></SpaceDistribution>
        <UsageChart></UsageChart>
      </div>

      {/* <Divider thickness="1px" marginTop="1em" marginBottom="2em"/> */}
      
      <SpacesMap></SpacesMap>
    </div>
  );
};

export default Statistics;
