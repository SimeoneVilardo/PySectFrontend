interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginator = ({ currentPage, totalPages, onPageChange }: PaginatorProps) => {
  return (
    <div className="join">
      <button disabled={currentPage === 1} className="join-item btn" onClick={() => onPageChange(currentPage - 1)}>
        {"<"}
      </button>
      <button className="join-item btn">Page {currentPage}</button>
      <button
        disabled={currentPage === totalPages}
        className="join-item btn"
        onClick={() => onPageChange(currentPage + 1)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Paginator;
