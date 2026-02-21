import { useEffect, useState } from "react";
import { searchRepositories } from "./api/github";
import type { Repository } from "./types/github";
import SearchFilters from "./components/SearchFilters";
import RepoList from "./components/RepoList";
import Pagination from "./components/reusable/Pagination";
import "./style.css";

function App() {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const searchQuery = query.trim() || "stars:>100";
        const searchSort = sort || "stars";

        const data = await searchRepositories(
          searchQuery,
          page,
          searchSort,
          "desc",
          controller.signal
        );

        setRepos(data.items);
        setTotal(data.total_count);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [trigger, page]);

  const totalPages = Math.ceil(total / 12);

  const handleSearch = () => {
    setPage(1);
    setTrigger((prev) => prev + 1);
  };

  const handleReset = () => {
    setQuery("");
    setSort("");
    setPage(1);
    setTrigger((prev) => prev + 1);
  };

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
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>

      <div className="repo-list">
        <RepoList loading={loading} repos={repos} />

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
