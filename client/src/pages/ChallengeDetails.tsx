import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Challenge from '../models/Challenge';
import '../styles/challengeSubmission.css'

const ChallengeDetails = () => {
    let { challengeId } = useParams();

    const [challenge, setChallenge] = useState<Challenge | null>(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await fetch(`/api/challenge/${challengeId}`);
                const challengeJson = await response.json();
                setChallenge(challengeJson);
                console.log(challengeJson);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchChallenge();
    }, [challengeId]);

    return (
        <ol style={{ "--length": "5" } as any} role="list">
            <li style={{ "--i": "5" } as any}>
                <h3>Receiving your benefit</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
            </li>
        </ol>
    )
}

export default ChallengeDetails