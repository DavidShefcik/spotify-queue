import { useState } from "react";
import { css, StyleSheet } from "aphrodite";
import { Link } from "react-router-dom";

import Page from "~/components/Page";
import CenteredPageTitle from "~/layout/CenteredPageTitle";
import Switch from "~/components/inputs/Switch";
import NumberInput from "~/components/inputs/NumberInput";
import SpotifyButton from "~/components/inputs/SpotifyButton";

const INPUT_WIDTH = "285px";

export default function CreatePage() {
  const [requireVoteToSkip, setRequireVoteToSkip] = useState(false);
  const [percentRequired, setPercentRequired] = useState("0");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const create = async () => {
    setSubmitting(true);
    setError("");

    // TODO: API submission

    setSubmitting(false);
  };

  return (
    <Page title="Create" requireAuth>
      <CenteredPageTitle title="Create a Queue">
        <Switch
          text="Require vote to skip song"
          note="Should a vote be required if someone other than the host tries to skip a song"
          value={requireVoteToSkip}
          onChange={(val) => setRequireVoteToSkip(val)}
          width={INPUT_WIDTH}
        />
        {requireVoteToSkip && (
          <NumberInput
            text="Percent required for vote to pass"
            note="What percent of votes have to be a yes to skip a song"
            value={percentRequired}
            onChange={(val) => setPercentRequired(val)}
            width={INPUT_WIDTH}
          />
        )}
        {error && (
          <div className={css(styles.topMargin)}>
            <h3 className={css(styles.error)}>{error}</h3>
          </div>
        )}
        <div className={css(styles.topMargin)}>
          <SpotifyButton text="Create" loading={submitting} onClick={create} />
        </div>
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
  error: {
    fontSize: "20px",
    color: "var(--red)",
    textAlign: "center",
  },
});
