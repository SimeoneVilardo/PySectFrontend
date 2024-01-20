import { useEffect, useState } from "react";
import ChallengeHomeCard from "../components/ChallengeHomeCard"
import Challenge from "../models/Challenge";

const Home = () => {

    const [completedChallenges, setCompletedChallenges] = useState<Challenge[]>([]);
    const [uncompletedChallenges, setUncompletedChallenges] = useState<Challenge[]>([]);

    const renderCompletedChallenges = completedChallenges.map(c =>
        <ChallengeHomeCard key={c.id} challenge={c}></ChallengeHomeCard>
    );

    const renderUncompletedChallenges = uncompletedChallenges.map(c =>
        <ChallengeHomeCard key={c.id} challenge={c}></ChallengeHomeCard>
    );

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                // Fetch data from your API or any other source
                const challengesResponse = await fetch('/api/challenges/', { method: 'GET' });
                if (!challengesResponse.ok) {
                    console.log("Error fetching challenges");
                    return;
                }
                const challengesJson = await challengesResponse.json();
                console.log(challengesJson)
                const completedChallengesJson = challengesJson.filter((challenge: Challenge) =>
                    challenge.challenge_submissions.some(submission => submission.status === 'success')
                );
                const uncompletedChallengesJson = challengesJson.filter((challenge: Challenge) =>
                    challenge.challenge_submissions.every(submission => submission.status !== 'success')
                );
                setCompletedChallenges(completedChallengesJson);
                setUncompletedChallenges(uncompletedChallengesJson);
            } catch (error) {
                console.error('Error fetching challenges:', error);
            }
            //setLoading(false);
        };

        // Call the fetchItems function when the component mounts
        fetchChallenges();
    }, []);

    return (
        <>
            <div className="flex flex-wrap justify-center my-4 gap-4">
                <h1 className="text-4xl">New Challenges</h1>
            </div>
            <div className="flex flex-wrap justify-center my-4 gap-4">
                {renderUncompletedChallenges}
            </div>
            <div className="flex flex-wrap justify-center my-4 gap-4">
                {renderCompletedChallenges}
            </div>
        </>
    )
}

export default Home