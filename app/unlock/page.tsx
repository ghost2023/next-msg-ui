import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Page = () => {
  return (
    <div className="px-10 py-12">
      {/* the bread crump */}
      <div className="flex items-end gap-1">
        <Link href="/challenge" className="text-neutral-400 hover:underline">
          Challenge
        </Link>
        <Link href="/hack-fund" className="text-xl font-medium hover:underline">
          / Hack-or-Fund.
        </Link>
      </div>

      {/* the header */}
      <div className="flex my-12 py-4 w-full justify-between border-b-white border-b items-center">
        <div className="">
          <div className="flex gap-3 items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                src="https://i.pravatar.cc/300"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p>AUTHOR NAME</p>
          </div>
          <div className="text-xl font-medium mt-2">CHALLENGE NAME</div>
        </div>

        <div className="flex border border-neutral-700 px-1 items-center py-1 bg-neutral-800 rounded ">
          <button className="p-2">
            <FaChevronLeft size={20} />
          </button>
          <div className="w-px bg-neutral-300 rounded-lg h-7"></div>
          <button className="p-2">
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>

      <main className="flex gap-4">
        <div className="grow flex flex-col items-center">
          <a
            href="./page.tsx"
            download={"page.tsx"}
            className="text-neutral-300 text-2xl border border-neutral-700 px-6 py-3 rounded-lg"
          >
            Download
          </a>
        </div>

        <div className="bg-neutral-900 flex max-w-sm flex-col px-6 py-8 rounded-xl">
          <div className="flex justify-between gap-3 items-start">
            <div className="flex flex-col items-stretch">
              <div className="text-neutral-300 text-lg font-medium">Info:</div>
              <div className="text-neutral-300 text-lg mt-4">Solve time:</div>
            </div>
            <div className="text-neutral-300 text-lg mt-4 self-end">2 hrs</div>
          </div>
          <div className="bg-neutral-700 shrink-0 h-px my-4" />
          <div className="text-neutral-300 text-lg font-medium">
            Description:
          </div>
          <div className="text-neutral-300 mt-3">
            Your central hub for all Web3 and Smart Contract security needs.
            Whether you require expert Security Consultation, Private Auditing,
            Swift Incident Response, or tailor-made Web3 security solutions,{" "}
          </div>
          <div className="bg-neutral-700 shrink-0 h-px my-5" />
          <div className="text-neutral-300 text-lg font-medium">
            Challenge ends in:
          </div>
          <div className="text-white text-xl mt-3">12 : 54 : 33</div>
        </div>
      </main>
    </div>
  );
};

export default Page;
