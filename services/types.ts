export type Message = {
  id: string; // the pk of the message
  content: string;
  timestamp: Date;
  sender: string; // user id
  read: boolean; // whether the message has been read
  conversationId: string; // the pk of the conversation
  isDeleted?: boolean;
  replyTo?: string // id of the reply
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
