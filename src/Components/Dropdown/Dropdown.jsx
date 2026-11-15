import styles from "./Dropdown.module.css";
function Dropdown({ options }) {
  function handlerChange(e) {
    console.log(e.target.value);
  }
  return (
    <select
      onChange={handlerChange}
      className={styles["dropdown"]}
      name=""
      id=""
    >
      {options.map((option) => {
        return <option value={option.id}>{option.name}</option>;
      })}
    </select>
  );
}
export default Dropdown;
