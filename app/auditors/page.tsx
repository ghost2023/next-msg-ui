"use client";

import { getAuditors } from "@/services/db";
import { Auditor } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Page = () => {
  const [keyword, setKeyWord] = useState("");
  const [input, setInput] = useState("");
  const { data, status } = useQuery({
    queryKey: ["auditor", keyword],
    queryFn() {
      return getAuditors(keyword);
    },
  });

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setKeyWord(input);
    }, 700);

    return () => clearTimeout(debounceTimer);
  }, [input]);

  return (
    <div>
      <input type="search" onChange={(e) => setInput(e.target.value)} />
      {data?.map((i) => <Card auditor={i} key={i.name} />)}
    </div>
  );
};

type Props = {
  auditor: Auditor;
};

const Card = ({ auditor }: Props) => {
  return (
    <div className="border border-indigo-800 rounded-lg px-4">
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img
              src={auditor.img}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>{" "}
          <div className="text-lg text-white">{auditor.name}</div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Page;
