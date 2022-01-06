import { css, StyleSheet } from "aphrodite";

import BaseInput, { InputProps } from "./BaseInput";

export default function NumberInput(props: InputProps<string>) {
  const { value, onChange, disabled } = props;

  return (
    <BaseInput {...props}>
      <input
        className={css(styles.input)}
        type="number"
        placeholder="0"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        min={0}
        max={100}
        disabled={disabled}
      />
    </BaseInput>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "70px",
    height: "30px",
    textAlign: "center",
    borderRadius: "4px",
    outline: 0,
  },
});
