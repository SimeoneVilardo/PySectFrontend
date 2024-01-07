import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import Challenge from '../models/Challenge';
import '../styles/challenge_details.css'
import '../styles/challenge_upload.css'
import "../styles/challenge_presentation.css"
import ChallengeSubmission from '../models/ChallengeSubmission';
import Spinner from '../components/Spinner';

const ChallengeDetails = () => {
  let { challengeId } = useParams();

  useEffect(() => {
    console.log("set body class");
    document.body.setAttribute('class', 'challenge-details-body');
  }, []);

  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

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

  const updateSubmission = (updatedSubmission: ChallengeSubmission) => {
    setChallenge(prevChallenge => {
      if (prevChallenge) {
        return {
          ...prevChallenge,
          challenge_submissions: prevChallenge.challenge_submissions.map(submission =>
            submission.id === updatedSubmission.id
              ? updatedSubmission
              : submission
          )
        };
      } else {
        return prevChallenge;
      }
    });
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const acceptedFile: File = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', acceptedFile);
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken'));
    const csrfToken = csrfCookie ? csrfCookie.split('=')[1] : '';
    const newChallengeSubmissionResponse = await fetch(`/api/challenge-submission/${challengeId}/`, {
      method: 'POST', body: formData, headers: {
        'X-CSRFToken': csrfToken
      }
    });
    const newChallengeSubmission = await newChallengeSubmissionResponse.json();
    addSubmission(newChallengeSubmission);
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource('/api/notification/challenge-submission-update');

    // attaching a handler to receive message events
    eventSource.onmessage = async (event) => {
      console.log(event.data);
      const challengeSubmissionResponse = await fetch(`/api/challenge-submission/${event.data}/`, {
        method: 'GET'
      });
      const updatedChallengeSubmission = await challengeSubmissionResponse.json();
      console.log(updatedChallengeSubmission);
      updateSubmission(updatedChallengeSubmission);
    };

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, []);

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
      setLoading(false);
    };
    fetchChallenge();
  }, [challengeId]);

  const getFormattedDate = (creation_date: string): string => {
    const date = new Date(creation_date)
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
    return formattedDate;
  }

  const downloadPythonFile = (challengeSubmission: ChallengeSubmission) => {
    const blob = new Blob([challengeSubmission.src_data], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "source.py";
    link.href = url;
    link.click();
  }

  const runChallengeSubmission = async (challengeSubmission: ChallengeSubmission) => {
    try {
      const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken'));
      const csrfToken = csrfCookie ? csrfCookie.split('=')[1] : '';
      const runChallengeSubmissionResponse = await fetch(`/api/challenge-submission/${challengeSubmission.id}/run/`, {
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

  const parseInputSample = (inputSample: string | undefined): string => {
    if (!inputSample) {
      return "";
    }
    let inputSampleJson = null
    try {
      inputSampleJson = JSON.parse(inputSample);
    }
    catch (e) {
      return "<ERROR: invalid JSON>";
    }
    if (!Array.isArray(inputSampleJson)) {
      return "<ERROR: Not an array>";
    }
    let result = "";
    inputSampleJson.forEach((innerArr: string[]) => {
      result += innerArr.join('\n') + '\n\n';
    });
    return result.trim();
  }

  const details = (challengeSubmission: ChallengeSubmission) => {
    let formattedCreationDate = getFormattedDate(challengeSubmission.creation_date)
    return (<div>
      <p><strong>STATUS: {challengeSubmission.status}</strong></p>
      <p>CREATION DATE: {formattedCreationDate}</p>
      {challengeSubmission.status === 'failure' && <p>ERROR: {challengeSubmission.error}</p>}
    </div>)
  }

  const infoAlert = (challengeSubmission: ChallengeSubmission) => {
    return (<div className="content">
      <div className="icon">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="50" rx="25" fill="white" />
          <path d="M27 22H23V40H27V22Z" fill="#006CE3" />
          <path d="M25 18C24.2089 18 23.4355 17.7654 22.7777 17.3259C22.1199 16.8864 21.6072 16.2616 21.3045 15.5307C21.0017 14.7998 20.9225 13.9956 21.0769 13.2196C21.2312 12.4437 21.6122 11.731 22.1716 11.1716C22.731 10.6122 23.4437 10.2312 24.2196 10.0769C24.9956 9.92252 25.7998 10.0017 26.5307 10.3045C27.2616 10.6072 27.8864 11.1199 28.3259 11.7777C28.7654 12.4355 29 13.2089 29 14C29 15.0609 28.5786 16.0783 27.8284 16.8284C27.0783 17.5786 26.0609 18 25 18V18Z" fill="#006CE3" />
        </svg>
      </div>
      <div>
        {details(challengeSubmission)}
      </div>
      <div className='run-btn-container'>
        <button className="alert-btn ready-btn" role="button" onClick={() => runChallengeSubmission(challengeSubmission)}>Run</button>
        <button className="alert-btn ready-btn" role="button" onClick={() => downloadPythonFile(challengeSubmission)}>Source Code</button>
      </div>
    </div>)
  }

  const successAlert = (challengeSubmission: ChallengeSubmission) => {
    return (<div className="content">
      <div className="icon">
        <svg width="50" height="50" id="Layer_1" version="1.1" viewBox="0 0 128 128" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle fill="#fff" cx="64" cy="64" r="64" /></g><g><path fill="#3EBD61" d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z" /></g></svg>
      </div>
      <div>
        {details(challengeSubmission)}
      </div>
      <div className='run-btn-container'>
        <button className="alert-btn success-btn" role="button" onClick={() => downloadPythonFile(challengeSubmission)}>Source Code</button>
      </div>
    </div>)
  }

  const dangerAlert = (challengeSubmission: ChallengeSubmission) => {
    return (<div className="content">
      <div className="icon">
        <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z" /></svg>
      </div>
      <div>
        {details(challengeSubmission)}
      </div>
      <div className='run-btn-container'>
        <button className="alert-btn danger-btn" role="button" onClick={() => downloadPythonFile(challengeSubmission)}>Source Code</button>
      </div>
    </div>)
  }

  const warningAlert = (challengeSubmission: ChallengeSubmission) => {
    return (<div className="content">
      <div className="icon">
        <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z" /></svg>
      </div>
      <div>
        {details(challengeSubmission)}
        <p>
          INFO: The challenge submission is being initialized, please wait.
        </p>
      </div>
      <div className='run-btn-container'>
        <button className="alert-btn warning-btn" role="button" onClick={() => downloadPythonFile(challengeSubmission)}>Source Code</button>
      </div>
    </div>)
  }

  const inactiveAlert = (challengeSubmission: ChallengeSubmission) => {
    return (<div className="content">
      <div className="icon">
        <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z" /></svg>
      </div>
      <div>
        {details(challengeSubmission)}
        <p>
          INFO: Cannot initialize the challenge submission. Please contact the administrator.
        </p>
      </div>
      <div className='run-btn-container'>
        <button className="alert-btn inactive-btn" role="button" onClick={() => downloadPythonFile(challengeSubmission)}>Source Code</button>
      </div>
    </div>)
  }

  const runningAlert = (challengeSubmission: ChallengeSubmission) => {
    return (<div className="content">
      <div className="icon">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="50" rx="25" fill="white" />
          <path d="M27 22H23V40H27V22Z" fill="#800080" />
          <path d="M25 18C24.2089 18 23.4355 17.7654 22.7777 17.3259C22.1199 16.8864 21.6072 16.2616 21.3045 15.5307C21.0017 14.7998 20.9225 13.9956 21.0769 13.2196C21.2312 12.4437 21.6122 11.731 22.1716 11.1716C22.731 10.6122 23.4437 10.2312 24.2196 10.0769C24.9956 9.92252 25.7998 10.0017 26.5307 10.3045C27.2616 10.6072 27.8864 11.1199 28.3259 11.7777C28.7654 12.4355 29 13.2089 29 14C29 15.0609 28.5786 16.0783 27.8284 16.8284C27.0783 17.5786 26.0609 18 25 18V18Z" fill="#800080" />
        </svg>
      </div>
      <div>
        {details(challengeSubmission)}
        INFO: The challenge submission is being evaulated, please wait.
      </div>
      <div className='run-btn-container'>
        <button className="alert-btn running-btn" role="button" onClick={() => downloadPythonFile(challengeSubmission)}>Source Code</button>
      </div>
    </div>)
  }

  let renderAlertMap = { "running": runningAlert, "broken": inactiveAlert, "not_ready": warningAlert, "failure": dangerAlert, "success": successAlert, "ready": infoAlert }
  let statusMap = { "running": "running", "broken": "inactive", "not_ready": "warning", "failure": "danger", "success": "success", "ready": "info" }

  if (loading) {
    return (<Spinner />)
  }

  return (
    <div className="challenge-details-container">
      <div className="challenge-presentation-card">
        <h1>{challenge?.name}</h1>
        <p className='challenge-detail-line'><strong>Description:</strong> {challenge?.description}</p>
        <p className='challenge-detail-line'><strong>Time limit:</strong> {challenge?.time_limit}</p>
        <p className='challenge-detail-line'><strong>Memory limit:</strong> {challenge?.memory_limit}</p>
        <p className='challenge-detail-line'><strong>Points:</strong> {challenge?.points}</p>
        <p className='challenge-detail-line'><strong>Input sample:</strong></p>
        <code>
          <pre>
            {parseInputSample(challenge?.input_sample)}
          </pre>
        </code>
        <p className='challenge-detail-line'><strong>Output sample:</strong></p>
        <code>
          <pre>
            {challenge?.output_sample}
          </pre>
        </code>
        {challenge?.challenge_submissions.some(submission => submission.status === 'success')
          ? <p>Challenge completed</p>
          : <div className='challenge-upload-container'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              }
            </div>
          </div>
        }
      </div>
      <div className='alerts'>
        {challenge?.challenge_submissions.sort((a, b) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime()).map((challengeSubmission) => (
          <div key={challengeSubmission.id} className={`${statusMap[challengeSubmission.status]} alert`}>
            {renderAlertMap[challengeSubmission.status](challengeSubmission)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChallengeDetails