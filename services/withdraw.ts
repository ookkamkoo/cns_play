import axios from 'axios';
import { getToken } from '~/auth/authToken'

export interface getResponse {
    status: string;
    data: any;
    message: string;
    error: string;
    time: string;
  }


export async function withdrawServices(amount :number ,withdraw_with:string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    var body = {
        "amount": amount,
        "withdraw_with": withdraw_with,
    }

    try {
        const response = await axios.post<getResponse>(`${url}/api/withdraw`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}