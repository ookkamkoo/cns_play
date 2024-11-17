import axios from 'axios';
import { getToken } from '~/auth/authToken'


export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }
  
export async function getNotifyServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/notify`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}