import { useState, useRef, useImperativeHandle, forwardRef } from "react";

export const useForm = (initialState) => {
  const [userData, setUserData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return { userData, handleChange };
};

export const Form = forwardRef((props, ref) => {
  const { children, onSubmit, ...others } = props;

  const formRef = useRef();
  useImperativeHandle(ref, () => ({
    formRef: formRef.current,
  }));

  return (
    <form ref={formRef} onSubmit={onSubmit} {...others}>
      {children}
    </form>
  );
});
