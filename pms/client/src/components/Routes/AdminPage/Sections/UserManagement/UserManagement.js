import List from "../../Shared/List";
import UserItem from "./UserItem";
import ConfirmModal from "../../Shared/ConfirmModal";

import "./UserManagement.css";
import { useEffect, useState } from "react";

import http from '../../../../../axios-configuration';

const UserManagement = (props) => {
  const [userData, setUserData] = useState({});
  const [confirmID, setConfirmID] = useState();

  useEffect(() => {
    http.get('/admin/users').then(res => {
      if (res.data.err) {
        setUserData({});
        return;
      }

      setUserData(res.data);
    });
  }, []);

  const deleteUser = (id) => {
    http.post('/admin/deleteuser', ({ userID: id })).then(() => {
      window.location.reload();
    });
  }

  return (
    <div id="user-management">
      <List>
        {
          Object.keys(userData).map((key, i) => {
            let entry = userData[key];
            console.log(entry.id_admin)
            return <UserItem isAdmin={entry.admin} userID={entry.email} userName={`${entry.first_name} ${entry.last_name}`} deleteUser={setConfirmID}/>
          })
        }
      </List>

      { 
        confirmID ?
        <ConfirmModal yes={() => deleteUser(confirmID)} no={() => setConfirmID(null)}>
          Are you sure you want to delete this user?
        </ConfirmModal>
        : <></>
      }
    </div>
  );
};

export default UserManagement;
