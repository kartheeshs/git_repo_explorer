import { useEffect, useState } from "react";
import { searchRepositories } from "./api/github";
import type { Repository } from "./types/github";
import { useDebounce } from "./hooks/useDebounce";
import SearchFilters from "./components/SearchFilters";
import RepoList from "./components/RepoList";
import Pagination from "./components/reusable/Pagination";
import "./style.css";

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const searchQuery = debouncedQuery.trim() || "stars:>100";
        const searchSort = sort || "stars";

        const data = await searchRepositories(
          searchQuery,
          page,
          searchSort,
          "desc"
        );

        setRepos(data.items);
        setTotal(data.total_count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, page, sort]);


  const totalPages = Math.ceil(total / 12);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">リポジトリエクスプローラー</h1>
      </div>
      <div className="filters">
        <h4 className="title">フィルター</h4>
        <SearchFilters
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
        />
      </div>

      <div className="repo-list">
        <RepoList
          loading={loading}
          repos={repos}
        />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
