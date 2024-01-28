import { useEffect, useState } from "react";
import ChallengeHomeCard from "../components/ChallengeHomeCard";
import Challenge from "../models/Challenge";
import Spinner from "../components/Spinner";
import { fetchApi } from "../utils/fetchApi";

const Home = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const renderCompletedChallenges = challenges
    .filter((challenge: Challenge) => challenge.is_completed)
    .map((c) => <ChallengeHomeCard key={c.id} challenge={c}></ChallengeHomeCard>);

  const renderUncompletedChallenges = challenges
    .filter((challenge: Challenge) => !challenge.is_completed)
    .map((c) => <ChallengeHomeCard key={c.id} challenge={c}></ChallengeHomeCard>);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challenges = await fetchApi({ url: "/api/challenges/", method: "GET" });
        setChallenges(challenges);
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
      <div className="flex flex-wrap justify-center my-4 mx-8 gap-4">{renderUncompletedChallenges}</div>
      {renderCompletedChallenges.length > 0 && (
        <>
          <div className="divider text-3xl my-16 mb-8"> Completed Challenges</div>
          <div className="flex flex-wrap justify-center my-4 mx-8 gap-4">{renderCompletedChallenges}</div>
        </>
      )}
    </>
  );
};

export default Home;
