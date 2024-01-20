import ChallengeSubmission from "../models/ChallengeSubmission";
import { useState } from "react";

interface ChallengeSubmissionProps {
    submission: ChallengeSubmission;
}


const ChallengeSubmissionStatus = ({ submission }: ChallengeSubmissionProps) => {

    const [currentSubmission, setCurrentSubmission] = useState<ChallengeSubmission | null>(submission);
    const statusColorMap = {
        "ready": "alert-info",
        "running": "alert-warning",
        "broken": "alert",
        "success": "alert-success",
        "failure": "alert-error",
    }
    const statusIconMap = {
        "ready": <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
        "running": <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
        "broken": <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        "success": <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        "failure": <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    }

    const downloadPythonFile = () => {
        if (!currentSubmission?.src_data) {
            return;
        }
        const blob = new Blob([currentSubmission.src_data], { type: "text/x-python" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "source.py";
        link.href = url;
        link.click();
    }

    const runChallengeSubmission = async () => {
        if (!currentSubmission?.id) {
            return;
        }
        try {
            const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken'));
            const csrfToken = csrfCookie ? csrfCookie.split('=')[1] : '';
            const runChallengeSubmissionResponse = await fetch(`/api/challenge-submission/${currentSubmission.id}/run/`, {
                method: 'PATCH', headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });
            const runChallengeSubmission = await runChallengeSubmissionResponse.json();
            updateSubmission(runChallengeSubmission);
        } catch (error) {
            console.error('Error fetching item:', error);
        }
    }

    const updateSubmission = (updatedSubmission: ChallengeSubmission) => {
        setCurrentSubmission(updatedSubmission);
    }

    if (!currentSubmission?.id) {
        return;
    }
    return (

        <div role="alert" className={`alert ${statusColorMap[currentSubmission.status]} gap-2 my-2 content-center flex flex-row justify-between`}>
            <div className="flex flex-row items-center gap-4">
                {statusIconMap[currentSubmission.status]}
                <div className="flex flex-col">
                    <span>Creation Date: {new Date(currentSubmission.creation_date).toISOString().replace('T', ' ').substring(0, 19)}</span>
                    <span>Status: {currentSubmission.status.toUpperCase()}</span>

                </div>
            </div>
            <div className="flex flex-row gap-2 content-center">
                <button className="btn btn-sm w-20" onClick={runChallengeSubmission}>Run</button>
                <button className="btn btn-sm w-20" onClick={downloadPythonFile}>Source</button>
            </div>
        </div>


    )
}

export default ChallengeSubmissionStatus