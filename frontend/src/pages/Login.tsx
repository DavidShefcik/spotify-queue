import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Page from "~/components/Page";
import Centered, { CENTERED } from "~/components/Centered";
import SpotifyButton from "~/components/SpotifyButton";
import { api } from "~/utils/api";
import { LoginResponse } from "~/utils/api/types";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const { data } = await api.get<LoginResponse>("/auth/login");
      const { oauth_url } = data;

      console.log(oauth_url);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Page title="Login" indexed>
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
