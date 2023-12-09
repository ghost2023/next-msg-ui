"use client";

import {
  currentUser,
  deleteMessage,
  getMessages,
  sendMessage,
} from "@/services/db";
import { Conversation } from "@/services/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import MessageCard from "./Message";
import MessageInput from "./MessageInput";

type Props = {
  conversation: Conversation;
};

export default function ConversationView({ conversation }: Props) {
  const { data, status } = useQuery({
    queryKey: ["messages", conversation.id],
    queryFn: () => getMessages(conversation.id),
  });
  const queryClient = useQueryClient();
  const [editMessage, setEditMessage] = useState<string>();
  const [replyMessage, setReplyMessage] = useState<string>();
  const [msgContent, setMsgContent] = useState("");
  const sendMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["messages", conversation.id],
        [...(data ?? []), variables],
      );
    },
  });
  const delMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["messages", conversation.id],
        (data ?? []).map((m) =>
          m.id != variables
            ? m
            : { ...m, isDeleted: true, content: "Deleted Message" },
        ),
      );
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (editMessage) {
      // TODO: edit message
    } else {
      // TODO: normal message
      console.log({
        sender: currentUser.id,
        id: Date.now().toString(),
        read: false,
        timestamp: new Date(),
        replyTo: replyMessage,
        content: msgContent,
        conversationId: conversation.id,
      });
      sendMutation.mutate({
        sender: currentUser.id,
        id: Date.now().toString(),
        read: false,
        timestamp: new Date(),
        replyTo: replyMessage,
        content: msgContent,
        conversationId: conversation.id,
      });
    }
    setMsgContent("");
    setEditMessage(undefined);
    setReplyMessage(undefined);
  };

  return (
    <div className="bg-neutral-950 flex grow flex-col items-center w-full my-2 rounded-2xl border border-neutral-700 border-solid max-w-screen-md mx-3 md:mx-auto h-full max-h-[90vh]">
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
      <div className="grow h-full overflow-y-auto min-h-[0] w-full">
        <div className="w-full flex flex-col py-3">
          {status == "success" ? (
            data.map((msg) => (
              <MessageCard
                key={msg.id}
                message={msg}
                onReply={() => setReplyMessage(msg.id)}
                onEdit={() => {}}
                onPin={() => {}}
                onDelete={() => {
                  delMutation.mutate(msg.id);
                }}
                replyTo={data.find((m) => m.id == m.replyTo)}
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
        editing={data?.find((m) => m.id == editMessage)}
        replyingTo={data?.find((m) => m.id == replyMessage)}
        onCancel={() => {
          setEditMessage(undefined);
          setReplyMessage(undefined);
        }}
      />
    </div>
  );
}