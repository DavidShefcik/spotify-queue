declare interface User {
  _id: string;
  username: string;
  spotifyId: string;
  hasSpotifyPremium: boolean;
}
declare interface Session {
  loggedIn: boolean;
  user: User | null;
}
