import { useNavigate } from "react-router-dom";
import { css, StyleSheet } from "aphrodite";

import Page from "~/components/Page";
import Centered, { CENTERED } from "~/components/Centered";
import SpotifyButton from "~/components/SpotifyButton";

export default function HomePage() {
  const navigation = useNavigate();

  return (
    <Page title="Welcome" indexed requireAuth>
      <Centered centered={CENTERED.BOTH}>
        <SpotifyButton
          text="Join a Session"
          width="250px"
          onClick={() => navigation("/join")}
        />
        <div className={css(styles.marginTop)}>
          <SpotifyButton
            text="Create a Session"
            width="250px"
            onClick={() => navigation("/create")}
          />
        </div>
      </Centered>
    </Page>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: "15px",
  },
});
