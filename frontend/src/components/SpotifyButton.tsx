import { useState } from "react";
import { css, StyleSheet } from "aphrodite";
import { PulseLoader } from "react-spinners";
import { PREVENT_TEXT_HIGHLIGHTING } from "~/constants/styles";

interface Props {
  text: string;
  onClick(): void;
  disabled?: boolean;
  loading?: boolean;
  width?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  textColor?: string;
}

export default function SpotifyButton({
  text,
  onClick,
  disabled,
  loading,
  width = "160px",
  backgroundColor = "var(--spotify-green)",
  hoverBackgroundColor = "var(--spotify-dark-green)",
  textColor = "white",
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      style={{
        width,
        color: textColor,
        backgroundColor: hovered ? hoverBackgroundColor : backgroundColor,
      }}
      className={css([
        styles.button,
        disabled || loading ? styles.disabled : styles.enabled,
      ])}
      title={text}
      disabled={disabled || loading}
      onClick={() => onClick && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {loading ? <PulseLoader color="white" size={10} /> : text}
    </button>
  );
}

const styles = StyleSheet.create({
  button: {
    ...PREVENT_TEXT_HIGHLIGHTING,
    padding: "16px 14px 18px",
    fontSize: "14px",
    lineHeight: "1",
    borderRadius: "500px",
    transitionProperty:
      "background-color, border-color, color, box-shadow, filter, opacity",
    transitionDuration: "0.3s",
    borderWidth: 0,
    letterSpacing: "2px",
    textTransform: "uppercase",
    whiteSpace: "normal",
    fontWeight: 700,
    height: "48px",
    overflow: "hidden",
    outline: 0,
  },
  enabled: {
    cursor: "pointer",
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.7,
  },
});
