
import { useContext } from "react";
import Reward from "../models/Reward";
import { AuthContext } from "../App";
import LoadingButton from "./LoadingButton";

interface RewardCardProps {
    reward: Reward;
    onRedeem: (reward: Reward) => void;
    isGlobalRedeeming: boolean;
}


const RewardCard = ({ reward, onRedeem, isGlobalRedeeming }: RewardCardProps) => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is undefined");
    }
    const { user } = authContext;

    const getCardBackgroundColor = (reward: Reward) => {
        if (reward.is_redeemed) {
            return "bg-success";
        }
        if ((user?.remaining_points ?? 0) < reward.price) {
            return "bg-secondary";
        }
        return "bg-primary";
    }

    const renderRedeemButton = () => {
        if (reward.is_redeemed) {
            return (<button className="btn btn-disabled" disabled>Already redeemed</button>)
        }
        if ((user?.remaining_points ?? 0) < reward.price) {
            return (<button className="btn btn-disabled" disabled>Not enough points</button>)
        }
        return (<LoadingButton className={`btn ${isGlobalRedeeming ? "btn-disabled" : ""}`} onClick={() => onRedeem(reward)} isLoading={reward.is_redeeming}>Redeem</LoadingButton>)
    }

    return (

        <div className={`card w-96 text-primary-content ${getCardBackgroundColor(reward)}`}>
            <div className="card-body">
                <h2 className="card-title">{reward.name}</h2>
                <p>Price: {reward.price} points</p>
                <div className="card-actions justify-end">
                    {renderRedeemButton()}
                </div>
            </div>
        </div>


    )
}

export default RewardCard