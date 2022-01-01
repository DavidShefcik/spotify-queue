import { useState } from "react";

import Page from "~/components/Page";
import Centered, { CENTERED } from "~/components/Centered";
import SpotifyButton from "~/components/SpotifyButton";
import { api } from "~/utils/api";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    const { response } = await api.login();

    if (response) {
      const { oauth_url } = response;

      window.location.href = oauth_url;
    }

    setLoading(false);
  };

  return (
    <Page title="Login" indexed requireNotAuth>
      <Centered centered={CENTERED.BOTH}>
        <SpotifyButton
          text="Login with Spotify"
          onClick={login}
          width="250px"
          loading={loading}
        />
      </Centered>
    </Page>
  );
}
