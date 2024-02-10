import { useEffect, useState } from "react";
import ChallengeHomeCard from "../components/ChallengeHomeCard";
import Challenge from "../models/Challenge";
import Spinner from "../components/Spinner";
import { fetchApi } from "../utils/fetchApi";
import Pagination from "../models/Pagination";
import Paginator from "../components/Paginator";
import ChallengeFilters from "../components/ChallengeFilters";
import ChallengeFiltersData from "../models/ChallengeFiltersData";

const PAGE_SIZE = 12;
const NewChallenges = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [pageCount, setPageCount] = useState<number>(0);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [challengeFiltersData, setCallengeFiltersData] = useState<ChallengeFiltersData | null>(null);

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onFiltersChange = (challengeFiltersData: ChallengeFiltersData) => {
    setCallengeFiltersData(challengeFiltersData);
  };

  const fetchChallenges = async (page: number, challengeFiltersData: ChallengeFiltersData | null): Promise<Pagination<Challenge>> => {
    if (challengeFiltersData != null && challengeFiltersData.points != null)
      return await fetchApi({ url: `/api/challenges?is_completed=false&points=${challengeFiltersData?.points}&page_size=${PAGE_SIZE}&page=${page}` });
    else
      return await fetchApi({ url: `/api/challenges?is_completed=false&page_size=${PAGE_SIZE}&page=${page}` });
  };

  useEffect(() => {
    const innerFetchChallenges = async () => {
      try {
        const challenges: Pagination<Challenge> = await fetchChallenges(page, challengeFiltersData);
        setPageCount(Math.ceil(challenges.count / PAGE_SIZE));
        setChallenges(challenges.results);
      } finally {
        setLoading(false);
      }
    };
    innerFetchChallenges();
  }, [page, challengeFiltersData]);

  if (isLoading) {
    return <Spinner className="text-primary size-24"></Spinner>;
  }

  return (
    <>
    
      <div className="flex flex-wrap justify-center my-4 mx-8 gap-6">
      <ChallengeFilters onFiltersChange={onFiltersChange}></ChallengeFilters>
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
