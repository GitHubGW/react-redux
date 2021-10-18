import { useState } from "react";
import { connect } from "react-redux";
import ToDo from "../ToDo";
import { ADD_TODO } from "../store";

const Home = ({ state, addDispatch, ...props }) => {
  const [value, setValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    addDispatch(value);
    setValue("");
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
        <input type="text" placeholder="Write to do" value={value} onChange={onChange} maxLength="20" required></input>
        <button>Add</button>
      </form>
      <ul>
        {state?.map((state) => (
          <ToDo key={state.id} {...state} />
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { state };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addDispatch: (value) => dispatch({ type: ADD_TODO, id: Date.now(), text: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
