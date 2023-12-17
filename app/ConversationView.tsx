"use client";

import { getMessages, users } from "@/services/db";
import { Conversation, Message } from "@/services/types";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import MessageCard from "./Message";
import MessageInput from "./MessageInput";

type Props = {
  conversation: Conversation;
};

const socket = io("http://localhost:5000");
export default function ConversationView({ conversation }: Props) {
  const [status, setStatus] = useState<"success" | "error" | "loading">(
    "loading",
  );
  const [msgs, setMsgs] = useState<Message[]>([]);
  const queryClient = useQueryClient();
  const [edittingMessage, setEditMessage] = useState<string>();
  const [replyMessage, setReplyMessage] = useState<string>();
  const [msgContent, setMsgContent] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // for testingpurposes
  const params = useSearchParams();
  const currentUser =
    params && params.get("uid")
      ? users.find((u) => u.id == params?.get("uid")) ?? users[0]
      : users[0];

  useEffect(() => {
    getMessages(conversation.id).then((msg) => {
      setMsgs(msg);
      setStatus("success");
    });

    socket.emit("join_conversation", conversation.id);

    socket.on("msg-receive", (msg: Message) => {
      console.log(msg, "res");

      setMsgs((msgs) => {
        // solving react renders and avoiding dups
        if (!msgs.find((i) => JSON.stringify(i) == JSON.stringify(msg)))
          return [{ ...msg, timestamp: new Date(msg.timestamp) }, ...msgs];
        return msgs;
      });
    });

    socket.on("connect", () => {
      console.log("connected");
    });
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom when the component mounts
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [status]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // editing the existing message
    if (edittingMessage) {
      socket.emit(
        "msg-edit",
        {
          msgId: edittingMessage,
          content: msgContent,
        },
        conversation.id,
      );
    } else {
      const msg = {
        sender: params?.get("uid") || currentUser.id,
        id: Date.now().toString(),
        read: false,
        timestamp: new Date(),
        replyTo: replyMessage,
        content: msgContent,
        conversationId: conversation.id,
      };
      console.log(msg);
      socket.emit("msg-send", msg);
      setMsgs((msgs) => [msg, ...msgs]);
    }
    setMsgContent("");
    setEditMessage(undefined);
    setReplyMessage(undefined);
  };

  return (
    <div className="bg-neutral-950 flex grow flex-col items-center w-full rounded-t-2xl border border-neutral-700 border-solid max-w-screen-md md:mx-3 max-h-[calc(100vh-32px)]">
      {/* the top bar */}
      <div className="flex w-full max-w-full items-center justify-between px-6  border-b-neutral-700 border-b">
        <div className="flex flex-col justify-center py-2 gap-1">
          <div className="text-white text-xl font-medium whitespace-nowrap">
            {
              conversation.participants.filter((p) => p.id != currentUser.id)[0]
                .name
            }
          </div>
          <div className="text-neutral-300 text-sm font-medium whitespace-nowrap">
            last seen: 3hrs ago
          </div>
        </div>
        <div className="flex items-stretch justify-between gap-5">
          <button className="border bg-slate-950 text-neutral-300 font-medium py-2 flex items-stretch justify-between gap-5 pl-8 pr-7 rounded-xl border-solid border-indigo-800">
            Hire
          </button>
        </div>
      </div>

      {/* the messages list */}
      <div
        className="grow h-full overflow-y-auto min-h-[0] w-full"
        ref={scrollContainerRef}
      >
        <div className="w-full flex flex-col-reverse py-3">
          {status == "success" ? (
            msgs.map((msg) => (
              <MessageCard
                key={msg.id}
                message={msg}
                onReply={() => setReplyMessage(msg.id)}
                onEdit={() => {
                  setEditMessage(msg.id);
                  setMsgContent(msg.content);
                }}
                onPin={() => {}}
                onDelete={() => {}}
                replyTo={msgs.find((m) => m.id == msg.replyTo)}
              />
            ))
          ) : (
            <div className="">loading</div>
          )}
        </div>
      </div>

      {/* the message input */}
      <MessageInput
        handleSubmit={handleSubmit}
        msgContent={msgContent}
        setMsgContent={setMsgContent}
        editing={msgs.find((m) => m.id == edittingMessage)}
        replyingTo={msgs.find((m) => m.id == replyMessage)}
        onCancel={() => {
          setEditMessage(undefined);
          setReplyMessage(undefined);
        }}
      />
    </div>
  );
}
