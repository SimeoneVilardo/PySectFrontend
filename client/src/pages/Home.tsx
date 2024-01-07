import { useState, useEffect } from 'react';
import Challenge from '../models/Challenge';
import '../styles/home.css'
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Home = () => {
    const [completedChallenges, setCompletedChallenges] = useState<Challenge[]>([]);
    const [uncompletedChallenges, setUncompletedChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("set body class");
        document.body.setAttribute('class', 'home-body');
    }, []);

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
            setLoading(false);
        };

        // Call the fetchItems function when the component mounts
        fetchChallenges();
    }, []);

    if (loading) {
        return (<Spinner />)
    }

    return (
        <div className="home-container">
            <h1>New Challenges</h1>
            <div className="ag-courses_box">
                {uncompletedChallenges.map((challenge) => (
                    <div key={challenge.id} className="ag-courses_item">
                        <Link to={`/challenge/${challenge.id}`} className="ag-courses-item_link">
                            <div className="ag-courses-item_bg ag-courses-item_bg-uncompleted"></div>
                            <div className="ag-courses-item_title">
                                {challenge.name}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <h1>Completed Challenges</h1>
            <div className="ag-courses_box">
                {completedChallenges.map((challenge) => (
                    <div key={challenge.id} className="ag-courses_item">
                        <Link to={`/challenge/${challenge.id}`} className="ag-courses-item_link">
                            <div className="ag-courses-item_bg ag-courses-item_bg-completed"></div>
                            <div className="ag-courses-item_title">
                                {challenge.name}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home