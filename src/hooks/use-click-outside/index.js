import { useLayoutEffect } from "react";

function useClickOutside({ ref, cb }) {
  useLayoutEffect(() => {
    const handleClick = ({ target }) => {
      if (ref.current && !ref.current.contains(target)) {
        cb();
      }
    };
    document.addEventListener("mousedown", handleClick, true);

    return () => {
      document.removeEventListener("mousedown", handleClick, true);
    };
  });
}

export default useClickOutside;
