import { Search, RotateCcw } from "lucide-react";
import "../style.css";

interface Props {
  query: string;
  setQuery: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

export default function SearchFilters({
  query,
  setQuery,
  sort,
  setSort,
  onSearch,
  onReset,
}: Props) {
  return (
    <div className="search-filters">
      <div className="filter-controls">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="リポジトリを検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch();
            }}
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">ベストマッチ</option>
          <option value="stars">スター順</option>
          <option value="forks">フォーク順</option>
          <option value="updated">最近更新</option>
        </select>
      </div>

      <div className="filter-actions">
        <button className="search-btn" onClick={onSearch}>
          <Search size={16} />
          検索
        </button>

        <button className="reset-btn" onClick={onReset}>
          <RotateCcw size={16} />
          リセット
        </button>
      </div>

    </div>
  );
}
