import { useMemo } from "react";
import { css, StyleSheet } from "aphrodite";
import useDigitInput from "react-digit-input";

export enum DIGIT_SIZE {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface DigitSizeStyling {
  width: string;
  height: string;
  fontSize: string;
  margin: string;
}

interface Props {
  length: number;
  value: string;
  error?: boolean;
  onChange?(value: string): void;
  editable?: boolean;
  autoFocus?: boolean;
  digitSize?: DIGIT_SIZE;
}

export default function Digits({
  length,
  value,
  error,
  onChange,
  editable = true,
  autoFocus,
  digitSize = DIGIT_SIZE.MEDIUM,
}: Props) {
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length,
    value,
    onChange: (val) => onChange && onChange(val),
  });

  const size: DigitSizeStyling = useMemo(() => {
    switch (digitSize) {
      case DIGIT_SIZE.SMALL:
        return {
          width: "40px",
          height: "33px",
          fontSize: "12px",
          margin: "0 2px",
        };
      case DIGIT_SIZE.MEDIUM:
        return {
          width: "50px",
          height: "42px",
          fontSize: "20px",
          margin: "0 4px",
        };
      case DIGIT_SIZE.LARGE:
        return {
          width: "60px",
          height: "50px",
          fontSize: "28px",
          margin: "0 5px",
        };
    }
  }, [digitSize]);

  return (
    <div className={css(styles.container)}>
      {new Array(length).fill(0).map((item, index) => (
        <input
          key={index}
          className={css([styles.input, error && styles.error])}
          style={{ ...size }}
          inputMode="decimal"
          autoFocus={index === 0 && editable && autoFocus}
          disabled={!editable}
          {...digits[index]}
        />
      ))}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    borderRadius: "8px",
    outline: 0,
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "var(--spotify-black)",
    transition: "all 0.01s linear",
    textAlign: "center",
    ":focus": {
      borderColor: "var(--spotify-green)",
    },
  },
  error: {
    borderColor: "var(--red)",
  },
});
