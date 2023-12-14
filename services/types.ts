export type Message = {
  id: string; // the pk of the message
  content: string;
  timestamp: Date;
  sender: string; // user id
  read: boolean; // whether the message has been read
  conversationId: string; // the pk of the conversation
  isDeleted?: boolean;
  replyTo?: string; // id of the reply
};

export type User = {
  id: string;
  name: string;
  lastOnline: Date;
};

export type Conversation = {
  id: string;
  participants: User[];
  pinned?: string;
};

export type Challenge = {
  id: string;
  name: string;
  timestamp: Date;
  description: string;
  sponsorNum: number;
  totalEarned: number;
  timeTaken: number; // in min
  author: {
    id: string;
    name: string;
    avatar: string;
  };
};

export type Hack = {
  name: string;
  moneyMin: number;
  moneyMax: number;
  startTime: Date;
  endTime: Date;
  author: {
    name: string;
    avatar: string;
  };
};
