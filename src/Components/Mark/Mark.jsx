import styles from "./Mark.module.css";
import Dropdown from "../Dropdown/Dropdown.jsx";
import { useState, useRef } from "react";
function Mark({ characters, selectCb, offsetX, offsetY }) {
  const markRef = useRef(null);

  const [showMenu, setShowMenu] = useState(true);

  function handleChange(e) {
    if (e.target.value !== "") selectCb(Number(e.target.value));
    setShowMenu(false);
  }
  return (
    <span
      className={`${styles["mark"]} material-symbols-outlined`}
      ref={markRef}
      style={{
        position: "absolute",
        left: offsetX,
        top: offsetY,
      }}
    >
      location_on
      {showMenu ? (
        <section className={styles["menu-action"]}>
          <Dropdown options={characters} onChange={handleChange} />
        </section>
      ) : null}
    </span>
  );
}

export default Mark;
