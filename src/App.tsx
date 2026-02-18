import { useEffect, useState } from "react";
import { searchRepositories } from "./api/github";
import type { Repository } from "./types/github";
import { useDebounce } from "./hooks/useDebounce";
import { useLocalStorage } from "./hooks/useLocalStorage";
import SearchFilters from "./components/SearchFilters";
import RepoList from "./components/RepoList";
import Pagination from "./components/reusable/Pagination";
import "./style.css";

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [favorites, setFavorites] = useLocalStorage<Repository[]>(
    "お気に入り",
    []
  );
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setRepos([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    searchRepositories(debouncedQuery, page, sort, "desc")
      .then((data) => {
        setRepos(data.items);
        setTotal(data.total_count);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedQuery, page, sort]);

  const toggleFavorite = (repo: Repository) => {
    const exists = favorites.find((f) => f.id === repo.id);
    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== repo.id));
    } else {
      setFavorites([...favorites, repo]);
    }
  };

  const totalPages = Math.ceil(total / 12);

  return (
    <div className="container">
      <h1>リポジトリエクスプローラー</h1>
      <SearchFilters
        query={query}
        setQuery={setQuery}
        sort={sort}
        setSort={setSort}
      />
      <RepoList
        loading={loading}
        repos={repos}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default App;
