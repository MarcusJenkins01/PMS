import SpaceDistribution from "./SpaceDistribution";
import UsageChart from "./UsageChart";
import SpacesMap from "./SpacesMap";
//import Divider from "../../../../Shared/Divider";
import http from '../../../../../axios-configuration';

import './Statistics.css';
import { useEffect, useState } from "react";

const Statistics = (props) => {
  const [statisticsData, setStatisticsData] = useState({
    lotNames: [],
    spaceDistribution: [],
    availableSpaces: [],
    reservedSpaces: []
  });

  useEffect(() => {
    http.get('/admin/lotdata').then(res => {
      let lotNames = [];
      let spaces = [];
      let availableSpaces = [];
      let reservedSpaces = [];

      for (let lKey in Object.keys(res.data)) {
        let lot = res.data[lKey];
        let available = [];
        let reserved = [];

        lotNames.push(lot.name)
        spaces.push(lot.spaces);
        
        for (let sKey in lot.spaces) {
          let space = lot.spaces[sKey];

          if (space.bookings.length === 0) {
            available.push(space);
            continue;
          }

          // for (let bKey in space.bookings) {
          //   let booking = space.bookings[bKey];
            
          //   if (booking)
          // }

          reserved.push(space);
        }

        availableSpaces.push(available);
        reservedSpaces.push(reserved);
      }

      setStatisticsData({
        lotNames: lotNames,
        spaceDistribution: spaces,
        availableSpaces: availableSpaces,
        reservedSpaces: reservedSpaces
      });
    });
  }, []);

  console.log(statisticsData)

  return (
    <div id="statistics-container">
      <div className="chart-container">
        <SpaceDistribution lotNames={statisticsData.lotNames} spaceDistribution={statisticsData.spaceDistribution}/>
        <UsageChart lotNames={statisticsData.lotNames} availableData={statisticsData.availableSpaces} reservedData={statisticsData.reservedSpaces}/>
      </div>

      {/* <Divider thickness="1px" marginTop="1em" marginBottom="2em"/> */}
      
      <SpacesMap availableData={statisticsData.availableSpaces} reservedData={statisticsData.reservedSpaces}/>
    </div>
  );
};

export default Statistics;
