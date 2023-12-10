import { Challenge } from "@/services/types";
import { format } from "date-fns";

type Props = {
  challenge: Challenge;
};
const ChallengeCard = ({ challenge }: Props) => {
  const hrs = Math.floor(challenge.timeTaken / 60);
  const mins = Math.floor(challenge.timeTaken % 60);

  return (
    <div className="justify-center border flex flex-col p-5 rounded-xl border-solid border-neutral-700">
      <div className="justify-between flex gap-2">
        <div className="text-white text-3xl font-medium">{challenge.name}</div>
        <div className="text-neutral-300 text-right">
          {format(challenge.timestamp, "MM/dd/yy")}
        </div>
      </div>
      <div className="justify-between bg-neutral-900 flex w-full gap-5 mt-4 px-6 py-5 rounded-xl">
        <div className="flex grow flex-col gap-2">
          <div className="text-neutral-300">Auditor</div>
          <div className="flex items-center gap-2">
            <div className="rounded-full h-12 w-12 overflow-hidden">
              <img
                loading="lazy"
                src={challenge.author.avatar}
                className="w-full h-full object-cover overflow-hidden self-center"
              />
            </div>
            <div className="text-white text-xl grow max-md:mt-10">
              {challenge.author.name}
            </div>
          </div>
        </div>

        <div className="flex grow flex-col gap-2">
          <div className="text-neutral-300">total Sponsors</div>
          <div className="text-white text-xl">{challenge.sponsorNum}</div>
        </div>

        <div className="flex grow flex-col gap-2">
          <div className="text-neutral-300">total Earned</div>
          <div className="text-white text-xl">
            ${" "}
            {challenge.totalEarned > 1000
              ? challenge.totalEarned / 1000 + "k"
              : challenge.totalEarned}
          </div>
        </div>

        <div className="flex grow flex-col gap-2">
          <div className="text-neutral-300">time taken</div>
          <div className="text-white text-lg">
            {hrs > 0 && `${hrs} hr${hrs > 1 ? "s" : ""}`}
            {mins > 0 && `${mins} min${mins > 1 ? "s" : ""}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
