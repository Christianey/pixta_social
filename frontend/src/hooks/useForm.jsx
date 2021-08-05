import { useState } from "react";

export const useForm = (initialState) => {
  const [userData, setUserData] = useState(initialState);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return { userData, handleChange, error, setError };
};

export const Form = (props) => {
  const { children, onSubmit, ...others } = props;

  return (
    <form onSubmit={onSubmit} {...others}>
      {children}
    </form>
  );
};
