declare interface User {
  id: string;
  username: string;
}
declare interface Session {
  loggedIn: boolean;
  user: User | null;
}
