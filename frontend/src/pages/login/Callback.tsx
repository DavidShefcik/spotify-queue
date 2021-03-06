import { useState, useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { css, StyleSheet } from "aphrodite";

import Page from "~/components/Page";
import Centered, { CENTERED } from "~/components/Centered";
import SpotifyButton from "~/components/inputs/SpotifyButton";
import { api } from "~/utils/api";
import SessionContext from "~/context/SessionContext";

export default function Callback() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const navigation = useNavigate();

  const { setSession } = useContext(SessionContext);

  useEffect(() => {
    const error = searchParams.get("error");
    const code = searchParams.get("code");

    if (error || !code) {
      setError(true);
      setLoading(false);
    } else {
      (async () => {
        const { error, response } = await api.loginCallback({
          code,
        });

        if (error) {
          setError(true);
          setLoading(false);
        } else if (response) {
          setSession({
            isLoggedIn: true,
            user: response,
          });
        }
      })();
    }
  }, []);

  let content = null;

  if (loading) {
    content = <PulseLoader color="white" size={16} />;
  } else if (error) {
    content = (
      <>
        <h1 className={css(styles.title)}>Something happened!</h1>
        <SpotifyButton
          text="Try Again"
          width="250px"
          onClick={() => navigation("/login")}
        />
      </>
    );
  } else {
    content = <h1>Please wait...</h1>;
  }

  return (
    <Page title="Login" requireNotAuth>
      <Centered centered={CENTERED.BOTH}>{content}</Centered>
    </Page>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: "30px",
  },
});
