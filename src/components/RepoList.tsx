import type { Repository } from "../types/github";
import RepoCard from "./RepoCard";
import Loader from "./reusable/Loader";

interface Props {
  loading: boolean;
  repos: Repository[];
}

export default function RepoList({
  loading,
  repos,
}: Props) {
  if (loading) {
    return <Loader />;
  }

  if (!loading && repos.length === 0) {
    return <p className="empty">リポジトリが見つかりませんでした。</p>;
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          repo={repo}
        />
      ))}
    </div>
  );
}
