import './Shared.css';

const Divider = (props) => {
  return (
    <div className="divider" style={{ height: props.thickness, marginTop: props.marginTop, marginBottom: props.marginBottom }}></div>
  );
};

export default Divider;
