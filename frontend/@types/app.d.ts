declare interface User {
  _id: string;
  username: string;
  spotifyId: string;
  hasSpotifyPremium: boolean;
}
declare interface Session {
  isLoggedIn: boolean;
  user: User | null;
}
