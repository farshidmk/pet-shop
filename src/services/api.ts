import axios from "axios";
import { API_URL } from "../global";

export const api = axios.create({
  baseURL: API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export async function unAuthorizedRequestHandler<T, K = any>({
  data,
  entity,
  headers,
}: UnAuthorizedRequestParam<T>): Promise<K> {
  return api.post(entity, data, { headers });
}

export type UnAuthorizedRequestParam<T> = {
  entity: string;
  data: T;
  headers?: any;
};
