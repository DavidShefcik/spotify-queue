import { useEffect, RefObject } from "react";

interface Props {
  ref: RefObject<HTMLElement>;
  onOutsideClick(): void;
}

/**
 * Hook to call a given function when the
 * given element is clicked outside of
 * @param {Ref} element - The element to detect a click outside of
 * @param {Function} handler - The function to call when the
 * element is clicked outside of
 */
export default function useOnOutsideClick({ ref, onOutsideClick }: Props) {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (
        !ref.current ||
        !event.target ||
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      onOutsideClick();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("touchend", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchend", handleClick);
    };
  }, [ref, onOutsideClick]);
}
