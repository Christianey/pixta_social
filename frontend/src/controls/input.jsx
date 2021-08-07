import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const {
    type,
    name,
    value,
    placeholder,
    onChange,
    isValid,
    error,
    ...others
  } = props;

  return (
    <input
      ref={ref}
      aria-label={placeholder}
      aria-placeholder={placeholder}
      placeholder={placeholder}
      className={`block mb-2 w-full border border-gray-100 rounded-sm p-2 px-4 ${
        isValid && "cursor-pointer"
      } ${
        error === name && error !== undefined
          ? "border-red-600"
          : "focus:border-blue-medium"
      }
      `}
      type={type}
      name={name}
      disabled={isValid === undefined ? false : isValid === true ? false : true}
      style={{
        opacity: `${
          isValid === undefined ? "1" : isValid === true ? "1" : "0.5"
        }`,
      }}
      id={name}
      onChange={onChange}
      value={value}
      {...others}
    />
  );
});

export default Input;
