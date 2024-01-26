import { useContext, useEffect, useState } from "react";
import Reward from "../models/Reward";
import Spinner from "../components/Spinner";
import RewardCard from "../components/RewardCard";
import { toast } from "react-toastify";
import { AuthContext } from "../App";

const Rewards = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is undefined");
    }
    const { setUser, user } = authContext;
    const [isLoading, setLoading] = useState<boolean>(true);
    const [rewards, setRewards] = useState<Reward[]>([]);
    //const [isRedeeming, setRedeeming] = useState<boolean>(false);

    const isGlobalRedeeming = () => {
        return rewards.some(r => r.is_redeeming);
    }

    const updateUser = async () => {
        const userResponse = await fetch("/api/me/", { method: "GET" });
        if (userResponse.ok) {
            const userJson = await userResponse.json();
            setUser(userJson);
        }
    }

    const redeemReward = async (reward: Reward) => {
        try {
            const redeemResponse = await fetch(`/api/rewards/${reward.id}/redeem/`, { method: 'PATCH' });
            if (!redeemResponse.ok) {
                toast.error(`Error redeeming reward ${reward.name}`, { theme: "colored", position: "bottom-center" });
                updateRedeemingState(reward, false);
                return;
            }
            const redeemedReward: Reward = await redeemResponse.json();
            await updateUser();
            await fetchRewards();
            toast.success(`Congratulations! The reward ${redeemedReward.name} has been redeemed.`, { theme: "colored", position: "bottom-center" });
        } catch (error) {
            console.error('Error redeeming reward:', error);
        }
    }

    const updateRedeemingState = (redeemingReward: Reward, is_redeeming: boolean) => {
        const updatedRewards = rewards.map(reward => {
            if (reward.id === redeemingReward.id) {
                return { ...reward, is_redeeming: is_redeeming };
            }
            return reward;
        });
        setRewards(updatedRewards);
    }

    const handleRedeem = async (redeemingReward: Reward) => {
        updateRedeemingState(redeemingReward, true);
        redeemReward(redeemingReward);
    };

    const fetchRewards = async () => {
        setLoading(true);
        try {
            const rewardsResponse = await fetch('/api/rewards/', { method: 'GET' });
            if (!rewardsResponse.ok) {
                return;
            }
            const rewardsJson = await rewardsResponse.json();
            setRewards(rewardsJson);
        } catch (error) {
            console.error('Error fetching rewards:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    if (isLoading) {
        return (<Spinner className="text-primary size-24"></Spinner>)
    }

    console.log(rewards);
    return (
        <>
            <div className="flex flex-col items-center my-5">
                <h1 className="text-xl">Total points: {user?.total_points}</h1>
                <h1 className="text-xl">Used points: {user?.used_points}</h1>
                <h1 className="text-xl">Remaining points: {user?.remaining_points}</h1>
            </div>
            <div className="flex flex-wrap justify-center my-4 gap-4">
                {rewards.map(r => <RewardCard key={r.id} reward={r} onRedeem={handleRedeem} isGlobalRedeeming={isGlobalRedeeming()}></RewardCard>)}
            </div>
        </>
    )
}

export default Rewards