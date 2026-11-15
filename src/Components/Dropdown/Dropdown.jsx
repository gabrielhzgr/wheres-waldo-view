import styles from "./Dropdown.module.css";
function Dropdown({ options, onChange }) {
  return (
    <select onChange={onChange} className={styles["dropdown"]}>
      <option value="">Select a character</option>
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}
export default Dropdown;
