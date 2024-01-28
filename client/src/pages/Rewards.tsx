import { useContext, useEffect, useState, useMemo } from "react";
import Reward from "../models/Reward";
import Spinner from "../components/Spinner";
import RewardCard from "../components/RewardCard";
import { toast } from "react-toastify";
import { AuthContext } from "../App";
import { fetchApi } from "../utils/fetchApi";

const Rewards = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is undefined");
  }
  const { setUser, user } = authContext;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [rewards, setRewards] = useState<Reward[]>([]);

  const isGlobalRedeeming = useMemo(() => rewards.some((reward) => reward.is_redeeming), [rewards]);

  const updateUser = async () => {
    const user = await fetchApi({ url: "/api/me/" });
    setUser(user);
  };

  const redeemReward = async (reward: Reward) => {
    return await fetchApi({ url: `/api/rewards/${reward.id}/redeem/`, method: "PATCH" });
  };

  const fetchRewards = async () => {
    return await fetchApi({ url: "/api/rewards/", method: "GET" });
  };

  const handleRedeem = async (redeemingReward: Reward) => {
    updateRedeemingState(redeemingReward, true);
    try {
      const redeemedReward = await redeemReward(redeemingReward);
      await updateUser();
      const rewards = await fetchRewards();
      setRewards(rewards);
      toast.success(`Congratulations! The reward ${redeemedReward.name} has been redeemed.`, {
        theme: "colored",
        position: "bottom-center",
      });
    } catch (error) {
      updateRedeemingState(redeemingReward, false);
    }
  };

  const updateRedeemingState = (redeemingReward: Reward, is_redeeming: boolean) => {
    const updatedRewards = rewards.map((reward) => {
      if (reward.id === redeemingReward.id) {
        return { ...reward, is_redeeming: is_redeeming };
      }
      return reward;
    });
    setRewards(updatedRewards);
  };

  useEffect(() => {
    const fetchRewardsData = async () => {
      setLoading(true);
      try {
        const rewards = await fetchRewards();
        setRewards(rewards);
      } finally {
        setLoading(false);
      }
    };
    fetchRewardsData();
  }, []);

  if (isLoading) {
    return <Spinner className="text-primary size-24"></Spinner>;
  }

  return (
    <>
      <div className="flex flex-col items-center my-5">
        <div className="stats md:stats-vertical lg:stats-horizontal shadow bg-base-200">
          <div className="stat">
            <div className="stat-title">Total</div>
            <div className="stat-value">{user?.total_points}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Used</div>
            <div className="stat-value">{user?.used_points}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Avaible</div>
            <div className="stat-value">{user?.remaining_points}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center my-4 gap-4">
        {rewards.map((r) => (
          <RewardCard key={r.id} reward={r} onRedeem={handleRedeem} isGlobalRedeeming={isGlobalRedeeming}></RewardCard>
        ))}
      </div>
    </>
  );
};

export default Rewards;
