import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);

  const onEventSourceMessage = async (event: MessageEvent) => {
    const updatedChallengeSubmission = await fetchApi({
      url: `/api/challenges/${challengeId}/submissions/${event.data}/`,
    });
    addOrUpdateSubmission(updatedChallengeSubmission);
  };

  const fetchSubmissions = async () => {
    return await fetchApi({
      url: `/api/challenges/${challengeId}/submissions?sort=-creation_date&page=1`,
    });
  };

  useEffect(() => {
    const eventSource = new EventSource("/api/notification/challenge-submission-update");
    eventSource.onmessage = onEventSourceMessage;
    eventSource.onerror = () => {
      toast.error("Error in the notifications server connection", { theme: "colored", position: "bottom-center" });
    };
    return () => {
      if (eventSource.readyState == EventSource.OPEN) {
        eventSource.close();
      }
    };
  }, []);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challenge = await fetchApi({ url: `/api/challenges/${challengeId}/` });
        const submissions: Pagination<Submission> = await fetchSubmissions();
        setChallenge(challenge);
        setSubmissions(submissions.results);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [challengeId]);

  const handleUpload = async () => {
    const file = fileInput.current?.files?.[0];
    if (!file) {
      toast.error("File not found", { theme: "colored", position: "bottom-center" });
      return;
    }
    await uploadSubmissionFile(file);
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

  const addOrUpdateSubmission = (newSubmission: Submission) => {
    setSubmissions((prevSubmissions) => {
      const existingSubmissionIndex = prevSubmissions.findIndex((submission) => submission.id === newSubmission.id);
      if (existingSubmissionIndex !== -1) {
        const newSubmissions = [...prevSubmissions];
        newSubmissions[existingSubmissionIndex] = newSubmission;
        return newSubmissions;
      } else {
        return [newSubmission, ...prevSubmissions];
      }
    });
  };

  const renderSubmissions = () => {
    return submissions.map((submission) => (
      <SubmissionStatus key={submission.id} submission={submission}></SubmissionStatus>
    ));
  };

  const renderUploadButton = () => {
    if (challenge?.is_completed) return null;
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
    navigate("/not-found");
    return null;
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
