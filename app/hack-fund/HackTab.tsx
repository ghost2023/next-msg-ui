import { getHacks } from "@/services/db";
import { Hack } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import { differenceInSeconds, format } from "date-fns";
import { FC, useEffect, useState } from "react";

const HackTab = () => {
  const [tab, setTab] = useState<"active" | "reserved">("active");
  const { data, status } = useQuery({
    queryKey: ["hacks", tab],
    queryFn: () => getHacks(),
  });
  return (
    <div className="flex flex-col gap-4 mt-7">
      <div className="gap-3 flex border self-center border-indigo-800 p-4 rounded-xl ">
        <button
          className={`text-white text-center text-lg font-medium whitespace-nowrap bg-opacity-20 grow justify-center items-stretch w-full px-8 py-4 rounded-xl ${
            tab == "active" ? "bg-blue-700" : ""
          }`}
          onClick={() => setTab("active")}
        >
          Active competition
        </button>
        <button
          className={`text-white text-center text-lg font-medium whitespace-nowrap bg-opacity-20 grow justify-center items-stretch w-full px-8 py-4 rounded-xl ${
            tab == "reserved" ? "bg-blue-700" : ""
          }`}
          onClick={() => setTab("reserved")}
        >
          Reserved competition
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {status == "success" &&
          data.map((i) => <Card event={i} key={i.name} />)}
      </div>
    </div>
  );
};

type Props = {
  event: Hack;
};

const Card: FC<Props> = ({ event }) => {
  const eventTime = new Date(event.startTime);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const diff = differenceInSeconds(eventTime, currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [event.startTime]);

  return (
    <div className="pl-4 flex grow flex-col overflow-hidden rounded-2xl border border-solid border-indigo-800 items-start">
      <div className="text-neutral-300 mt-4 px-3 py-2 font-light">
        {format(event.startTime, "MMM dd, yyyy")} -{" "}
        {format(event.endTime, "MMM dd, yyyy")}
      </div>
      <div className="flex px-3 justify-between gap-2">
        <div className="rounded-full h-12 w-12 overflow-hidden">
          <img
            loading="lazy"
            srcSet={event.author.avatar}
            className="h-full w-full"
          />
        </div>
        <div className="text-white text-lg my-auto">{event.author.name}</div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="text-white text-2xl p-4">{event.name}</div>
        <div className="text-xl mr-4">
          ${event.moneyMin} - ${event.moneyMax}
        </div>
      </div>
      <div className="text-white text-4xl ml-2">
        <span className="w-10 inline-block">{Math.round(diff / 3600)}</span> :{" "}
        <span className="w-10 inline-block">
          {Math.round((diff % 3600) / 60)}
        </span>{" "}
        : <span className="w-10 inline-block">{diff % 60}</span>
      </div>
      <div className="text-neutral-300 text-center font-bold justify-center px-10 py-2 rounded-tl-2xl border-t border-l border-solid border-indigo-800 self-end">
        Sponsor
      </div>
    </div>
  );
};

export default HackTab;
