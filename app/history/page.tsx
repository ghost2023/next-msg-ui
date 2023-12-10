import { getChallengeHistory } from "@/services/db";
import Link from "next/link";
import React from "react";
import ChallengeCard from "./ChallengeCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const getHistoryLength = async () => 40;

async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let index: number;
  if (typeof searchParams?.page == "string")
    index = parseInt(searchParams?.page);
  else if (typeof searchParams?.page == "object")
    index = parseInt(searchParams?.page[0]);
  else index = 1;

  // pass the index for pagination
  const challenges = await getChallengeHistory();
  const length = await getHistoryLength();

  return (
    <div className="self-stretch flex w-full flex-col mt-10 px-14 max-md:max-w-full max-md:mt-10 max-md:px-5">
      <div className="text-white text-4xl font-medium whitespace-nowrap self-start max-md:max-w-full max-md:text-4xl">
        Challenge History
      </div>
      <div className="text-neutral-300 mb-7 font-medium whitespace-nowrap mt-2 self-start max-md:max-w-full">
        Challenges list of winners,
      </div>
      <div className="flex flex-col gap-4">
        {challenges?.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
      <div className="flex gap-2 ml-auto w-full justify-end my-4">
        {index > 1 && (
          <Link
            href={`/history?page=${index - 1}`}
            className="rounded-full shrink-0 flex items-center border-indigo-900 border font-medium py-2 px-3.5 text-indigo-80"
          >
            <BsChevronLeft className="text-indigo-800" />
          </Link>
        )}
        {(() => {
          const pageChips: React.ReactNode[] = [];

          for (
            let i = index > 2 ? index - 2 : 1;
            i <= Math.min(Math.ceil(length / 4), 3) + index;
            i++
          ) {
            pageChips.push(
              <Link
                href={`/history?page=${i}`}
                className={`rounded-full shrink-0 border-indigo-900 border font-medium py-2 px-3.5 ${
                  i == index
                    ? "bg-indigo-800 text-neutral-300"
                    : "text-indigo-800"
                }`}
              >
                {i}
              </Link>,
            );
          }

          return pageChips;
        })()}

        {index < length && (
          <Link
            href={`/history?page=${index + 1}`}
            className="rounded-full shrink-0 flex items-center border-indigo-900 border font-medium py-2 px-3.5 text-indigo-80"
          >
            <BsChevronRight className="text-indigo-800" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Page;
