import { format } from "date-fns";
import Link from "next/link";
import { FC } from "react";
import { IoFlashOutline } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbZodiacGemini } from "react-icons/tb";
import Countdown from "./Countdown";

type Event = {
  name: string;
  description: string;
  commitment: number;
  start: Date;
  img: string;
};

const Page = () => {
  const events: Event[] = [
    {
      name: "Event 1",
      description: "Description for Event 1",
      commitment: 2,
      start: new Date("2023-01-01T12:00:00Z"),
      img: "https://i.pravatar.cc/300",
    },
    {
      name: "Event 2",
      description: "Description for Event 2",
      commitment: 3,
      start: new Date("2023-02-01T15:30:00Z"),
      img: "https://i.pravatar.cc/300",
    },
    {
      name: "Event 3",
      description: "Description for Event 3",
      commitment: 1,
      start: new Date("2023-03-01T18:00:00Z"),
      img: "https://i.pravatar.cc/300",
    },
  ];

  return (
    <div className="bg-neutral-950 flex flex-col gap-4">
      <div className="self-stretch flex w-full flex-col mt-8 px-12 md:px-18">
        <div className="text-white text-5xl font-medium max-w-[1866px]">
          Events.
        </div>
        <div className="text-neutral-300 text-xl font-medium max-w-[1736px] mt-4">
          Sponsor industry-level security experts and earn with them every
          Friday.
        </div>
        <div className="gap-7 flex mt-14">
          {/* the card 1 */}
          <div className="border flex grow flex-col w-full p-10 from-indigo-800/20 to-transparent to-70% bg-gradient-to-r rounded-xl border-solid border-indigo-800">
            <div className="flex justify-between items-end">
              <div className="text-white text-2xl font-medium mb-1 grow shrink basis-auto">
                Weekly Thrills.
              </div>
              <ClockSvg />
            </div>
            <div className="text-white text-sm mt-10">
              Mark your calendar for our weekly events, where the excitement
              never stops, and the Web3 community comes together to celebrate
              the best in cybersecurity.&quot; this would have better spotlight
              and should be first time impression
            </div>
          </div>

          {/* the card 1 */}
          <div className="border flex grow flex-col w-full p-10 from-indigo-800/20 to-transparent to-70% bg-gradient-to-bl rounded-xl border-solid border-indigo-800">
            <div className="gap-5 flex justify-between items-end">
              <div className="text-white text-2xl mb-1 font-medium">
                Challenge the Norm.
              </div>
              <TbZodiacGemini size={60} className="stroke-1 text-indigo-700" />
            </div>
            <div className="text-white text-sm mt-10">
              Our events redefine Web3 security by challenging auditors to think
              creatively, adapt swiftly, and outsmart their competition.
            </div>
          </div>
        </div>

        <div className="border bg-emerald-900 bg-opacity-20 px-6 py-3 self-center flex max-w-full justify-between gap-5 my-14 rounded-lg  border-solid border-emerald-900">
          <RiMoneyDollarCircleLine size={32} className="text-emerald-900" />
          <Link
            href="#events"
            className="text-neutral-300 text-center text-xl font-bold grow shrink basis-auto self-start"
          >
            Check and Sponsor
          </Link>
        </div>
        <div className="gap-7 flex">
          <div className="border flex grow flex-col w-full p-10 from-indigo-800/20 to-transparent to-70% bg-gradient-to-t rounded-xl border-solid border-indigo-800">
            <div className="gap-5 flex justify-between items-end">
              <div className="text-white text-2xl mb-1 font-medium">
                Engage with Elite Auditors.
              </div>
              <LuMessagesSquare
                size={60}
                className="stroke-1 text-indigo-700"
              />
            </div>
            <div className="text-white text-sm mt-10">
              send them your messages, tips: Our weekly events bring together
              the best auditors in the industry, creating a space for
              innovation, competition, and community building.
            </div>
          </div>

          <div className="border flex grow flex-col w-full p-10 from-indigo-800/20 to-transparent to-70% bg-gradient-to-l rounded-xl border-solid border-indigo-800">
            <div className="gap-5 flex justify-between items-end">
              <div className="text-white text-2xl mb-1 font-medium">
                Fan-Fueled Fun!
              </div>
              <IoFlashOutline
                size={60}
                className="stroke-1 text-indigo-700 border-2 border-indigo-700 rounded-full p-2"
              />
            </div>
            <div className="text-white text-sm mt-10">
              Become a fan of your favorite auditors, connect with other
              enthusiasts, and enjoy a unique blend of entertainment and
              cybersecurity excellence.
            </div>
          </div>
        </div>
        <div className="my-12">
          <div className="flex gap-2 items-center">
            <div className="from-[#3933B0] tp-[#B033A4] bg-gradient-to-b rounded-full h-4 w-4"></div>
            <div className="text-neutral-300 text-xl font-medium grow whitespace-nowrap mt-1 self-start">
              This week’s event
            </div>
          </div>
          <div className="flex justify-between gap-5 mt-2">
            <div className="text-white text-4xl font-medium grow shrink basis-auto">
              Dungeons and Dragons.
            </div>
            <div className="flex flex-col rounded-3xl border border-indigo-800 px-8 py-2">
              <div className="text-neutral-300 text-lg whitespace-nowrap">
                History
              </div>
              <div className="bg-indigo-800 shrink-0 h-px mt-1" />
            </div>
          </div>
        </div>
        <div
          id="events"
          className="gap-5 flex max-md:flex-col max-md: max-md:gap-0"
        >
          {events.map((c, i) => (
            <Card key={i} event={c} />
          ))}
        </div>
        <Countdown time={1702537594462} />
      </div>
    </div>
  );
};

// PiHourglassLight

type Props = {
  event: Event;
};

const Card: FC<Props> = ({ event }) => {
  return (
    <div className="bg-zinc-300 bg-opacity-0 flex grow flex-col overflow-hidden rounded-3xl border-2 border-solid border-emerald-400 items-start">
      <div className="text-neutral-300 mt-4 px-3 py-2 font-light">
        Joined {format(event.start, "MMM, yyyy")}
      </div>
      <div className="flex px-3 justify-between gap-3">
        <div className="rounded-full h-16 w-16 overflow-hidden">
          <img loading="lazy" srcSet={event.img} className="h-full w-full" />
        </div>
        <div className="text-white text-2xl my-auto">{event.name}</div>
      </div>
      <div className="flex items-center w-full justify-between gap-5 mt-4 px-4 py-4 from-[#014D28] to-transparent to-70% bg-gradient-to-r">
        <div className="text-neutral-300 font-medium my-auto">
          Hacker’s Commitment
        </div>
        <div className="text-white text-2xl">${event.commitment}</div>
      </div>
      <div className="text-white text-lg p-4">{event.description}</div>
      <div className="text-neutral-300 text-center font-bold bg-stone-950 justify-center mt-12 px-10 py-2 rounded-tl-3xl border-t-2 border-l-2 border-solid border-emerald-400 self-end">
        Sponsor
      </div>
    </div>
  );
};

const ClockSvg = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="vuesax/linear/timer-start">
      <g id="timer-start">
        <path
          id="Vector"
          d="M50 33.3335V54.1668"
          stroke="#232DE3"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M50.0003 91.6667C29.8753 91.6667 13.542 75.3333 13.542 55.2083C13.542 35.0833 29.8753 18.75 50.0003 18.75C70.1253 18.75 86.4586 35.0833 86.4586 55.2083"
          stroke="#232DE3"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M37.499 8.3335H62.499"
          stroke="#232DE3"
          strokeWidth="4"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_4"
          d="M62.083 77.0834V72.25C62.083 66.2917 66.333 63.8334 71.4997 66.8334L75.6663 69.25L79.833 71.6667C84.9997 74.6667 84.9997 79.5417 79.833 82.5417L75.6663 84.9584L71.4997 87.375C66.333 90.375 62.083 87.9167 62.083 81.9584V77.0834Z"
          stroke="#232DE3"
          stroke-width="4"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </g>
  </svg>
);

export default Page;
