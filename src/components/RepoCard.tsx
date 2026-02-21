import type { Repository } from "../types/github";
import { Star, GitFork, Code2 } from "lucide-react";
import { getRelativeTime } from "../utils/date";

interface Props {
  repo: Repository;
}

export default function RepoCard({
  repo
}: Props) {
  const handleClick = () => {
    window.open(repo.html_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="repo-card"
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
      }}
    >
      <div className="repo-content">
        <h3 className="repo-title">{repo.name}</h3>

        <p className="repo-description">
          {repo.description || "説明はありません。"}
        </p>
      </div>

      <div className="repo-footer">
        <div className="repo-meta">
          <span>
            <Star size={14} /> {repo.stargazers_count}
          </span>

          <span>
            <GitFork size={14} /> {repo.forks_count}
          </span>

          {repo.language && 
            <span>
              <Code2 size={14} /> {repo.language}
            </span>
          }
        </div>

        <div className="repo-actions">
          <span className="repo-date">
            {getRelativeTime(repo.updated_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
