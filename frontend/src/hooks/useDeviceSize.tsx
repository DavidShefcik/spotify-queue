import { useState, useEffect, useCallback } from "react";

// Value is the min width in PX for that screen size
export enum DEVICE_SIZE {
  MOBILE = 0,
  TABLET = 768,
  DESKTOP = 1024,
  LARGE_DESKTOP = 1440,
}

type ReturnType = DEVICE_SIZE;

export default function useDeviceSize(): ReturnType {
  const [deviceSize, setDeviceSize] = useState<DEVICE_SIZE>(DEVICE_SIZE.MOBILE);

  const calculateDeviceSize = useCallback(
    (windowSize: number) => {
      if (windowSize < DEVICE_SIZE.DESKTOP) {
        setDeviceSize(DEVICE_SIZE.MOBILE);
      } else if (windowSize < DEVICE_SIZE.DESKTOP) {
        setDeviceSize(DEVICE_SIZE.TABLET);
      } else if (windowSize < DEVICE_SIZE.LARGE_DESKTOP) {
        setDeviceSize(DEVICE_SIZE.DESKTOP);
      } else {
        setDeviceSize(DEVICE_SIZE.LARGE_DESKTOP);
      }
    },
    [deviceSize, setDeviceSize]
  );

  useEffect(() => {
    const handleWindowResize = () => {
      calculateDeviceSize(window.innerWidth);
    };

    calculateDeviceSize(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return deviceSize;
}
