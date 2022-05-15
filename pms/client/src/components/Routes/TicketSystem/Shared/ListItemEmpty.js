import ListItem from "./ListItem";

const ListItemEmpty = (props) => {
  return (
    <ListItem
      left={<>
        <span>Nothing to show here!</span>
      </>}
      right={<></>}
    />
  );
};

export default ListItemEmpty;
