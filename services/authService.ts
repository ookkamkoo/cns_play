import axios from 'axios';
import { memberStore } from '~/store/index';
import type { MemberDetail } from '~/store/typeMember';
import { getToken } from '~/auth/authToken'

const member = memberStore();

export interface UserData {
  id: string;
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
  console.log("config =", JSON.stringify(config));
  console.log("url = "+url);

  try {
    const response = await axios.post<LoginResponse>(`${url}/api/login`, { username, password });
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
      `${url}/api/check-token`,
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

export async function register(data: any): Promise<LoginResponse> {
  const config = useRuntimeConfig();
  const url = config.public.apiServer;

  const headers = {
      Authorization: `Bearer ${getToken()}`
  };

  var body = {
    "username":data.username,
    "password":data.password,
    "bank_id":data.bankId,
    "bank_no":data.book_bank,
    "bank_true_id":data.bankTrueId,
    "bank_true_no":data.book_true_no,
    "marketing_id":data.marketingId,
    "line_id":data.line_id,
    "firstname":data.name,
    "lastname":data.lastname,
  }
  try {
    const response = await axios.post<LoginResponse>(`${url}/api/register`,body,{ headers });
    console.log();
    
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
