import ListItem from "../../Shared/ListItem";
import RoundedButton from "../../../../Forms/Inputs/RoundedButton";

const UserItem = (props) => {
  return (
    <ListItem
      left={<>
        <span className="user-id">{props.userID}</span>
        <span className="user-name">{props.userName}</span>
      </>}
      right={<>
        <span className="user-isadmin">{props.isAdmin ? "ADMIN" : ""}</span>
        <RoundedButton colour="red" hPadding="2.5em" onClick={() => props.deleteUser(props.userID)}>Delete user</RoundedButton>
      </>}
    />
  );
};

export default UserItem;
