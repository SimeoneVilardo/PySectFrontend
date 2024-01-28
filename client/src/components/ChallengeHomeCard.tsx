import { Link } from "react-router-dom";
import Challenge from "../models/Challenge";

interface ChallengeHomeCardProps {
  challenge: Challenge;
}

const ChallengeHomeCard = ({ challenge }: ChallengeHomeCardProps) => {
  return (
    <div className="indicator">
      <span className="indicator-item badge badge-secondary">
        {challenge.points} ⭐
      </span>
      <div className="card w-96 bg-primary shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{challenge.name}</h2>
          <p>{challenge.subtitle}</p>
          <div className="card-actions justify-end">
            <Link className="btn" to={`/challenge/${challenge.id}`}>
              See More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeHomeCard;
