import { useEffect, useState } from "react";
import ChallengeHomeCard from "../components/ChallengeHomeCard";
import Challenge from "../models/Challenge";
import Spinner from "../components/Spinner";
import { fetchApi } from "../utils/fetchApi";
import Pagination from "../models/Pagination";
import Paginator from "../components/Paginator";

const PAGE_SIZE = 8;
const NewChallenges = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [pageCount, setPageCount] = useState<number>(0);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filterPoints, setFilterPoints] = useState<number | string>("All");

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const fetchChallenges = async (page: number): Promise<Pagination<Challenge>> => {
    const query = {
      is_completed: false,
      page_size: PAGE_SIZE,
      page: page,
      ...(Number.isInteger(filterPoints) ? { points: filterPoints } : {})
    };
    return await fetchApi({
      url: `/api/challenges`, query: query
    });
  };

  useEffect(() => {
    const innerFetchChallenges = async () => {
      try {
        const challenges: Pagination<Challenge> = await fetchChallenges(page);
        setPageCount(Math.ceil(challenges.count / PAGE_SIZE));
        setChallenges(challenges.results);
      } finally {
        setLoading(false);
      }
    };
    innerFetchChallenges();
  }, [page, filterPoints]);

  if (isLoading) {
    return <Spinner className="text-primary size-24"></Spinner>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center my-4 mx-8 gap-6">
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Filters
          </div>
          <div className="collapse-content">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Points</span>
              </div>
              <select className="select select-primary select-bordered" value={filterPoints} onChange={e => setFilterPoints(parseInt(e.target.value))}>
                <option selected>All</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center my-4 mx-8 gap-6">
        {challenges.map((challenge) => (
          <ChallengeHomeCard key={challenge.id} challenge={challenge}></ChallengeHomeCard>
        ))}
      </div>
      <div className="flex flex-wrap justify-center my-4 mx-8 gap-6">
        <Paginator currentPage={page} totalPages={pageCount} onPageChange={onPageChange}></Paginator>
      </div>
    </>
  );
};

export default NewChallenges;
