import { Conversation, Message, User } from "./types";

export const users: User[] = [
  {
    id: "1",
    name: "Jane Doe",
  },
  {
    id: "2",
    name: "John Doe",
  },
];

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
  messages.splice(
    messages.findIndex((m) => m.id == messageId),
    1,
  );
};

export const editMessage = async (message: Message) => {
  messages[messages.findIndex((m) => m.id == message.id)] = message;
};

export const pinMessage = async (conversationId: string, messageId: string) => {
  conversations[conversations.findIndex((c) => c.id == conversationId)].pinned =
    messageId;
};
