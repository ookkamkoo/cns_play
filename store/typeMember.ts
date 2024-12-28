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

  export interface SettingDF {
    bgColor: string;
    bgImage: string;
    bgImageSw: string;
    checkDuplicateName: string;
    clearWithdrawMin: string;
    depositFee: string;
    depositMax: string;
    depositMin: string;
    depositStatus: string;
    depostDetail: string;
    description: string;
    getName: string;
    imageLogoWebsite: string;
    imageWebsite: string;
    keyword: string;
    memberCreateDeposit: string;
    product: string;
    registerStatus: string;
    registerTruewallet: string;
    serverStatus: string;
    title: string;
    tranferAuto: string;
    turnWithdrawNormal: string;
    type2factor: string;
    typeDepositFee: string;
    typeDepositFeeAmountOrPerCent: string;
    typeWithdrawFee: string;
    typeWithdrawFeeAmountOrPerCent: string;
    websiteLine: string;
    websiteUrl: string;
    withdrawAll: string;
    withdrawAround: string;
    withdrawAuto: string;
    withdrawDetail: string;
    withdrawFee: string;
    withdrawMax: string;
    withdrawMaxDay: string;
    withdrawMin: string;
    withdrawStatus: string;
    recommend: string;
    typeRecommend: string;
    recommendPercent: string;
    recommendTurn: string;
    recommendMin: string;
    recommendMax: string;
    typeRecommendDate: string;
    recommendDate: string;
  }

  export interface GameMenuItem {
    id: number;
    name: string;
    name_th: string;
    icon: string;
    ref: string;
    image: string;
    priority: number;
    is_active: boolean;
  }

  export interface News {
    id: number;
    name: string;
    priority: number;
    image: string;
    is_active: boolean;
    created_by: number;
    created_by_name: string;
    created_at: string;
    updated_by: number;
    updated_by_name: string;
    updated_at: string;
  }

  export interface Game {
    id: number;           // รหัสเกม
    image: string;        // URL ของรูปภาพ
    is_active: boolean;   // เกมเปิดใช้งานอยู่หรือไม่
    loby: boolean;        // เป็นเกมในล็อบบี้หรือไม่
    name: string;         // ชื่อเกม
    priority: number;     // ลำดับความสำคัญของเกม
    productCode: string;  // โค้ดของผลิตภัณฑ์
    provider: string;     // ผู้ให้บริการเกม
    type: string;         // ประเภทเกม เช่น SPORTSBOOK, CASINO
  }

  export interface GameRecommend {
    id: number; // รหัสเกม
    game_code: string; // โค้ดเกม
    hot: boolean; // เกมยอดนิยมหรือไม่
    image: string; // URL รูปภาพของเกม
    is_active: boolean; // เกมเปิดใช้งานหรือไม่
    launch_code: string; // โค้ดสำหรับการเปิดเกม
    maintain: boolean; // อยู่ในสถานะบำรุงรักษาหรือไม่
    name: string; // ชื่อเกม
    pg_status: boolean; // สถานะ PG ของเกม
    priority: number; // ลำดับความสำคัญ
    product_code: string; // โค้ดของผลิตภัณฑ์
    provider: string; // ผู้ให้บริการเกม
    status: number; // สถานะเกม (เช่น 1 = Active, 2 = Inactive)
    type: string; // ประเภทเกม เช่น SLOT, CASINO
    updated_at: string; // วันที่และเวลาที่อัปเดตล่าสุด (ISO Format)
    updated_by: number; // รหัสผู้ที่อัปเดต
    updated_by_name: string; // ชื่อผู้ที่อัปเดต
  }

  export interface GameCategory {
    category: string;
    games: Game[];
}
  