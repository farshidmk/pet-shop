export type ApiCallResponse<T = unknown> = {
  data: T;
  success: boolean;
  messages: string;
};

export type ServerLoginError = {
  error: string;
  success: string;
  errorCode: number;
};
