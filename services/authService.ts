import axios from 'axios';
import { useRuntimeConfig } from '#app'; // Adjust import path as needed
import { memberStore } from '~/store/index';
import type { MemberDetail } from '~/store/typeMember';

const member = memberStore();

export interface UserData {
  username: string;
  token: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: UserData;
  error: string;
  time: string;
}

export interface CheckTokenResponse {
  status: string;
  message: string;
  data: MemberDetail;
  error: string;
  time: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const config = useRuntimeConfig();
  const url = config.public.apiServer;
  console.log("url = "+url);
  

  try {
    const response = await axios.post<LoginResponse>(`${url}/login`, { username, password });
    if(response.data.status == 'success'){
      if(await checkToken(response.data.data.token)){
        response.data
      }
    }
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function checkToken(token: string): Promise<boolean> {
  const config = useRuntimeConfig();
  const url = config.public.apiServer;

  try {
    const response = await axios.get<CheckTokenResponse>(
      `${url}/check-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.data.status === 'success') {
      member.setMemberDetail(response.data.data);
      member.setMemberLogin(false);
      return true;
    } else {
      member.setMemberLogin(true);
      return false;
    }
  } catch (error: any) {
    member.setMemberLogin(true);
    console.error('Error checking token:', error);
    return false;
  }
}
