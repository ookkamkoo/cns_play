export interface Marketing {
    id: number;
    name: string;
    color: string;
    status: boolean;
  }
  
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
  
  export interface Agent {
    id: number;
    agent_id: number;
    username_agent: string;
    agent_name: string;
    is_agent: boolean;
    agent_percent: number;
    agent_company_percent: number;
    agent_type: number;
    is_active: boolean;
    is_block: boolean;
    remark_is_black: string;
  }
  
  export interface MemberDetail {
    id: number;
    username_agent: string;
    username: string;
    marketing_id: number;
    marketing: Marketing;
    bank_id: number;
    bank: Bank;
    bank_true_id: number;
    bank_true: Bank;
    promotion_id: number;
    firstname: string;
    lastname: string;
    bank_no: string;
    bank_true_no: string;
    line_id: string;
    balance: number;
    balance_event: number;
    agent_id: number;
    agent: Agent;
    is_agent: boolean;
    agent_name: string;
    agent_type: number;
    key_ref: string;
    last_ip_login: string;
    last_date_login_ts: number;
    last_date_login: string;
    last_active_ts: number;
    last_active_login: string;
    is_active: boolean;
    created_by: number;
    created_at: string;
  }