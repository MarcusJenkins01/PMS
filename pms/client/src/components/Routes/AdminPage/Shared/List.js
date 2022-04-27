import ListItem from './ListItem';
import './List.css';

const List = (props) => {
  return (
    <div className="list">
      {props.children}
    </div>
  );
};

export default List;
