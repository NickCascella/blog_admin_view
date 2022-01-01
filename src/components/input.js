const Input = ({ type, placeholder, value, on_change, min, max }) => {
  return (
    <input
      className="input-component"
      type={type}
      placeholder={placeholder}
      onChange={on_change}
      value={value}
      min={min}
      max={max}
    ></input>
  );
};

export default Input;
