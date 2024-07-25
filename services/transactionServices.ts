import axios from 'axios';
import { getToken } from '~/auth/authToken'
  
export interface TransactionData {
    id: number;
    member_id: number;
    Trasaction_id: number;
    username: string;
    action: number;
    amount_before: number;
    amount: number;
    amount_after: number;
    image: string;
    bank_id: number;
    date_bank: string; 
    bank_no: string;
    bank_slip: string; 
    remark: string;
    status: number;
    create_timestramp: number;
    created_by: number;
    created_at: string;
    updated_by: number;
    updated_at: string;
}

  export interface GetTrasactionResponse {
    status: string;
    data: any;
    message: string;
    error?: string;
    time: string;
  }


export async function getTransactionServices(action :number): Promise<GetTrasactionResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<GetTrasactionResponse>(`${url}/api/getTransaction/${action}`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}