"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { currentUser } from "@/services/db";
import { Message } from "@/services/types";
import { format } from "date-fns";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaReply } from "react-icons/fa";

type Props = {
  message: Message;
  replyTo?: Message;
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPin: () => void;
};

const MessageCard: React.FC<Props> = ({
  message,
  replyTo,
  onReply,
  onEdit,
  onDelete,
  onPin,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (message.isDeleted && message.sender == currentUser.id) {
    return null;
  }

  return (
    <div
      className={`flex gap-2 w-full px-2 group ${
        message.sender == currentUser.id ? "justify-end" : "justify-start"
      }`}
    >
      {message.sender != currentUser.id && (
        <div className="w-12 h-12 mx-2 rounded-full overflow-hidden bg-sky-400"></div>
      )}
      <div>
        <div
          className={`flex gap-2 items-center ${
            message.sender == currentUser.id ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`py-3 px-4 rounded-3xl text-neutral-200 ${
              message.sender == currentUser.id
                ? "rounded-br-none bg-indigo-800"
                : "rounded-tl-none bg-stone-900"
            }`}
          >
            {replyTo && (
              <div className="text-neutral-300 font-medium border-l-2 border-l-black p-2 text-sm rounded-lg bg-neutral-800/90">
                {replyTo.content}
              </div>
            )}
            <p>{message.content}</p>
          </div>

          <button
            onClick={onReply}
            className={` ${
              isOpen ? "" : "hidden"
            } group-hover:flex p-3 text-neutral-300 hover:bg-stone-800 rounded-full aspect-square`}
          >
            <FaReply size={16} />
          </button>
          {currentUser.id == message.sender ? (
            <Popover onOpenChange={setIsOpen}>
              <PopoverTrigger>
                <button
                  className={` ${
                    isOpen ? "" : "hidden"
                  } group-hover:flex p-3 text-neutral-300 hover:bg-stone-800 rounded-full aspect-square`}
                >
                  <BsThreeDots size={16} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-neutral-950 text-neutral-300 flex flex-col p-1 max-w-[160px] border-neutral-700">
                <>
                  <button
                    onClick={onEdit}
                    className="rounded hover:bg-neutral-900 text-start p-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={onDelete}
                    className="rounded hover:bg-neutral-900 text-start p-2"
                  >
                    Delete
                  </button>
                </>
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
        <span className="text-neutral-300/75 text-xs font-medium">
          {format(message.timestamp, "p PP")}
        </span>
      </div>
    </div>
  );
};

export default MessageCard;
