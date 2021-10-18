import { connect } from "react-redux";
import { DELETE_TODO } from "../store";

const Detail = ({ state, dispatch, history }) => {
  const handleDeleteToDo = (state, dispatch, history) => {
    dispatch({ type: DELETE_TODO, id: state.id });
    return history.push("/");
  };

  return (
    <>
      <h1>🚗 {state?.text}</h1>
      <h3>⏰ {state?.id}</h3>
      <button onClick={() => handleDeleteToDo(state, dispatch, history)}>Delete</button>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return { state: state?.find((state) => state.id === +id) };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
