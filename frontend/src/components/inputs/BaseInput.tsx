import { ReactNode } from "react";
import { css, StyleSheet } from "aphrodite";

import { COLORS } from "~/constants/colors";
import { PREVENT_TEXT_HIGHLIGHTING } from "~/constants/styles";

export interface InputProps<T> {
  text: string;
  value: T;
  onChange(value: T): void;
  disabled?: boolean;
  note?: string;
  width?: string;
}

interface Props<T> extends InputProps<T> {
  children: ReactNode;
}

export default function BaseInput<T>({
  text,
  children,
  note,
  disabled,
  width = "100%",
}: Props<T>) {
  return (
    <div style={{ width }} className={css(styles.container)}>
      <label
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        className={css(styles.inputContainer)}
      >
        <h4>{text}</h4>
        {children}
      </label>
      {note && <h5 className={css(styles.note)}>{note}</h5>}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    ...PREVENT_TEXT_HIGHLIGHTING,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 5px",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  note: {
    width: "100%",
    textAlign: "start",
    paddingTop: "20px",
    color: COLORS.DARK_GRAY,
  },
});
