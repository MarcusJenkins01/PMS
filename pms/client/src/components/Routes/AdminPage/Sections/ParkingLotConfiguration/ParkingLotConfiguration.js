import { useEffect, useState } from "react";
import List from "../../Shared/List";
import LotItem from "./LotItem";
import AddButton from "./AddButton";
import AddParkingLot from "./AddParkingLot";
import ConfirmModal from "../../Shared/ConfirmModal";
import ListItemEmpty from "../../Shared/ListItemEmpty";
import Title from "../../../../Shared/Title";

import http from '../../../../../axios-configuration';

import './ParkingLotConfiguration.css';

const ParkingLotConfiguration = (props) => {
  const [lotData, setLotData] = useState({});
  const [addingParkingLot, setAddingParkingLot] = useState(false);
  const [confirmID, setConfirmID] = useState();

  useEffect(() => {
    http.get('/admin/lotdata').then(res => {
      if (res.data.err) {
        setLotData({});
        return;
      }

      setLotData(res.data);
    });
  }, []);

  const deleteLot = (id) => {
    http.post(`/admin/deletelot`, { lotID: id }).then(() => {
      window.location.reload();
    });
  }
  
  return (
    <div id="parking-lot-configuration">
      <Title>Parking lots</Title>

      <List>
        {
          Object.keys(lotData).length === 0 ? <ListItemEmpty/> :
          Object.keys(lotData).map((key, i) => {
            let entry = lotData[key];
            return <LotItem confirmDelete={setConfirmID} lotID={entry._id} lotName={entry.name} spaceNum={entry.spaces.length}/>
          })
        }
      </List>
  
      <AddButton stateFunction={setAddingParkingLot}/>
      { addingParkingLot ? <AddParkingLot setAddingState={setAddingParkingLot}/> : <></> }

      {
        confirmID ?
        <ConfirmModal yes={() => deleteLot(confirmID)} no={() => setConfirmID(null)}>
          Are you sure you want to delete this parking lot?
        </ConfirmModal>
        : <></>
      }
    </div>
  );
};

export default ParkingLotConfiguration;
