import axios from 'axios';
import { getToken } from '~/auth/authToken'
// import dayjs, { Dayjs } from 'dayjs';
// import type { MemberDetail } from './typeMember';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }

export async function getDetailconfigMember(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    console.log(url);
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/detail-config`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getNameServices(bank_id :number ,bank_no:string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    var body = {
        "bank_id": bank_id,
        "bank_no": bank_no,
    }
    
    try {
        const response = await axios.post<getResponse>(`${url}/getName`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}