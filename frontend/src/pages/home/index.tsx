import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { css, StyleSheet } from "aphrodite";

import SessionContext from "~/context/SessionContext";
import SessionModalContext from "./SessionModalContext";

import Page from "~/components/Page";
import Centered, { CENTERED } from "~/components/Centered";
import SpotifyButton from "~/components/SpotifyButton";
import SessionModal from "./SessionModal";

export default function HomePage() {
  const [sessionModalVisible, setSessionModalVisible] = useState(false);

  const { session } = useContext(SessionContext);

  const navigation = useNavigate();

  const createSession = () => {
    if (!session.user?.hasSpotifyPremium) {
      setSessionModalVisible(true);
    } else {
      navigation("/create");
    }
  };

  return (
    <Page title="Welcome" indexed requireAuth>
      <SessionModalContext.Provider
        value={{
          visible: sessionModalVisible,
          setVisible: (val) => setSessionModalVisible(val),
        }}
      >
        <SessionModal />
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
              onClick={createSession}
            />
          </div>
        </Centered>
      </SessionModalContext.Provider>
    </Page>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: "15px",
  },
});
