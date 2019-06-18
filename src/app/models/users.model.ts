interface UserDetails {
  login: string;
  id: number;
  score: number;
  url: string;
  avatar_url: string;
  avatar: string;

}
export interface Users {
  total_count: number;
  items: Array<UserDetails>;
}
