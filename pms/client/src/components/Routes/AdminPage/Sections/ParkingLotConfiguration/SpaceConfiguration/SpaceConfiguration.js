import List from "../../../Shared/List";
import AddButton from "../AddButton";
import AddSpace from "./AddSpace";
import SpaceItem from "./SpaceItem";
import ListItemEmpty from "../../../Shared/ListItemEmpty";
import ConfirmModal from "../../../Shared/ConfirmModal";
import Title from "../../../../../Shared/Title";

import http from "../../../../../../axios-configuration";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const SpaceConfiguration = (props) => {
  const [addingSpace, setAddingSpace] = useState(false);
  const [lotData, setLotData] = useState({});
  const [confirmDeleteID, setConfirmDeleteID] = useState();
  const [confirmBlockID, setConfirmBlockID] = useState();

  let { lotid } = useParams();

  const blockSpace = (id) => {
    http.post(`/admin/blockspace`, { spaceID: id }).then(() => {
      window.location.reload();
    });
  };

  const unblockSpace = (id) => {
    http.post(`/admin/unblockspace`, { spaceID: id }).then(() => {
      window.location.reload();
    });
  };

  const deleteSpace = (id) => {
    http.post(`/admin/deletespace`, { spaceID: id }).then(() => {
      window.location.reload();
    });
  };
  
  useEffect(() => {
    http.get(`/admin/lotdata/${lotid}`)
    .then(res => {
      if (res.data.err) {
        setLotData({});
        return;
      }

      setLotData(res.data);
    });
  }, []);
  
  return (
    <div id="space-configuration">
      <Title>{lotData.name}</Title>
      
      <List>
        {
          !lotData.spaces || lotData.spaces.length === 0 ? <ListItemEmpty/> :
          lotData.spaces.map(entry => {
            return <SpaceItem blocked={entry.is_blocked} spaceName={entry.name} spaceID={entry._id} unblock={unblockSpace} confirmDelete={setConfirmDeleteID} confirmBlock={setConfirmBlockID}/>
          })
        }
      </List>

      <AddButton stateFunction={setAddingSpace}/>
      { addingSpace ? <AddSpace spaceData={lotData.spaces} lotID={lotid} close={() => setAddingSpace(false)}/> : <></> }
      
      {
        confirmBlockID ?
        <ConfirmModal yes={() => blockSpace(confirmBlockID)} no={() => setConfirmBlockID(null)}>
          Are you sure you want to block this parking space?
          Blocking this parking space will cancel all bookings made for this space.
        </ConfirmModal>
        : <></>
      }

      {
        confirmDeleteID ?
        <ConfirmModal yes={() => deleteSpace(confirmDeleteID)} no={() => setConfirmDeleteID(null)}>
          Are you sure you want to delete this parking space?
        </ConfirmModal>
        : <></>
      }
    </div>
  );
};

export default SpaceConfiguration;
