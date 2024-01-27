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

  const renderPoints = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(<input key={i} type="radio" name="points" className={`cursor-default animate-none bg-primary mask mask-star-2`} checked={challenge.points == i} readOnly disabled />);
    }
    return <div className="card-actions justify-start items-center mt-2 gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "24px", height: "24px" }}
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"
        />
      </svg>
      <h2>Points:</h2>
      <div className="rating rating-sm md:rating-md"> {stars}</div>
    </div>;
  }

  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="divider">Introduction</div>
        <p className="font-bold">{challenge?.description}</p>
        {renderPoints()}
        <div className="divider">Input & Output</div>
        <div className="card-actions justify-start">
          <div className="flex flex-col gap-4 w-full">
            <details className="collapse border border-base-300 bg-base-200">
              <summary className="collapse-title text-xl font-medium">
                <div className="flex flex-row gap-4">
                  <span>
                    <i>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "24px", height: "24px" }}
                        aria-hidden="true"
                        focusable="false"
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
                        aria-hidden="true"
                        focusable="false"
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
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 512 512"
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
