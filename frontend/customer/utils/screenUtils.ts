import { useState, useEffect } from "react";

export const UseScreenWidth = (): number | null => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (typeof window !== "undefined") {
        setScreenWidth(window.innerWidth);
      }
    };

    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return screenWidth;
};

export const GetValueFromScreen = (
  screenWidth: number | null,
  extraSmall: boolean,
  small: boolean,
  medium: boolean,
  large: boolean,
  extraLarge: boolean,
  extraExtraLarge: boolean
): boolean => {
  if (screenWidth === null) {
    return false; // or a default value
  }

  if (screenWidth < 576) {
    return extraSmall;
  } else if (screenWidth < 768) {
    return small;
  } else if (screenWidth < 992) {
    return medium;
  } else if (screenWidth < 1200) {
    return large;
  } else if (screenWidth < 1600) {
    return extraLarge;
  } else {
    return extraExtraLarge;
  }
};

export const addResizeListener = (callback: () => void): void => {
  if (typeof window !== "undefined") {
    window.addEventListener("resize", callback);
  }
};

export const removeResizeListener = (callback: () => void): void => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", callback);
  }
};
