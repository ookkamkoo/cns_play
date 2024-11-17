import axios from 'axios';
import { getToken } from '~/auth/authToken'

export interface Promotion {
    id: number;
    name: string;
    type: number;
    bonus_type: number;
    bonus_withdraw: number;
    type_open: number;
    open_data: string;
    time_open_close: number;
    time_open: string;
    time_close: string;
    low_deposit: number;
    limit_round: number;
    type_deposit: number;
    type_max_withDraw: number;
    condition_data: {
      bonus: number;
      amount: number;
      amountMaxWithDraw: number;
    };
    turn: {
      m2: number;
      game: number;
      keno: number;
      step: number;
      lotto: number;
      poker: number;
      casino: number;
      eSport: number;
      parlay: number;
      trading: number;
      football: number;
      multiplePlayer: number;
    };
    image: string;
    is_active: boolean;
    created_by: number;
    created_at: string;
    updated_by: number;
    updated_at: string;
  }

  
  
  export interface GetPromotionResponse {
    status: string;
    data: {
      promotions: Promotion[];           // Array of all promotions
      promotionsMember: Promotion | null; // Single promotion for the member, or null if not found
    };
    message: string;
    error?: string;
    time: string;
  }


export async function getPromotionServices(): Promise<GetPromotionResponse> {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;

    const headers = {
        Authorization: `Bearer ${getToken()}`
    };

    try {
        const response = await axios.get<GetPromotionResponse>(`${url}/api/getPromotion`, { headers });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function confirmPromotionServices(id:number): Promise<GetPromotionResponse> {
  const config = useRuntimeConfig();
  const url = config.public.apiServer;
  
  const headers = {
      Authorization: `Bearer ${getToken()}`
  };
  
  try {
      const response = await axios.post<GetPromotionResponse>(`${url}/api/confirmPromotion/`+id,{}, { headers });
      return response.data;
  } catch (error: any) {
      return error.response.data;
  }
}