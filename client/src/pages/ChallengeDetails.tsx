import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Challenge from '../models/Challenge';
import '../styles/challengeSubmission.css'

const ChallengeDetails = () => {
    var { challengeId } = useParams();

    const [challenge, setChallenge] = useState<Challenge | null>(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await fetch(`/api/challenge/${challengeId}`);
                const challengeJson = await response.json();
                setChallenge(challengeJson);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchChallenge();
    }, []);

    console.log(challenge)

    return (
        <ol style={{ "--length": "5" } as any} role="list">
            <li style={{ "--i": "5" } as any}>
                <h3>Receiving your benefit</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
            </li>
        </ol>
    )

    return (
        <>
            <h1>Name: {challenge?.name}</h1>
            <h1>Description: {challenge?.description}</h1>
            <h1>Points: {challenge?.points}</h1>
            <h1>Input Sample: {challenge?.input_sample}</h1>
            <h1>Output Sample: {challenge?.output_sample}</h1>
        </>
    )
}

export default ChallengeDetails