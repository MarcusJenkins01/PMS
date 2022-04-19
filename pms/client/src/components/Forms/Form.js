import "./Form.css";

function Form(props) {
  let processSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();

    let formJSON = Object.fromEntries(formData);
    props.process(formJSON);

    console.log(formJSON);
  };

  return (
    <div className="card">
      <form onSubmit={processSubmit}>
        {props.children}
      </form>
    </div>
  )
}

export default Form;
