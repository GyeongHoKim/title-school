interface MessagePayload<T = unknown> {
  eventType: string;
  payload?: T;
}

interface MessageData {
  id: string;
  data: {
    postId: string;
    imageUrl: string;
    caption: string;
  };
}

interface MessageResponse<T> {
  type: string;
  data: {
    message: {
      id: string;
      data: T;
      error?: string;
    };
  };
}

export type { MessagePayload, MessageData, MessageResponse };