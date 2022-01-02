import { useState, useEffect } from "react";

interface Props {
  visible: boolean;
  visibleClass: object;
  hiddenClass: object;
  unmountDuration: number;
}
interface ReturnType {
  componentVisible: boolean;
  componentMounted: boolean;
  currentCSSClass: object;
  setVisibility(value: boolean): void;
}

/**
 * Hook to animate the mounting and unmounting
 * of a component
 * @param {boolean} Visible - If the component should be visible
 * @param {visibleClass} Object - The aphrodite CSS class to
 * return when the component is visible
 * @param {hiddenClass} Object - The aphrodite CSS class to
 * return when the component is hidden
 * @param {unmountDuration} Number - The amount of MS to
 * wait before changing visible to false
 */
export default function useAnimateMount({
  visible,
  visibleClass,
  hiddenClass,
  unmountDuration,
}: Props): ReturnType {
  // Visible is controlling the CSS class used
  const [internalVisible, setInternalVisible] = useState(false);
  // Mounted is if the component should be mounted in the DOM
  const [mounted, setMounted] = useState(false);
  const [style, setStyle] = useState<object>(hiddenClass);

  const setVisibility = (value: boolean) => {
    setInternalVisible(value);
    if (!value) {
      setTimeout(() => {
        setMounted(false);
      }, unmountDuration);
    } else {
      setMounted(true);
    }
  };

  useEffect(() => {
    if (!internalVisible) {
      setStyle(hiddenClass);
    } else {
      setStyle(visibleClass);
    }
  }, [internalVisible]);

  return {
    componentVisible: visible,
    componentMounted: mounted,
    currentCSSClass: style,
    setVisibility,
  };
}
