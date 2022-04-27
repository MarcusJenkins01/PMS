import RoundedButton from '../../../Forms/Inputs/RoundedButton';

const assignSpace = () => {

};

const reject = () => {
  
};

const ListItem = (props) => {
  return (
    <div className="list-item">
      <div className="left">
        {props.left}
      </div>

      <div className="right">
        {props.right}
      </div>
    </div>
  );
};

export default ListItem;
