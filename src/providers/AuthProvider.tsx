import {
  type MutationFunction,
  QueryClient,
  QueryClientProvider,
  type QueryFunction,
  type QueryKey,
} from '@tanstack/react-query';
import { AxiosError, type AxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import useCookie from 'react-use-cookie';
import { api } from '../services/api';
import type { AuthContextType, ServerCallType, UserInfo } from '../types/auth';
import type { ApiCallResponse } from '../types/server';
interface Props {
  children: React.ReactNode;
}

type TDecodedToken = {
  iat: number;
  exp: number;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useCookie('token', '');
  const [userInfo, setUserInfo] = useCookie('userInfo', '');
  // const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  // useEffect(() => {
  //   if (token) {
  //     const decodedToken: TDecodedToken = jwtDecode(token);
  //     setUserInfo({
  //       id: decodedToken.fullName,
  //       name: decodedToken[MS_NAME_CLAIM],
  //       accYear: decodedToken.accYear,
  //     });
  //   }
  // }, [token]);

  function storeUserInfo(token: string, userInfo: UserInfo) {
    const decodedToken: TDecodedToken = jwtDecode(token);
    const tempDay = getExpireDate(decodedToken);
    setToken(token, {
      days: tempDay,
    });
    setUserInfo(JSON.stringify(userInfo), { days: tempDay });
  }

  function logout() {
    console.log('first');
    setToken('');
    setUserInfo('');
  }

  const serverCall: MutationFunction<unknown, unknown> = async (variables) => {
    const { entity, method, data = {}, ...axiosVariables } = variables as ServerCallType;
    try {
      const requestOptions: AxiosRequestConfig = {
        url: entity,
        method,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        data,
        ...axiosVariables,
      };
      const response = await api({ ...requestOptions });
      if (response?.status === 200 || response.status === 201) {
        return response?.data;
      } else if (response?.status === 204) {
        return { data: { rows: [] } };
      } else {
        throw new Error(`Error on operation... - ${response?.statusText}`);
      }
    } catch (e) {
      if (isServerError(e) && e.response?.status === 400) {
        const tempError = e.response.data;
        throw tempError;
      }
      if (isServerError(e) && e.response?.data) {
        throw e.response.data;
      }
      throw e || new Error(`Error on Fetching Data`);
    }
  };

  const getRequest: QueryFunction<unknown, QueryKey, never> = async ({ queryKey }: { queryKey: QueryKey }) => {
    let tempEntity = '';
    if (Array.isArray(queryKey)) {
      tempEntity = queryKey.join('/');
    }
    tempEntity = String(tempEntity);
    try {
      return await serverCall({ entity: tempEntity, method: 'get' });
    } catch (error: any) {
      throw error?.message || new Error(`Error on Fetching Data`);
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        queryFn: getRequest,
      },
      mutations: {
        mutationFn: serverCall,
      },
    },
  });

  return (
    <AuthContext.Provider
      value={{
        token,
        storeUserInfo,
        serverCall,
        getRequest,
        isUserLoggedIn: !!token,
        logout,
        userInfo: JSON.parse(userInfo || '{}'),
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// function getExpireDate(token: string) {
//   const DAY_IN_MILLISECONDS = 86400000;
//   const decoded: TDecodedToken = jwtDecode(token);
//   const expire = decoded.exp * 1000; // convert to miliseconds
//   const now = new Date().getTime(); // get current time
//   const result = (expire - now) / DAY_IN_MILLISECONDS; // get expire time base on milisecond in day
//   return result;
// }
function getExpireDate(decodedToken: TDecodedToken) {
  const DAY_IN_MILLISECONDS = 86400000;
  // const decoded: TDecodedToken = jwtDecode(decoded);
  const expire = decodedToken.exp * 1000; // convert to miliseconds
  const now = new Date().getTime(); // get current time
  const result = (expire - now) / DAY_IN_MILLISECONDS; // get expire time base on milisecond in day
  return result;
}

function isServerError(obj: any): obj is AxiosError<ApiCallResponse> {
  return typeof obj === 'object' && obj !== null && 'response' in obj;
}
