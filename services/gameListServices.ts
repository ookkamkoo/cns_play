import axios from 'axios';
import { getToken } from '~/auth/authToken'


export interface getResponse {
    status: string;
    data: any;
    message: string;
    time: string;
  }
  
export async function getProviderGameList(data:string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/getProviderGameList/${data}`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getGameRecommend(): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/getGameRecommend`, { headers });
        
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getGameList(data:string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<getResponse>(`${url}/api/getGameList/${data}/${data}`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function launchGameService(code:string,provider:string,deviceType:string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };
    
    var body = {
        "gameCode": code,
        "language": "th",
        "deviceType": deviceType,
    }
    
    try {
        const response = await axios.post<getResponse>(`${url}/api/launchGames/${provider}`,body, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}