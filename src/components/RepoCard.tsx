import type { Repository } from "../types/github";
import { Star, GitFork, Code2, Heart } from "lucide-react";

interface Props {
  repo: Repository;
  toggleFavorite: (repo: Repository) => void;
  isFavorite: boolean;
}

export default function RepoCard({
  repo,
  toggleFavorite,
  isFavorite,
}: Props) {
  return (
    <div className="repo-card">
      <div className="repo-content">
        <h3 className="repo-title">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo.full_name}
          </a>
        </h3>

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

          <span>
            <Code2 size={14} /> {repo.language || "不明"}
          </span>
        </div>

        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => toggleFavorite(repo)}
        >
          <Heart
            size={14}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
}
