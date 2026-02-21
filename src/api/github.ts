import type { SearchResponse } from "../types/github";

const BASE_URL = import.meta.env.VITE_GITHUB_API_URL;
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export async function searchRepositories(
  query: string,
  page: number,
  sort: string,
  order: string,
  signal?: AbortSignal
): Promise<SearchResponse> {
  const url = `${BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=12&sort=${sort}&order=${order}`;

  const headers: Record<string, string> = {};
  if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`;
  }

  const response = await fetch(url, { headers, signal });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
