import PropTypes from "prop-types";
import "./Counter.css";

export default function CounterButton({
  by,
  incrementMethod,
  decrementMethod,
}) {
  return (
    <div className="Counter">
      <dir>
        <button
          className="button counterButton"
          onClick={() => incrementMethod(by)}
        >
          +{by}
        </button>
        <button
          className="button counterButton"
          onClick={() => decrementMethod(by)}
        >
          -{by}
        </button>
      </dir>
    </div>
  );
}

CounterButton.propTypes = {
  by: PropTypes.number,
  incrementMethod: PropTypes.func,
  decrementMethod: PropTypes.func,
};

CounterButton.defaultProps = {
  by: 1,
};
