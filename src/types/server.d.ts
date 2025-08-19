export type ApiCallResponse<T = unknown> = {
  data: T;
  success: boolean;
  messages: string;
};

export type ServerError400 = {
  ErrorMessage: string;
  PropertyName: string;
};
