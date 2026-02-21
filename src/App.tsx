import { useEffect, useState } from "react";
import { searchRepositories } from "./api/github";
import type { Repository } from "./types/github";
import SearchFilters from "./components/SearchFilters";
import RepoList from "./components/RepoList";
import Pagination from "./components/reusable/Pagination";
import "./style.css";

interface SearchParams {
  query: string;
  sort: string;
}

function App() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    sort: "",
  });

  const [repos, setRepos] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const searchQuery =
          searchParams.query.trim() || "stars:>100";
        const searchSort =
          searchParams.sort || "stars";

        const data = await searchRepositories(
          searchQuery,
          page,
          searchSort,
          "desc",
          controller.signal
        );

        setRepos(data.items);
        setTotal(data.total_count);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [searchParams, page]);

  const totalPages = Math.ceil(total / 12);

  const handleSearch = () => {
    setPage(1);
    setSearchParams({
      query,
      sort,
    });
  };

  const handleReset = () => {
    setQuery("");
    setSort("");
    setPage(1);
    setSearchParams({
      query: "",
      sort: "",
    });
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
