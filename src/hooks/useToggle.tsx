import { useState, useCallback } from "react";

export const useToggle = (initialState = false) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback(() => {
    setIsToggled((prev) => !prev);
  }, []);

  const setToggle = useCallback((value: boolean) => {
    setIsToggled(value);
  }, []);

  return {
    isToggled,
    toggle,
    setToggle,
  };
};
