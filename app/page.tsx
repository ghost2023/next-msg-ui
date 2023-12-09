"use client";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { useState } from "react";
import { format } from "date-fns";
import { currentUser, getConversations, users } from "@/services/db";
import { Message } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import ConversationView from "./ConversationView";

// get this from useSession

export default function Page() {
  const { data, status } = useQuery({
    queryKey: ["convos"],
    queryFn: () => getConversations(currentUser.id),
  });

  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col items-center pt-8">
      {data && <ConversationView conversation={data[0]} />}
    </div>
  );
}
