import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DELETE_TODO } from "./store";

const ToDo = ({ id, text, deleteDispatch }) => {
  return (
    <>
      {text && (
        <li>
          <Link to={`/${id}`}>{text}</Link>
          <button onClick={deleteDispatch}>Delete</button>
        </li>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteDispatch: () => dispatch({ type: DELETE_TODO, id: ownProps.id }),
  };
};

export default connect(null, mapDispatchToProps)(ToDo);
