import { ReactNode, useMemo } from "react";
import { css, StyleSheet } from "aphrodite";

export enum CENTERED {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
  BOTH = "both",
}

interface Props {
  centered: CENTERED;
  width?: string;
  height?: string;
  children: ReactNode;
}

export default function Centered({
  centered,
  width = "100%",
  height = "100%",
  children,
}: Props) {
  const containerStyle = useMemo(() => {
    switch (centered) {
      case CENTERED.VERTICAL:
        return styles.vertical;
      case CENTERED.HORIZONTAL:
        return styles.horizontal;
      case CENTERED.BOTH:
        return styles.both;
    }
  }, [centered]);

  return (
    <div
      className={css([styles.baseContainer, containerStyle])}
      style={{ width, height }}
    >
      {children}
    </div>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    display: "flex",
    flexDirection: "column",
  },
  vertical: {
    justifyContent: "center",
  },
  horizontal: {
    alignItems: "center",
  },
  both: {
    justifyContent: "center",
    alignItems: "center",
  },
});
