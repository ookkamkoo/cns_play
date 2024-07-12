import { HomeOutlined,UserOutlined,CarryOutOutlined,GiftOutlined,RocketOutlined,DollarOutlined,ClockCircleOutlined,UsergroupAddOutlined,CommentOutlined,SoundOutlined,LogoutOutlined } from '@ant-design/icons-vue';

export const gameCategories = [
        {name:'sportsbook',nameTH:'กีฬา',nameEN:'sportsbook'},
        {name:'live-casino',nameTH:'คาสิโนสด',nameEN:'casino'},
        {name:'slot-game',nameTH:'สล็อตเกมส์',nameEN:'SLOT'},
        {name:'fish-hunter',nameTH:'เกมส์ยิงปลา',nameEN:'fish-hunter'},
        {name:'game-card',nameTH:'เกมส์การ์ด',nameEN:'game-card'},
        {name:'lotto',nameTH:'หวย',nameEN:'lotto'},
        {name:'e-sport',nameTH:'อีสปอร์ต',nameEN:'e-sport'},
        {name:'poker-game',nameTH:'โป๊กเกอร์',nameEN:'poker-game'},
        {name:'keno',nameTH:'คีโน',nameEN:'keno'},
        {name:'crypto-tradding',nameTH:'เทรด',nameEN:'crypto-tradding'},
]

export const sidebarItems = [
    {name: 'หน้าเเรก',path:'/',image:"/img/home.png" },
    {name: 'สล็อตเกม',path:'/lobby/slot-game',image:"/img/slot.png" },
    {name: 'คาสิโนสด',path:'/lobby/live-casino',image:"/img/casino.png" },
    {name: 'ยิงปลา',path:'/lobby/fish-hunter',image:"/img/shootfish.png" },
    {name: 'กีฬา',path:'/lobby/sportsbook',image:"/img/sport.png" },
    {name: 'โปรโมชั่น',path:'/information/promotion',image:"/img/promotion.png" },
    {name: 'คืนยอดเสีย',path:'/cashback',image:"/img/cashback.png" },
    {name: 'ฝากประจำ',path:'/dailytopup',image:"/img/dailytopup.png" },
    {name: 'กงล้อ',path:'/wheel',image:"/img/wheel.png" },
    {name: 'เเนะนำเพื่อน',path:'/affiliated',image:"/img/affiliated.png" },
];


export const menuList = [
    {name: 'หน้าเเรก',path:'/',icon: HomeOutlined,show:1 },
    {name: 'ข้อมูลส่วนตัว',path:'/information/profile',icon:UserOutlined,show:1 },
    // {name: 'ฝากประจำ',path:'/information/daily',icon:CarryOutOutlined,show:1},
    // {name: 'หมุนเสี่ยงโชค',path:'/information/',icon:RocketOutlined,show:1},
    {name: 'โปรโมชั่น',path:'/information/promotion',icon: GiftOutlined,show:1 },
    {name: 'คืนยอดเสีย',path:'/information/return-credit',icon: DollarOutlined,show:1},
    {name: 'ประวัติการทำรายการ',path:'/information/transaction',icon: ClockCircleOutlined,show:1 },
    {name: 'เเนะนำเพื่อน',path:'/information/affiliate',icon: UsergroupAddOutlined,show:1 },
    {name: 'ประกาศ',path:'/information/notify',icon:SoundOutlined,show:3},
    {name: 'ติดต่อเรา',path:'https://line.me/R/ti/p/@090ezasd?oat_content=url',icon: CommentOutlined,show:1},
    {name: 'ออกจากระบบ',path:'/dailytopup',icon: LogoutOutlined,show:0 },
];