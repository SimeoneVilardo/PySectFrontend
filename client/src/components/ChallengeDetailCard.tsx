import Challenge from "../models/Challenge";

interface ChallengeDetailCardProps {
  challenge: Challenge;
}

const ChallengeDetailCard = ({ challenge }: ChallengeDetailCardProps) => {
  const renderSample = (sampleString: string) => {
    try {
      if (!sampleString.trim()) {
        return <div className="collapse-content">Empty sample string</div>;
      }

      const sample: string[][] = JSON.parse(sampleString);

      if (
        !Array.isArray(sample) ||
        sample.some((subArray) => !Array.isArray(subArray))
      ) {
        return <div className="collapse-content">Invalid sample format</div>;
      }

      if (sample.every((subArray) => subArray.length < 1)) {
        return <div className="collapse-content">Empty sample array</div>;
      }

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
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return <div className="collapse-content">Error parsing sample</div>;
    }
  };

  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <p>{challenge?.description}</p>
        <div className="divider">Input & Output</div>
        <div className="card-actions justify-start">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-4"></div>
            <details className="collapse border border-base-300 bg-base-200">
              <summary className="collapse-title text-xl font-medium">
                <div className="flex flex-row gap-4">
                  <span>
                    <i>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "24px", height: "24px" }}
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                        />
                      </svg>
                    </i>
                  </span>
                  Input Sample
                </div>
              </summary>
              {renderSample(challenge.input_sample)}
            </details>
          </div>
        </div>
        <div className="card-actions justify-start">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-row gap-4"></div>
            <details className="collapse border border-base-300 bg-base-200">
              <summary className="collapse-title text-xl font-medium">
                <div className="flex flex-row gap-4">
                  <span>
                    <i>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "24px", height: "24px" }}
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                        />
                      </svg>
                    </i>
                  </span>
                  Output Sample
                </div>
              </summary>
              {renderSample(challenge.output_sample)}
            </details>
          </div>
        </div>    
        <div className="divider">Constraints</div>
        <div className="card-actions justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "24px", height: "24px" }}
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
            />
          </svg>
          <h2>
            Time Limit: {challenge.time_limit}{" "}
            {challenge.time_limit > 1 ? "seconds" : "second"}
          </h2>
        </div>
        <div className="card-actions justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "24px", height: "24px" }}
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M64 64C28.7 64 0 92.7 0 128v7.4c0 6.8 4.4 12.6 10.1 16.3C23.3 160.3 32 175.1 32 192s-8.7 31.7-21.9 40.3C4.4 236 0 241.8 0 248.6V320H576V248.6c0-6.8-4.4-12.6-10.1-16.3C552.7 223.7 544 208.9 544 192s8.7-31.7 21.9-40.3c5.7-3.7 10.1-9.5 10.1-16.3V128c0-35.3-28.7-64-64-64H64zM576 352H0v64c0 17.7 14.3 32 32 32H80V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h96V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h96V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h96V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h48c17.7 0 32-14.3 32-32V352zM192 160v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32z"
            />
          </svg>
          <h2>Memory Limit: {challenge.memory_limit} MB</h2>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailCard;
