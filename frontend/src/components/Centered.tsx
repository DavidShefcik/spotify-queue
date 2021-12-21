import { Children, ReactNode } from "react";
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
  let containerStyle = {};

  switch (centered) {
    case CENTERED.VERTICAL:
      containerStyle = styles.vertical;
      break;
    case CENTERED.HORIZONTAL:
      containerStyle = styles.horizontal;
      break;
    case CENTERED.BOTH:
      containerStyle = styles.both;
      break;
  }

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
