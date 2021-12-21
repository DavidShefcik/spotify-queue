import Page from "~/components/Page";
import SpotifyButton from "~/components/SpotifyButton";

export default function HomePage() {
  return (
    <Page title="Welcome" indexed>
      <SpotifyButton text="Button" onClick={() => console.log("Click")} />
    </Page>
  );
}
