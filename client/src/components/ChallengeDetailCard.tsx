import React from 'react';
import Challenge from "../models/Challenge";
import InputSampleIcon from "./icons/InputSampleIcon";
import MemoryIcon from "./icons/MemoryIcon";
import OutputSampleIcon from "./icons/OutputSampleIcon";
import PointsIcon from "./icons/PointsIcon";
import TimeIcon from "./icons/TimeIcon";

interface ChallengeDetailCardProps {
  challenge: Challenge;
}

const SampleData = ({ sample }: { sample: string[][] }) => {
  if (sample.length == 0) return <div className="collapse-content">Empty sample string</div>;
  if (!Array.isArray(sample) || sample.some((subArray) => !Array.isArray(subArray)))
    return <div className="collapse-content">Invalid sample format</div>;
  if (sample.every((subArray) => subArray.length < 1))
    return <div className="collapse-content">Empty sample array</div>;
  return (
    <div className="collapse-content">
      {sample.map((inputSampleGroup, index) => (
        <div key={index} className="bg-base-300 my-2 py-2 rounded-md">
          {inputSampleGroup.map((input, innerIndex) => (
            <pre className="overflow-x-auto" key={innerIndex}>
              <code className="ml-3">{input}</code>
            </pre>
          ))}
        </div>
      ))}
    </div>
  );
};

const SampleDetails = ({ title, icon, sample }: { title: string; icon: JSX.Element; sample: string[][] }) => {
  return (
    <details className="collapse border border-base-300 bg-base-200">
      <summary className="collapse-title text-xl font-medium">
        <div className="flex flex-row gap-4">
          <span>
            <i>{icon}</i>
          </span>
          {title}
        </div>
      </summary>
      <SampleData sample={sample} />
    </details>
  );
};

const ChallengePoints = (challenge: Challenge) => {
  const stars = [];
  for (let i = 1; i <= 10; i++) {
    stars.push(
      <input
        key={i}
        type="radio"
        name="points"
        className={`cursor-default animate-none bg-primary mask mask-star-2`}
        checked={challenge.points == i}
        readOnly
        disabled
      />
    );
  }
  return (
    <div className="card-actions justify-start items-center mt-2 gap-1">
      <PointsIcon />
      <h2>Points:</h2>
      <div className="rating rating-sm md:rating-md"> {stars}</div>
    </div>
  );
};

const ChallengeDetailCard = ({ challenge }: ChallengeDetailCardProps) => {
  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="divider">Introduction</div>
        <p className="font-bold">
          {challenge?.description.split('\r\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <ChallengePoints {...challenge} />
        <div className="divider">Input & Output</div>
        <div className="card-actions justify-start">
          <div className="flex flex-col gap-4 w-full">
            <SampleDetails title="Input Sample" icon={<InputSampleIcon />} sample={challenge.input_sample} />
          </div>
        </div>
        <div className="card-actions justify-start">
          <div className="flex flex-col gap-4 w-full">
            <SampleDetails title="Output Sample" icon={<OutputSampleIcon />} sample={challenge.output_sample} />
          </div>
        </div>
        <div className="divider">Constraints</div>
        <div className="card-actions justify-start">
          <TimeIcon />
          <h2>
            Time Limit: {challenge.time_limit} {challenge.time_limit > 1 ? "seconds" : "second"}
          </h2>
        </div>
        <div className="card-actions justify-start">
          <MemoryIcon />
          <h2>Memory Limit: {challenge.memory_limit} MB</h2>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailCard;
