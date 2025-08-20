import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

export type AuthContextType = {
  token: string;
  storeUserInfo: (token: string, userInfo: UserInfo) => void;
  serverCall: (params: ServerCallType) => unknown;
  getRequest: QueryFunction<unknown, QueryKey, never>;
  isUserLoggedIn: boolean;
  logout: () => void;
  userInfo: UserInfo | undefined;
};

export type ServerCallType<T = Record<string, any>> = {
  entity: string;
  data?: T;
  method: THttpMethods;
  // method: AXIOS
} & Partial<AxiosRequestConfig>;

export type THttpMethods = 'get' | 'post' | 'delete' | 'put' | 'patch';

export type LoggedInUser = {
  fullName: string;
  username: string;
  companyId: number;
  companyName: string;
};

export type LoginItems = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: UserInfo;
};

export type SignUpResponse = {
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type UserInfo = {
  id: number;
  name: string;
  email: string;
  status: 'notfill' | 'fill';
};

type LoginError = {
  error: string;
};
