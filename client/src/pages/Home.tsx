import { useEffect, useState, useMemo } from "react";
import ChallengeHomeCard from "../components/ChallengeHomeCard";
import Challenge from "../models/Challenge";
import Spinner from "../components/Spinner";
import { fetchApi } from "../utils/fetchApi";

const Home = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const completedChallenges = useMemo(
    () => challenges.filter((challenge: Challenge) => challenge.is_completed),
    [challenges]
  );

  const uncompletedChallenges = useMemo(
    () => challenges.filter((challenge: Challenge) => !challenge.is_completed),
    [challenges]
  );

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const fetchedChallenges = await fetchApi({ url: "/api/challenges/", method: "GET" });
        setChallenges(fetchedChallenges);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  if (isLoading) {
    return <Spinner className="text-primary size-24"></Spinner>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center my-4 gap-4">
        <p className="text-3xl"> New Challenges</p>
      </div>
      <div className="flex flex-wrap justify-center my-4 mx-8 gap-4">
        {uncompletedChallenges.map((challenge) => (
          <ChallengeHomeCard key={challenge.id} challenge={challenge}></ChallengeHomeCard>
        ))}
      </div>
      {completedChallenges.length > 0 && (
        <>
          <div className="divider text-3xl my-16 mb-8"> Completed Challenges</div>
          <div className="flex flex-wrap justify-center my-4 mx-8 gap-4">
            {completedChallenges.map((challenge) => (
              <ChallengeHomeCard key={challenge.id} challenge={challenge}></ChallengeHomeCard>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
