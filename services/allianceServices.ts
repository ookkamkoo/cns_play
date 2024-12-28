import axios from 'axios';
import { getToken } from '~/auth/authToken'
import dayjs from 'dayjs';
// import dayjs, { Dayjs } from 'dayjs';
// import type { MemberDetail } from './typeMember';

export interface getResponse {
    status: string;
    data: any;
    message: string;
    error: string;
    time: string;
  }

export async function getListAliianceServices(data :any,ref :string,token :string,permission :string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    console.log(url);
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:ss');
    const queryParams = [
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`,
        `ref=${ref}`,
        `token=${token}`,
        `permission=${permission}`,
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/api/getDashboardAlliance?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getMemberListAliianceServices(data :any,ref :string,token :string,permission :string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    console.log(url);
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:ss');
    const queryParams = [
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`,
        `ref=${ref}`,
        `token=${token}`,
        `permission=${permission}`,
        
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/api/getMemberAlliance?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getMemberProfitServices(data :any,ref :string,token :string,permission :string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    console.log(url);
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:ss');
    const queryParams = [
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`,
        `ref=${ref}`,
        `token=${token}`,
        `permission=${permission}`,
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/api/getMemberProfitAllianceServices?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}


export async function getFirstDepositListAliianceServices(data :any,ref :string,token :string,permission :string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    console.log(url);
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:ss');
    const queryParams = [
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`,
        `ref=${ref}`,
        `token=${token}`,
        `permission=${permission}`,
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/api/getMemberFirstDepositAlliance?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function getMemberListGameAliianceServices(data :any,ref :string,token :string,permission :string): Promise<getResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;
    console.log(url);
    
    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    let dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
    let timeStart = dayjs(data.timeStart).format('HH:mm:ss');
    let dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
    let timeEnd = dayjs(data.timeEnd).format('HH:mm:ss');
    const queryParams = [
        `dateStart=${dateStart}`,
        `timeStart=${timeStart}`,
        `dateEnd=${dateEnd}`,
        `timeEnd=${timeEnd}`,
        `page=${data.page}`,
        `pageSize=${data.pageSize}`,
        `ref=${ref}`,
        `token=${token}`,
        `permission=${permission}`,
    ];
    const search = queryParams.join('&');

    try {
        const response = await axios.get<getResponse>(`${url}/api/getMemberGameAllianceServices?`+search, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}