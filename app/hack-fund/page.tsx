"use client";

import React, { useState } from "react";
import { CiDollar } from "react-icons/ci";
import { IoFlashOutline } from "react-icons/io5";
import { PiCurrencyCircleDollarThin } from "react-icons/pi";
import FundTab from "./FundTab";
import HackTab from "./HackTab";

const Page = () => {
  const [tab, setTab] = useState<"hack" | "fund">("hack");

  return (
    <div className="self-stretch flex w-full flex-col mt-8 px-12 md:px-18">
      <div className="flex justify-between gap-5 mt-2">
        <div className="text-white text-4xl font-medium grow shrink basis-auto">
          Hack-or-Fund.
        </div>
        <div className="flex flex-col rounded-3xl border border-indigo-800 px-8 py-2">
          <div className="text-neutral-300 text-lg whitespace-nowrap">
            History
          </div>
          <div className="bg-indigo-800 shrink-0 h-px mt-1" />
        </div>
      </div>

      <div className="gap-7 flex mt-14">
        <button
          className={`border flex grow flex-col w-full p-10 from-indigo-800/20 to-transparent to-70% rounded-xl border-solid ${
            tab == "hack"
              ? "bg-gradient-to-r  border-indigo-800"
              : "border-transparent"
          }`}
          onClick={() => setTab("hack")}
        >
          <div className="gap-5 flex w-full justify-between items-end">
            <div className="text-white text-2xl mb-1 font-medium">Hack</div>
            <IoFlashOutline size={60} className="stroke-1 text-indigo-700" />
          </div>
          <div className="text-white text-sm mt-10">
            Share in Success: By sponsoring auditors on Hack-or-Fund, sponsors
            not only support security efforts but also share in the rewards of
            successful challenges.
          </div>
        </button>

        <button
          className={`border flex grow flex-col w-full p-10 from-indigo-800/20 to-transparent to-70% rounded-xl border-solid ${
            tab == "fund"
              ? "bg-gradient-to-r  border-indigo-800"
              : "border-transparent"
          }`}
          onClick={() => setTab("fund")}
        >
          <div className="gap-5 flex w-full justify-between items-end">
            <div className="text-white text-2xl mb-1 font-medium">Fund</div>
            <PiCurrencyCircleDollarThin
              size={60}
              className="stroke-1 text-indigo-700"
            />
          </div>
          <div className="text-white text-sm mt-10">
            Hack Smarter, Earn Together: Experience the next frontier in Web3
            security with Hack-or-Fund, where every battle you win is a victory
            for you and your fan.
          </div>
        </button>
      </div>
      {tab == "hack" ? <HackTab /> : <FundTab />}
    </div>
  );
};

export default Page;
