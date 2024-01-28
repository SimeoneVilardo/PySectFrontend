import { useParams } from "react-router-dom";
import ChallengeDetailCard from "../components/ChallengeDetailCard";
import SubmissionStatus from "../components/ChallengeSubmissionStatus";
import Challenge from "../models/Challenge";
import { useEffect, useRef, useState } from "react";
import Submission from "../models/Submission";
import LoadingButton from "../components/LoadingButton";
import Spinner from "../components/Spinner";
import Pagination from "../models/Pagination";
import { toast } from "react-toastify";
import { fetchApi } from "../utils/fetchApi";

const Submissions = () => {
  let { challengeId } = useParams();

  const [isUploading, setUploading] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  //const [pageNumber, setPageNumber] = useState<Number>(1);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource("/api/notification/challenge-submission-update");

    // attaching a handler to receive message events
    eventSource.onmessage = async (event) => {
      const updatedChallengeSubmission = await fetchApi({
        url: `/api/challenges/${challengeId}/submissions/${event.data}/`,
      });
      addOrUpdateSubmission(updatedChallengeSubmission);
    };

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, []);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challenge = await fetchApi({ url: `/api/challenges/${challengeId}/` });
        const submissions: Pagination<Submission> = await fetchApi({
          url: `/api/challenges/${challengeId}/submissions?sort=-creation_date&page=1`,
        });
        setChallenge(challenge);
        setSubmissions(submissions.results);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [challengeId]);

  const handleUpload = async () => {
    if (fileInput.current && fileInput?.current?.files?.length && fileInput?.current?.files?.length > 0) {
      const file = fileInput.current.files[0];
      await uploadSubmissionFile(file);
    }
  };

  const addOrUpdateSubmission = (newSubmission: Submission) => {
    setSubmissions((prevSubmissions) => {
      const existingSubmissionIndex = prevSubmissions.findIndex((submission) => submission.id === newSubmission.id);
      if (existingSubmissionIndex !== -1) {
        // Update existing submission
        const newSubmissions = [...prevSubmissions];
        newSubmissions[existingSubmissionIndex] = newSubmission;
        return newSubmissions;
      } else {
        // Add new submission
        return [newSubmission, ...prevSubmissions];
      }
    });
  };

  const uploadSubmissionFile = async (submissionFile: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", submissionFile);
    try {
      await fetchApi({ url: `/api/challenges/${challengeId}/submissions/`, method: "POST", body: formData });
    } finally {
      setUploading(false);
    }
  };

  const renderSubmissions = () => {
    return submissions.map((submission) => (
      <SubmissionStatus key={submission.id} submission={submission}></SubmissionStatus>
    ));
  };

  const renderUploadButton = () => {
    if (challenge?.is_completed) {
      return <></>;
    }
    return (
      <>
        <input type="file" ref={fileInput} className="file-input file-input-bordered file-input-lg w-full" />
        <LoadingButton isLoading={isUploading} className="btn btn-outline btn-primary btn-lg" onClick={handleUpload}>
          Upload
        </LoadingButton>
      </>
    );
  };

  if (isLoading) {
    return <Spinner className="text-primary size-24"></Spinner>;
  }

  if (!challenge) {
    return <h1>Error</h1>;
  }

  return (
    <div className="m-4">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <ChallengeDetailCard challenge={challenge}></ChallengeDetailCard>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="lg:w-1/2">
          <div className="flex lg:flex-row flex-col gap-2">{renderUploadButton()}</div>
          {renderSubmissions()}
        </div>
      </div>
    </div>
  );
};

export default Submissions;
