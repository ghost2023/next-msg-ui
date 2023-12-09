export type Message = {
  id: string; // the pk of the message
  content: string;
  timestamp: Date;
  sender: string; // user id
  read: boolean; // whether the message has been read
  conversationId: string; // the pk of the conversation
};

export type User = {
  id: string;
  name: string;
};

export type Conversation = {
  id: string;
  participants: User[];
  pinned?: string;
};
