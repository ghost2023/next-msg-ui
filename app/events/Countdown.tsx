"use client";

import { differenceInSeconds } from "date-fns";
import { FC, useEffect, useState } from "react";
import { PiHourglassLight } from "react-icons/pi";

type Props = {
  time: number;
};

const Countdown: FC<Props> = ({ time }) => {
  const eventTime = new Date(time);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const diff = differenceInSeconds(eventTime, currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="border self-center gap-4 flex max-w-full my-12 py-8 px-6 rounded-xl border-solid border-indigo-800">
      <div className="flex flex-col">
        <div className="text-neutral-300 text-xl font-medium">
          event begins in:
        </div>
        <div className="text-white text-4xl whitespace-nowrap mt-5">
          <span className="w-10 inline-block">{Math.round(diff / 3600)}</span> :{" "}
          <span className="w-10 inline-block">
            {Math.round((diff % 3600) / 60)}
          </span>{" "}
          : <span className="w-10 inline-block">{diff % 60}</span>
        </div>
      </div>
      <PiHourglassLight size={60} className="stroke-1 ml-6 text-indigo-700" />
    </div>
  );
};

export default Countdown;
