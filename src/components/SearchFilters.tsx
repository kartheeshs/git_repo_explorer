import { Search } from "lucide-react";
import "../style.css";

interface Props {
  query: string;
  setQuery: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

export default function SearchFilters({
  query,
  setQuery,
  sort,
  setSort,
}: Props) {
  return (
    <div className="search-filters">
      <div className="search-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="リポジトリを検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
  );
}
