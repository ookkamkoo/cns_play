import axios from 'axios';
import { getToken } from '~/auth/authToken'

export interface Bank {
    id: number;
    name: string;
    image: string;
    code: string;
    color: string;
    short: string;
    priority: number;
    show: boolean;
    status: boolean;
  }
  
  export interface CreatedBySearch {
    id: number;
    name: string;
  }
  
  export interface Detail {
    keyID: string;
    TureID: string;
    bankPin: string;
    Password: string;
    Username: string;
    devicesID: string;
  }
  
  export interface BankSystem {
    id: number;
    type: string;
    bank_id: number;
    bank: Bank;
    bank_type: string;
    name: string;
    book_number: string;
    balance: number;
    image: string;
    detail: Detail;
    is_active: boolean;
    created_by: number;
    CreatedBySearch: CreatedBySearch;
    created_at: string;
    updated_by: number;
    UpdatedBySearch: CreatedBySearch;
    updated_at: string;
  }
  
  export interface Response {
    status: string;
    message: string;
    data: any;
    error?: string;
    time: string;
  }
  

  export async function getBankSystem(): Promise<Response> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
  
    try {
      const response = await axios.get<Response>(`${url}/api/getSystemBank`,{ headers });
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