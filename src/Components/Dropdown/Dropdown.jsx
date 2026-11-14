function Dropdown({ opened = false, options, selectCb }) {
  if (opened) {
    return (
      <select onChange={selectCb} name="" id="">
        {options.map((option) => {
          return <option value={option.id}>{option.name}</option>;
        })}
      </select>
    );
  }
}
export default Dropdown;
