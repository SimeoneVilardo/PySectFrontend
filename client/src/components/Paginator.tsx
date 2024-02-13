interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const scrollToTop = () => {
  window.scrollTo(0, 0);
};


const Paginator = ({ currentPage, totalPages, onPageChange }: PaginatorProps) => {
  const onNext = () => {
    onPageChange(currentPage + 1);
    scrollToTop();
  };
  
  const onPrev = () => {
    onPageChange(currentPage - 1);
    scrollToTop();
  };

  return (
    <div className="join">
      <button disabled={currentPage === 1} className="join-item btn" onClick={onPrev}>
        {"<"}
      </button>
      <button className="join-item btn">Page {currentPage}</button>
      <button
        disabled={currentPage === totalPages}
        className="join-item btn"
        onClick={onNext}
      >
        {">"}
      </button>
    </div>
  );
};

export default Paginator;
