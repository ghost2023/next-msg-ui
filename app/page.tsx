"use client";
import { currentUser, getConversations } from "@/services/db";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ConversationView from "./ConversationView";
// get this from useSessio

export default function Page() {
  const { data, status } = useQuery({
    queryKey: ["convos"],
    queryFn: () => getConversations(currentUser.id),
  });
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col items-center pt-8">
      <div className="flex lg:gap-7 w-full max-w-screen-lg h-full grow">
        <div className="flex flex-col gap-5 w-16 sm:w-auto shrink">
          <div className="border-neutral-700 border w-auto flex rounded-lg">
            <input
              type="text"
              placeholder="Search inbox"
              className="bg-transparent px-3 py-2 outline-none font-medium min-w-0 w-full "
            />
            <FiSearch className="text-neutral-300 my-auto sm:mx-2" size={20} />
          </div>
          <div className="flex flex-col gap-1 ">
            {data?.map((c, i) => (
              <div
                className={`${
                  current == i
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-300"
                } px-3 py-2 flex gap-2 rounded-md cursor-pointer`}
                onClick={() => setCurrent(i)}
                key={c.id}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-sky-400"></div>
                <div className="sm:flex hidden flex-col">
                  <p>
                    {c.participants.find((u) => u.id != currentUser.id)?.name}
                  </p>
                  <div className="text-neutral-300 text-xs">
                    {"last message"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {data && <ConversationView conversation={data[current]} />}
      </div>
    </div>
  );
}
