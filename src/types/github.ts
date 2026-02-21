export interface Owner {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  owner: Owner;
  created_at: string;
  updated_at: string;
}

export interface SearchResponse {
  total_count: number;
  items: Repository[];
}
