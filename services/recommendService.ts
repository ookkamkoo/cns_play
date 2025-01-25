import axios from 'axios';
import { getToken } from '~/auth/authToken'
  
  export interface Recommend {
    id: number;
    send_id: number;
    receive_id: number;
    username_send_id: string;
    username_receive_id: string;
    amount: number;
    bonus: number;
    amount_total: number;
    percent: number;
    refund_amount: number;
    date: string;
    bank: Bank;
    status: number;
    created_by: number;
    created_at: string;
    updated_by: number;
    updated_at: string;
  }

  export interface Bank {
      image: string;
  }

  // Define the structure of the response data
  export interface ResponseData {
    recommend_list: Recommend[];
    total_amount: number;
    member_regis: number;
  }

  // Define the structure of the entire response
  export interface Response {
    status: string;
    message: string;
    data: ResponseData;
    error: string;
    time: string;
  }
  

  export async function getRecommendServicesList(): Promise<Response> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.get<Response>(`${url}/api/getRecommend`,{ headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  
  export async function confirmRecomandServices(): Promise<Response> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.post<Response>(`${url}/api/confirmRecommend`,{},{ headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  export async function addTruewalletService(true_no: string): Promise<Response> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    var body = {
      bank_true: true_no
    }

    try {
      const response = await axios.post<Response>(`${url}/api/addTrueWallet`,body,{ headers });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }