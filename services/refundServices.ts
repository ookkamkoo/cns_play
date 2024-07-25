import axios from 'axios';
import { getToken } from '~/auth/authToken'

export interface RefundItem {
    id: number;
    user_id: number;
    username: string;
    refund_amount: number;
    date: string;
    is_active: boolean;
    created_by: number;
    created_at: string;
    updated_by: number;
    updated_at: string;
}

export interface GetRefundResponse {
    status: string;
    data: {
        dataList: RefundItem[];
        refund: number;
    };
    message: string;
    error?: string;
    time: string;
}


export async function getRefundCreditServices(): Promise<GetRefundResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<GetRefundResponse>(`${url}/api/getRefundCredit`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function confirmRefundCreditServices(): Promise<GetRefundResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<GetRefundResponse>(`${url}/api/confirmRefundCredit`,{}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}