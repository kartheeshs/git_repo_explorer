interface Props {
  page: number;
  totalPages: number;
  setPage: (v: number) => void;
}

export default function Pagination({ page, totalPages, setPage }: Props) {
  const maxVisible = 5;

  const getPages = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(2, page - half);
    let end = Math.min(totalPages - 1, page + half);

    if (page - 1 <= half) {
      start = 2;
      end = Math.min(totalPages - 1, maxVisible);
    }
    if (totalPages - page <= half) {
      start = Math.max(2, totalPages - maxVisible + 1);
      end = totalPages - 1;
    }

    pages.push(1);

    if (start > 2) {
      pages.push("…");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("…");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="prev-next"
      >
        前へ
      </button>

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            onClick={() => setPage(p)}
            className={`page-number ${p === page ? "active" : ""}`}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className="ellipsis">
            {p}
          </span>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="prev-next"
      >
        次へ
      </button>
    </div>
  );
}
