import { Repo } from './repo.model';

export interface UserDetails {
  login: string;
  id: number;
  score: number;
  url: string;
  avatar_url: string;
  avatar: string;
  detailsButtonFlag: boolean;
  isRepoLoading: boolean;
  repos: Array<Repo>;

}
export interface Users {
  total_count: number;
  items: Array<UserDetails>;


}
