const Input = (props) => {
  const { type, name, value, placeholder, onChange, ...others } = props;
  return (
    <input
      aria-label={placeholder}
      aria-placeholder={placeholder}
      style={{}}
      placeholder={placeholder}
      className={`block mb-2 w-full border border-gray-100 rounded-sm p-2  ${
        type == "submit" && "mt-10"
      }`}
      type={type}
      name={name}
      id={name}
      onChange={onChange}
      value={value}
      {...others}
    />
  );
};

export default Input;
