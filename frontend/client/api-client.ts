import { MessagePayload, MessageResponse } from "../model/message";

class ApiClient {
  private callbacks: Map<
    string,
    { resolve: (value: unknown) => void; reject: (reason: Error) => void }
  > = new Map();

  constructor() {
    window.addEventListener('message', this.handleMessage.bind(this));
  }

  private handleMessage(event: MessageEvent<MessageResponse<unknown>>) {
    const { id, data, error } = event.data;

    if (this.callbacks.has(id)) {
      const { resolve, reject } = this.callbacks.get(id)!;

      if (error) {
        reject(new Error(error));
      } else {
        resolve(data);
      }

      this.callbacks.delete(id);
    }
  }

  /**
   * API 요청 메서드
   * @param eventType 이벤트 타입
   * @param payload 요청 데이터
   * @returns Promise로 응답 반환
   */
  public get<RequestType = unknown, ResponseType = unknown>(
    eventType: string,
    payload?: RequestType
  ): Promise<ResponseType> {
    const id = crypto.randomUUID();
    const message: MessagePayload<RequestType> & { id: string } = { id, eventType, payload };

    return new Promise<ResponseType>((resolve, reject) => {
      this.callbacks.set(id, { resolve: resolve as (value: unknown) => void, reject: reject as (reason: Error) => void });

      window.parent.postMessage(message, '*');

      setTimeout(() => {
        if (this.callbacks.has(id)) {
          this.callbacks.delete(id);
          reject(new Error('ETIMEOUT'));
        }
      }, 5000);
    });
  }
}

const apiClient = new ApiClient();

export default apiClient;
