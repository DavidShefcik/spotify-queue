import SpotifyButton from "~/components/SpotifyButton";

export default function HomePage() {
  return (
    <div>
      <SpotifyButton text="Button" onClick={() => console.log("Click")} />
    </div>
  );
}
