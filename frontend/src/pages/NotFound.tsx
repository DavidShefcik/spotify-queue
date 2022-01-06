import { useNavigate } from "react-router-dom";
import { css, StyleSheet } from "aphrodite";

import Centered, { CENTERED } from "~/components/Centered";
import SpotifyButton from "~/components/inputs/SpotifyButton";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Centered centered={CENTERED.BOTH}>
      <h1 className={css(styles.title)}>404!</h1>
      <SpotifyButton
        text="Go Back"
        onClick={() => navigate("/", { replace: true })}
      />
    </Centered>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: "30px",
  },
});
