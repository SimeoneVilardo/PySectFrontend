import { useEffect, useState } from "react";
import ChallengeHomeCard from "../components/ChallengeHomeCard"
import Challenge from "../models/Challenge";
import Spinner from "../components/Spinner";

const Home = () => {

    const [isLoading, setLoading] = useState<boolean>(true);
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    const renderCompletedChallenges = challenges.filter((challenge: Challenge) => challenge.is_completed).map(c =>
        <ChallengeHomeCard key={c.id} challenge={c}></ChallengeHomeCard>
    );

    const renderUncompletedChallenges = challenges.filter((challenge: Challenge) => !challenge.is_completed).map(c =>
        <ChallengeHomeCard key={c.id} challenge={c}></ChallengeHomeCard>
    );

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                // Fetch data from your API or any other source
                const challengesResponse = await fetch('/api/challenges/', { method: 'GET' });
                if (!challengesResponse.ok) {
                    return;
                }
                const challengesJson = await challengesResponse.json();
                setChallenges(challengesJson);
            } catch (error) {
                console.error('Error fetching challenges:', error);
            }
            setLoading(false);
        };

        // Call the fetchItems function when the component mounts
        fetchChallenges();
    }, []);

    if (isLoading) {
        return (<Spinner className="text-primary size-24"></Spinner>)
    }


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