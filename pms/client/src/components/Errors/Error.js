const Error = (props) => {
  return (
    <div className="card error">
      <h1 className="error-title">{props.error}</h1>
      <p className="error-desc">{props.children}</p>
    </div>
  );
}

export default Error;
