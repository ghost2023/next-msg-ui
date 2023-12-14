import { Challenge, Conversation, Hack, Message, User } from "./types";

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
  {
    id: "3",
    name: "Jim Doe",
    lastOnline: new Date(),
  },
  {
    id: "4",
    name: "Jill Doe",
    lastOnline: new Date(),
  },
  {
    id: "5",
    name: "Jack Doe",
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
  {
    id: "7",
    content: "Great",
    timestamp: new Date(),
    sender: "1",
    read: false,
    conversationId: "1",
  },
];

const conversations: Conversation[] = [
  {
    id: "1",
    participants: [users[0], users[1]],
    pinned: "1",
  },
  {
    id: "2",
    participants: [users[0], users[2]],
  },
  {
    id: "3",
    participants: [users[0], users[3]],
  },
  {
    id: "4",
    participants: [users[0], users[4]],
  },
];

export const getConversations = async (uid: string) => {
  return conversations.filter((c) => c.participants.some((u) => u.id == uid));
};

export const getMessages = async (conversationId: string) => {
  return messages.filter((m) => m.conversationId == conversationId).reverse();
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

const challenges: Challenge[] = [
  {
    id: "1",
    name: "Challenge 1",
    timestamp: new Date(),
    description: "Challenge 1 description",
    sponsorNum: 10,
    totalEarned: 100,
    timeTaken: 10,
    author: {
      id: "1",
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/300",
    },
  },
  {
    id: "2",
    name: "Challenge 2",
    timestamp: new Date(),
    description: "Challenge 2 description",
    sponsorNum: 20,
    totalEarned: 200,
    timeTaken: 20,
    author: {
      id: "2",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/300",
    },
  },
  {
    id: "3",
    name: "Challenge 3",
    timestamp: new Date(),
    description: "Challenge 3 description",
    sponsorNum: 30,
    totalEarned: 300,
    timeTaken: 30,
    author: {
      id: "3",
      name: "Jack Doe",
      avatar: "https://i.pravatar.cc/300",
    },
  },
  {
    id: "4",
    name: "Challenge 4",
    timestamp: new Date(),
    description: "Challenge 4 description",
    sponsorNum: 40,
    totalEarned: 400,
    timeTaken: 40,
    author: {
      id: "4",
      name: "Jill Doe",
      avatar: "https://i.pravatar.cc/300",
    },
  },
  {
    id: "5",
    name: "Challenge 5",
    timestamp: new Date(),
    description: "Challenge 5 description",
    sponsorNum: 50,
    totalEarned: 500,
    timeTaken: 50,
    author: {
      id: "5",
      name: "Jim Doe",
      avatar: "https://i.pravatar.cc/300",
    },
  },
];

export function getChallengeHistory(): Promise<Challenge[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(challenges);
    }, 1000);
  });
}

const hacks: Hack[] = [
  {
    name: "Hack 1",
    moneyMin: 100,
    moneyMax: 200,
    startTime: new Date(),
    endTime: new Date(),
    author: {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/300",
    },
  },
  {
    name: "Hack 2",
    moneyMin: 200,
    moneyMax: 300,
    startTime: new Date(),
    endTime: new Date(),
    author: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/300",
    },
  },
  {
    name: "Hack 3",
    moneyMin: 300,
    moneyMax: 400,
    startTime: new Date(),
    endTime: new Date(),
    author: {
      name: "Jack Doe",
      avatar: "https://i.pravatar.cc/300",
    },
  },
  {
    name: "Hack 4",
    moneyMin: 400,
    moneyMax: 500,
    startTime: new Date(),
    endTime: new Date(),
    author: {
      name: "Jill Doe",
      avatar: "https://i.pravatar.cc/300",
    },
  },
  {
    name: "Hack 5",
    moneyMin: 500,
    moneyMax: 600,
    startTime: new Date(),
    endTime: new Date(),
    author: {
      name: "Jim Doe",
      avatar: "https://i.pravatar.cc/300",
    },
  },
];

export const getHacks = async () => { console.log('fetching');return hacks};
