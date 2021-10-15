import { useState } from "react";
import { connect } from "react-redux";

const Home = (props) => {
  console.log("Home props", props);

  const [value, setValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };

  return (
    <>
      <h1>📋 ToDo List</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Write to do" value={value} onChange={onChange}></input>
        <button>Add</button>
      </form>
      <ul></ul>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps", state, ownProps);
  return { state };
};

export default connect(mapStateToProps)(Home);
