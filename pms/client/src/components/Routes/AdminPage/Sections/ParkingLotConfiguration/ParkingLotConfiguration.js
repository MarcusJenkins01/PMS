import { useState } from "react";
import List from "../../Shared/List";
import LotItem from "./LotItem";
import SpaceConfiguration from "./SpaceConfiguration/SpaceConfiguration";

const ParkingLotConfiguration = (props) => {
  const [lotData, setLotData] = useState(["A01", "A02"]);
  const [configuringLotID, setConfiguringLotID] = useState();

  const configureLot = (id) => {
    setConfiguringLotID(id);
  }
  
  const deleteLot = (id) => {
    
  }

  return (
    configuringLotID ? <SpaceConfiguration lotID={configuringLotID}/> :
    <List>
      { lotData.map((lot) => <LotItem lotID={lot} configureLot={configureLot}/>) }
    </List>
  );
};

export default ParkingLotConfiguration;
