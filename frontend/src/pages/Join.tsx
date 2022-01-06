import { useState, FormEvent } from "react";
import { css, StyleSheet } from "aphrodite";
import { Link } from "react-router-dom";

import Page from "~/components/Page";
import CenteredPageTitle from "~/layout/CenteredPageTitle";
import Digits, { DIGIT_SIZE } from "~/components/inputs/Digits";
import SpotifyButton from "~/components/inputs/SpotifyButton";
import useDeviceSize, { DEVICE_SIZE } from "~/hooks/useDeviceSize";

export default function JoinPage() {
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const deviceSize = useDeviceSize();

  const join = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    // TODO: API submission

    setSubmitting(false);
  };

  return (
    <Page title="Join" requireAuth>
      <CenteredPageTitle title="Join a Queue">
        <h3>Ask the host for the queue code</h3>
        <form className={css(styles.form)} onSubmit={join}>
          <div className={css(styles.topMargin)}>
            <Digits
              length={6}
              value={code}
              onChange={(val) => setCode(val)}
              error={!!error}
              digitSize={
                deviceSize === DEVICE_SIZE.MOBILE
                  ? DIGIT_SIZE.SMALL
                  : DIGIT_SIZE.LARGE
              }
              autoFocus
            />
          </div>
          {error && (
            <div className={css(styles.topMargin)}>
              <h3 className={css(styles.error)}>{error}</h3>
            </div>
          )}
          <div className={css([styles.topMargin, styles.buttonContainer])}>
            <SpotifyButton
              text="Join"
              loading={submitting}
              disabled={code.replace(" ", "").length !== 6}
            />
          </div>
        </form>
        <div className={css(styles.topMargin)}>
          <Link to="/" title="Go Back">
            Go Back
          </Link>
        </div>
      </CenteredPageTitle>
    </Page>
  );
}

const styles = StyleSheet.create({
  topMargin: {
    marginTop: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: "20px",
    color: "var(--red)",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "30px",
  },
});
