import styles from "./Mark.module.css";
import Dropdown from "../Dropdown/Dropdown.jsx";
import { useState, useRef } from "react";
function Mark({
  isSet = false,
  characters,
  selectCb,
  cancelCb,
  offsetX,
  offsetY,
}) {
  const markRef = useRef(null);

  const [showDropDown, setShowDropDown] = useState(!isSet);

  function handleClick(e) {
    e.stopPropagation();
    setShowDropDown(true);
  }

  function handleChange(e) {
    console.log(e.target.value);

    if (e.target.value !== "") selectCb(Number(e.target.value));
  }
  return (
    <span
      className={`${styles["mark"]} material-symbols-outlined`}
      ref={markRef}
      onClick={handleClick}
      style={{
        position: "absolute",
        left: offsetX,
        top: offsetY,
      }}
    >
      location_on
      <section className={styles["menu-action"]}>
        {showDropDown ? (
          <Dropdown options={characters} onChange={handleChange} />
        ) : null}
        <button className={styles["remove-button"]} onClick={cancelCb}>
          Remove
        </button>
        {isSet ? (
          <button
            className={styles["change-button"]}
            onClick={() => setShowDropDown(true)}
          >
            Change selection
          </button>
        ) : null}
      </section>
    </span>
  );
}

export default Mark;
