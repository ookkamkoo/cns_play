import axios from 'axios';
import { getToken } from '~/auth/authToken'


export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }
  
export async function getSettingSpinWheelServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/getSettingSpinWheel`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}
export async function getSettingCardServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/getSettingCard`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getSettingDailyLoginServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/getSettingDaily`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function spinWheelServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/api/spinWheel`,{}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function openCardServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.post<getResponse>(`${url}/api/openCard`,{}, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getDataSpinWheelServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/getDataSpinWheel`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getDataCardServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/getDataCard`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getTransactionSpinWheelServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/getTransactionSpinWheel`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getTransactionCardServices(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/getTransactionCard`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}
export async function claimDailyLogin(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/claimDailyLogin`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}