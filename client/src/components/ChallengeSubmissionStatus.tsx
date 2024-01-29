import { useState } from "react";
import Submission from "../models/Submission";
import { fetchApi } from "../utils/fetchApi";
import ReadyIcon from "./icons/ReadyIcon";
import RunningIcon from "./icons/RunningIcon";
import BrokenIcon from "./icons/BrokenIcon";
import SuccessIcon from "./icons/SuccessIcon";
import FailureIcon from "./icons/FailureIcon";

interface SubmissionProps {
  submission: Submission;
}

type Status = "ready" | "running" | "broken" | "success" | "failure";

const statusIconMap: Record<Status, JSX.Element> = {
  ready: <ReadyIcon />,
  running: <RunningIcon />,
  broken: <BrokenIcon />,
  success: <SuccessIcon />,
  failure: <FailureIcon />,
};

const StatusIcon = ({ status }: { status: Status }) => statusIconMap[status] || null;
const RunSubmissionButton = ({
  submission: { status },
  runChallengeSubmission,
  isRunning,
}: {
  submission: Submission;
  runChallengeSubmission: () => void;
  isRunning: boolean;
}) => {
  if (status !== "ready") return null;
  return (
    <button className="btn btn-sm w-20" onClick={runChallengeSubmission} disabled={isRunning}>
      Run
    </button>
  );
};

const statusColorMap = {
  ready: "alert-info",
  running: "alert-warning",
  broken: "alert bg-base-300",
  success: "alert-success",
  failure: "alert-error",
};

const SubmissionStatus = ({ submission }: SubmissionProps) => {
  const [isRunning, setRunning] = useState<boolean>(false);

  const downloadPythonFile = () => {
    const pythonFileBlob = new Blob([submission.src_data], {
      type: "text/x-python",
    });
    const url = URL.createObjectURL(pythonFileBlob);
    const link = document.createElement("a");
    link.download = "source.py";
    link.href = url;
    link.click();
  };

  const runChallengeSubmission = async () => {
    setRunning(true);
    try {
      await fetchApi({ url: `/api/challenges/submissions/${submission.id}/run/`, method: "PATCH" });
    } finally {
      setRunning(false);
    }
  };

  const formatDateToISO = (date: string): string => {
    return new Date(date).toISOString().replace("T", " ").substring(0, 19);
  };

  return (
    <div
      role="alert"
      className={`alert ${statusColorMap[submission.status]} gap-2 my-2 content-center flex flex-row justify-between`}
    >
      <div className="flex flex-row items-center gap-4">
        <StatusIcon status={submission.status} />
        <div className="flex flex-col">
          <p>{formatDateToISO(submission.creation_date)}</p>
          <p>Status: {submission.status.toUpperCase()}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2 content-center">
        <RunSubmissionButton
          submission={submission}
          runChallengeSubmission={runChallengeSubmission}
          isRunning={isRunning}
        />
        <button className="btn btn-sm w-20" onClick={downloadPythonFile}>
          Source
        </button>
      </div>
    </div>
  );
};

export default SubmissionStatus;
