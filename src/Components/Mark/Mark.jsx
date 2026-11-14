import styles from "./Mark.module.css";
function Mark({ offsetX, offsetY }) {
  return (
    <span
      className={styles["mark"]}
      style={{
        position: "absolute",
        left: offsetX,
        top: offsetY,
      }}
    >
      X
    </span>
  );
}

export default Mark;
