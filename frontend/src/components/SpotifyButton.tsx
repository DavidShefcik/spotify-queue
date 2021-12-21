import { css, StyleSheet } from "aphrodite";
import { PulseLoader } from "react-spinners";
import { PREVENT_TEXT_HIGHLIGHTING } from "~/constants/styles";

interface Props {
  text: string;
  onClick(): void;
  disabled?: boolean;
  loading?: boolean;
  width?: string;
}

export default function SpotifyButton({
  text,
  onClick,
  disabled,
  loading,
  width = "160px",
}: Props) {
  return (
    <button
      className={css([
        styles.button,
        disabled || loading ? styles.disabled : styles.enabled,
      ])}
      style={{ width }}
      title={text}
      disabled={disabled || loading}
      onClick={() => onClick && onClick()}
    >
      {loading ? <PulseLoader color="white" size={10} /> : text}
    </button>
  );
}

const styles = StyleSheet.create({
  button: {
    ...PREVENT_TEXT_HIGHLIGHTING,
    color: "white",
    backgroundColor: "var(--spotify-green)",
    padding: "16px 14px 18px",
    fontSize: "14px",
    lineHeight: "1",
    borderRadius: "500px",
    transitionProperty:
      "background-color, border-color, color, box-shadow, filter, opacity",
    transitionDuration: "0.3s",
    borderWidth: 0,
    letterSpacing: "2px",
    minWidth: "160px",
    textTransform: "uppercase",
    whiteSpace: "normal",
    fontWeight: 700,
    height: "48px",
    overflow: "hidden",
  },
  enabled: {
    cursor: "pointer",
    ":hover": {
      backgroundColor: "var(--spotify-dark-green)",
    },
  },
  disabled: {
    cursor: "not-allowed",
    backgroundColor: "var(--spotify-dark-green)",
    opacity: 0.7,
  },
});
