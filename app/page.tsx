"use client";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { useState } from "react";
import { format } from "date-fns";

type Message = {
  id: string; // the pk of the message
  content: string;
  timestamp: Date;
  sender: string; // user id
  read: boolean; // whether the message has been read
  conversationId: string; // the pk of the conversation
};

type Conversation = {
  id: string; // the pk of the conversation
  messages: Message[];
};

type User = {
  id: string;
  name: string;
};

const users: User[] = [
  {
    id: "1",
    name: "Jane Doe",
  },
  {
    id: "2",
    name: "John Doe",
  },
];

// get this from useSession
const currentUser = users[0];

export default function Page() {
  const [msgContent, setMsgContent] = useState("");
  const [msgs, setMsgs] = useState<Message[]>([
    {
      id: "1",
      content: "Hi",
      timestamp: new Date(),
      sender: "1",
      read: true,
      conversationId: "1",
    },
    {
      id: "2",
      content: "Hello",
      timestamp: new Date(),
      sender: "2",
      read: false,
      conversationId: "1",
    },
    {
      id: "1",
      content: "How are you?",
      timestamp: new Date(),
      sender: "1",
      read: false,
      conversationId: "1",
    },
    {
      id: "2",
      content: "I am good",
      timestamp: new Date(),
      sender: "2",
      read: false,
      conversationId: "1",
    },
    {
      id: "1",
      content: "What about you?",
      timestamp: new Date(),
      sender: "1",
      read: false,
      conversationId: "1",
    },
    {
      id: "2",
      content: "I am also good",
      timestamp: new Date(),
      sender: "2",
      read: false,
      conversationId: "1",
    },
  ]);

  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col items-center pt-8">
      <div className="bg-neutral-950 flex grow flex-col items-center w-full my-2 rounded-2xl border border-neutral-700 border-solid max-w-screen-md mx-3 md:mx-auto h-full max-h-[90vh]">
        {/* the top bar */}
        <div className="flex w-full max-w-full items-center justify-between px-6  border-b-neutral-700 border-b">
          <div className="flex flex-col justify-center py-2 gap-1">
            <div className="text-white text-xl font-medium whitespace-nowrap">
              Jane Doe
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
            {msgs.map((msg) => (
              <MessageCard key={msg.id} {...msg} />
            ))}
          </div>
        </div>

        {/* the message input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMsgs([
              ...msgs,
              {
                id: Date.now().toString(),
                content: msgContent,
                timestamp: new Date(),
                sender: currentUser.id,
                read: true,
                conversationId: "",
              },
            ]);
            setMsgContent("");
          }}
          className="border bg-black flex items-center gap-5 m-4 w-[calc(100%-32px)] px-6 rounded-2xl border-solid border-neutral-700"
        >
          <input
            placeholder="Type a message"
            value={msgContent}
            onChange={(e) => setMsgContent(e.target.value)}
            className="text-neutral-500 grow focus-visible:outline-none placeholder:opacity-60 py-5 text-xl bg-transparent h-full font-medium my-auto"
          />
          <button className="text-neutral-300 font-medium bg-blue-800 rounded-full p-3">
            <PiPaperPlaneTiltBold size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

const MessageCard: React.FC<Message> = ({
  id,
  content,
  timestamp,
  sender,
  read,
  conversationId,
}) => {
  return (
    <div
      className={`flex gap-2 w-full px-2 ${
        sender == currentUser.id ? "justify-end" : "justify-start"
      }`}
    >
      {sender != currentUser.id && (
        <div className="w-12 h-12 mx-2 rounded-full bg-neutral-700 overflow-hidden bg-sky-400"></div>
      )}
      <div>
        <div
          className={`py-3 px-4 rounded-3xl text-neutral-200 ${
            sender == currentUser.id
              ? "rounded-br-none bg-indigo-800"
              : "rounded-tl-none bg-stone-900"
          }`}
        >
          {content}
        </div>
        <span className="text-neutral-300/75 text-xs font-medium">
          {format(timestamp, "p PP")}
        </span>
      </div>
    </div>
  );
};
