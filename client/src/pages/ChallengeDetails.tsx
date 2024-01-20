import { useParams } from "react-router-dom";
import ChallengeDetailCard from "../components/ChallengeDetailCard"
import ChallengeSubmissionStatus from "../components/ChallengeSubmissionStatus"
import Challenge from "../models/Challenge";
import { useEffect, useRef, useState } from "react";
import ChallengeSubmission from "../models/ChallengeSubmission";
import LoadingButton from "../components/LoadingButton";


const ChallengeDetails = () => {
  let { challengeId } = useParams();

  const [isUploading, setUploading] = useState<boolean>(false);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`/api/challenges/${challengeId}`, { method: 'GET' });
        const challengeJson = await response.json();
        setChallenge(challengeJson);
        console.log(challengeJson);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
      //setLoading(false);
    };
    fetchChallenge();
  }, [challengeId]);

  const addSubmission = (newSubmission: ChallengeSubmission) => {
    setChallenge(prevChallenge => {
      if (prevChallenge) {
        return {
          ...prevChallenge,
          challenge_submissions: [...prevChallenge.challenge_submissions, newSubmission]
        };
      } else {
        return prevChallenge;
      }
    });
  }

  const handleUpload = async () => {
    if (fileInput.current && fileInput?.current?.files?.length && fileInput?.current?.files?.length > 0) {
      const file = fileInput.current.files[0];
      await uploadSubmissionFile(file);
    }
  };


  const uploadSubmissionFile = async (submissionFile: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', submissionFile);
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken'));
    const csrfToken = csrfCookie ? csrfCookie.split('=')[1] : '';
    const newChallengeSubmissionResponse = await fetch(`/api/challenge-submission/${challengeId}/`, {
      method: 'POST', body: formData, headers: {
        'X-CSRFToken': csrfToken
      }
    });
    if (!newChallengeSubmissionResponse.ok) {
      if (newChallengeSubmissionResponse.status >= 400 && newChallengeSubmissionResponse.status < 500) {
        const newChallengeSubmissionError = await newChallengeSubmissionResponse.json();
        console.log(newChallengeSubmissionError);
        //toast.error(newChallengeSubmissionError.error, { theme: "colored", position: "bottom-center" });
      }
      else {
        //toast.error("Error uploading file", { theme: "colored", position: "bottom-center" });
      }
      setUploading(false);
      return;
    }
    const newChallengeSubmission = await newChallengeSubmissionResponse.json();
    addSubmission(newChallengeSubmission);
    setUploading(false);
  }

  const renderSubmissions = () => {
    if (!challenge) {
      return <></>
    }
    return challenge.challenge_submissions.map(submission =>
      <ChallengeSubmissionStatus key={submission.id} submission={submission}></ChallengeSubmissionStatus>
    );
  }

  if (!challenge) {
    return <></>
  }

  return (
    <div className="m-4">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <ChallengeDetailCard challenge={challenge}></ChallengeDetailCard>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="lg:w-1/2">
          <div className="flex lg:flex-row flex-col gap-2">
            <input type="file" ref={fileInput} className="file-input file-input-bordered file-input-lg w-full" />
            <LoadingButton isLoading={isUploading} className="btn btn-outline btn-primary btn-lg" onClick={handleUpload}>Upload</LoadingButton>
          </div>
          {renderSubmissions()}
        </div>
      </div>
    </div>
  )
}

export default ChallengeDetails