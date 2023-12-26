import { useState, useEffect } from 'react';
import Challenge from '../models/Challenge';
import '../styles/home.css'
import { Link } from 'react-router-dom';

const Home = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    useEffect(() => {
        console.log("set body class");
        document.body.setAttribute('class', 'home-body');
    }, []);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                // Fetch data from your API or any other source
                const response = await fetch('/api/challenge/');
                const challengesJson = await response.json();

                // Update state with the fetched data
                setChallenges(challengesJson);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        // Call the fetchItems function when the component mounts
        fetchChallenges();
    }, []);

    return (
        <div className="home-container">
            <h1>Challenges</h1>
            <div className="ag-format-container">
                <div className="ag-courses_box">

                    {challenges.map((challenge) => (
                        <div key={challenge.id} className="ag-courses_item">
                            <Link to={`/challenge/${challenge.id}`} className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>

                                <div className="ag-courses-item_title">
                                    {challenge.name}
                                </div>
                            </Link>


                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}

export default Home