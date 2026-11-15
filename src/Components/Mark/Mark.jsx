import styles from "./Mark.module.css";
import Dropdown from "../Dropdown/Dropdown.jsx";
function Mark({ characters, selectCb, cancelCb, offsetX, offsetY }) {
  return (
    <span
      className={`${styles["mark"]} material-symbols-outlined`}
      style={{
        position: "absolute",
        left: offsetX,
        top: offsetY,
      }}
    >
      location_on
      <Dropdown options={characters} />
    </span>
  );
}

export default Mark;
