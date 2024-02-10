import { useState } from "react";
import ChallengeFiltersData from "../models/ChallengeFiltersData";

interface ChallengeFiltersProps {
    onFiltersChange: (challengeFiltersData: ChallengeFiltersData) => void;
}

const ChallengeFilters = ({onFiltersChange}: ChallengeFiltersProps) => {
  const [isFiltersOpen, setFiltersOpen] = useState<boolean>(false);
  const [points, setPoints] = useState<number | null>(null);

  return (
    <details className="collapse collapse-arrow border border-base-300 bg-base-200">
      <summary
        onClick={() => {
          setFiltersOpen(!isFiltersOpen);
        }}
        className="collapse-title text-xl font-medium"
      >
        {isFiltersOpen ? "Click to hide filters" : "Click to show filters"}
      </summary>
      <div className="collapse-content">
        <div className="flex flex-row gap-6">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Points</span>
            </div>
            <select className="select select-bordered" value={points?.toString()} onChange={e => {setPoints(parseInt(e.target.value)); onFiltersChange({points: parseInt(e.target.value)})}}>
              <option selected>Clear</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </label>
        </div>
      </div>
    </details>
  );
};

export default ChallengeFilters;
