import { QueryFunction } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import type { UserRole } from 'src/pages/auth/signUp/signUp.types';

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
  userId: number;
  email: string;
  role: UserRole;
  token: string;
};

export type UserInfo = {
  userId: number;
  name: string;
  email: string;
  role: UserRole;
};

type LoginError = {
  error: string;
};
