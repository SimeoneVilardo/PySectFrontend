import { useParams } from "react-router-dom";
import ChallengeDetailCard from "../components/ChallengeDetailCard"
import SubmissionStatus from "../components/ChallengeSubmissionStatus"
import Challenge from "../models/Challenge";
import { useEffect, useRef, useState } from "react";
import Submission from "../models/Submission";
import LoadingButton from "../components/LoadingButton";
import Spinner from "../components/Spinner";


const Submissions = () => {
  let { challengeId } = useParams();

  const [isUploading, setUploading] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeResponse = await fetch(`/api/challenges/${challengeId}`, { method: 'GET' });
        const challengeJson = await challengeResponse.json();
        const submissionsResponse = await fetch(`/api/challenges/${challengeId}/submissions?sort=-creation_date`, { method: 'GET' });
        const submissionsJson = await submissionsResponse.json();
        console.log("challengeJson", challengeJson);
        console.log("submissionsJson", submissionsJson);
        setChallenge(challengeJson);
        setSubmissions(submissionsJson);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
      setLoading(false);
    };
    fetchChallenge();
  }, [challengeId]);

  const addSubmission = (newSubmission: Submission) => {
    setSubmissions([...submissions, newSubmission]);
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
    const submissionResponse = await fetch(`/api/challenges/${challengeId}/submissions/`, {
      method: 'POST', body: formData, headers: {
        'X-CSRFToken': csrfToken
      }
    });
    if (!submissionResponse.ok) {
      if (submissionResponse.status >= 400 && submissionResponse.status < 500) {
        const newChallengeSubmissionError = await submissionResponse.json();
        console.log(newChallengeSubmissionError);
        //toast.error(newChallengeSubmissionError.error, { theme: "colored", position: "bottom-center" });
      }
      else {
        //toast.error("Error uploading file", { theme: "colored", position: "bottom-center" });
      }
      setUploading(false);
      return;
    }
    const newChallengeSubmission = await submissionResponse.json();
    addSubmission(newChallengeSubmission);
    setUploading(false);
  }

  const renderSubmissions = () => {
    return submissions.map(submission =>
      <SubmissionStatus key={submission.id} submission={submission}></SubmissionStatus>
    );
  }

  if (isLoading) {
    return (<Spinner className="text-primary size-24"></Spinner>)
  }

  if (!challenge) {
    return <h1>Error</h1>
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

export default Submissions