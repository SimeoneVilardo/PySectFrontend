import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Challenge from '../models/Challenge';
import '../styles/challengeSubmission.css'

const ChallengeDetails = () => {
    let { challengeId } = useParams();

    const [challenge, setChallenge] = useState<Challenge | null>(null);

    let get_challenge_submission_class = (status: string) => {
        console.log(status);
        if (status == "success") {
            return "success";
        }
        if (status == "failure") {
            return "failure";
        }
        if (status == "not_ready") {
            return "not-ready";
        }
        if (status == "broken") {
            return "broken";
        }
        return ""
    }

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
        <>
            <h1>{challenge?.name}</h1>
            <h3>{challenge?.description}</h3>
            <strong>Challenge Submissions</strong>
            <ol>
                {challenge?.challenge_submissions.map((challenge_submission) => (
                    <li key={challenge_submission.id} className={get_challenge_submission_class(challenge_submission.status)}>
                        <strong>{challenge_submission.creation_date}</strong>
                        <p>STATUS: {challenge_submission.status}</p>
                        {challenge_submission.status === 'failure' && <p>ERROR: {challenge_submission.error}</p>}
                    </li>
                ))}
            </ol>
        </>
    )
}

export default ChallengeDetails