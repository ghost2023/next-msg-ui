import { Conversation, Message, User } from "./types";

export const users: User[] = [
  {
    id: "1",
    name: "Jane Doe",
    lastOnline: new Date(),
  },
  {
    id: "2",
    name: "John Doe",
    lastOnline: new Date(),
  },
];

export const currentUser = users[0];

const messages: Message[] = [
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
    id: "3",
    content: "How are you?",
    timestamp: new Date(),
    sender: "1",
    read: false,
    conversationId: "1",
  },
  {
    id: "4",
    content: "I am good",
    timestamp: new Date(),
    sender: "2",
    read: false,
    conversationId: "1",
  },
  {
    id: "5",
    content: "What about you?",
    timestamp: new Date(),
    sender: "1",
    read: false,
    conversationId: "1",
  },
  {
    id: "6",
    content: "I am also good",
    timestamp: new Date(),
    sender: "2",
    read: false,
    conversationId: "1",
  },
];

const conversations: Conversation[] = [
  {
    id: "1",
    participants: users,
    pinned: "1",
  },
];

export const getConversations = async (uid: string) => {
  return conversations.filter((c) => c.participants.some((u) => u.id == uid));
};

export const getMessages = async (conversationId: string) => {
  return messages.filter((m) => m.conversationId == conversationId);
};

export const getUser = async (uid: string) => {
  return users.find((u) => u.id == uid);
};

export const sendMessage = async (message: Message) => {
  messages.push(message);
};

export const deleteMessage = async (messageId: string) => {
  messages.map((m) =>
    m.id != messageId
      ? m
      : { ...m, isDeleted: true, content: "Deleted Message" },
  );
};

export const editMessage = async ({
  msgId,
  content,
}: {
  msgId: string;
  content: string;
}) => {
  messages.map((m) => (m.id == msgId ? { ...m, content } : m));
};

export const pinMessage = async (conversationId: string, messageId: string) => {
  conversations[conversations.findIndex((c) => c.id == conversationId)].pinned =
    messageId;
};
