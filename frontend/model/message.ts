interface MessagePayload<T = unknown> {
  eventType: string;
  payload?: T;
}

interface MessageResponse<T = unknown> {
  id: string;
  data?: T;
  error?: string;
}

export type { MessagePayload, MessageResponse };