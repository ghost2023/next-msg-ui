"use client";

import { Message } from "@/services/types";
import { FormEvent } from "react";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";

type Props = {
  handleSubmit: (e: FormEvent) => void;
  msgContent: string;
  setMsgContent: (msgContent: string) => void;
  replyingTo?: Message;
  editing?: Message;
  onCancel?: () => void;
};

export default function MessageInput({
  handleSubmit,
  msgContent,
  setMsgContent,
  replyingTo,
  editing,
  onCancel,
}: Props) {
  return (
    <>
      {(replyingTo || editing) && (
        <div className="flex flex-col relative px-7 border-t-neutral-700 border-t w-full">
          <div className="text-neutral-300 font-medium mt-1">
            {editing ? `Editing` : `Replying`}
          </div>
          <div className="text-neutral-400 text-sm">
            {replyingTo?.content || editing?.content}
          </div>
          <button
            className="absolute right-8 top-2 text-white rounded-full p-3 hover:bg-neutral-800"
            onClick={onCancel}
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
      )}
      <form
        className="border bg-black flex items-center gap-5 mx-4 my-3 w-[calc(100%-32px)] px-6 rounded-2xl border-solid border-neutral-700"
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder="Type a message"
          value={msgContent}
          onChange={(e) => setMsgContent(e.target.value)}
          className={`text-neutral-500 break-words h-12 focus:h-auto min-h-[32px] placeholder:opacity-60 w-full focus-visible:outline-none before:opacity-60 py-2 my-1 text-xl bg-transparent font-medium  resize-none`}
        />
        <button className="text-neutral-300 font-medium bg-blue-800 rounded-full p-3">
          <PiPaperPlaneTiltBold size={18} />
        </button>
      </form>
    </>
  );
}
