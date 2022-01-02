import { useState } from "react";
import { css, StyleSheet } from "aphrodite";

import Page from "~/components/Page";
import CenteredPageTitle from "~/layout/CenteredPageTitle";
import Digits, { DIGIT_SIZE } from "~/components/Digits";
import SpotifyButton from "~/components/SpotifyButton";

export default function JoinPage() {
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const join = async () => {
    console.log("join");
  };

  return (
    <Page title="Join" requireAuth>
      <CenteredPageTitle title="Join a Queue">
        <Digits
          length={6}
          value={code}
          onChange={(val) => setCode(val)}
          error={!!error}
          digitSize={DIGIT_SIZE.LARGE}
          autoFocus
        />
        {error && <h3 className={css(styles.error)}>{error}</h3>}
        <div className={css(styles.buttonContainer)}>
          <SpotifyButton text="Join" onClick={join} loading={submitting} />
        </div>
      </CenteredPageTitle>
    </Page>
  );
}

const styles = StyleSheet.create({
  error: {},
  buttonContainer: {
    marginTop: "30px",
  },
});
