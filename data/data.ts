// import { memberStore } from '~/store/index';
import { HomeOutlined,UserOutlined,CarryOutOutlined,GiftOutlined,RocketOutlined,DollarOutlined,ClockCircleOutlined,UsergroupAddOutlined,CommentOutlined,SoundOutlined,LogoutOutlined } from '@ant-design/icons-vue';
// const member = memberStore();

export const gameCategories = [
        {name:'sportsbook',nameTH:'กีฬา',nameEN:'SPORTSBOOK'},
        {name:'live-casino',nameTH:'คาสิโนสด',nameEN:'CASINO'},
        {name:'slot-game',nameTH:'สล็อตเกมส์',nameEN:'SLOT'},
        {name:'fish-hunter',nameTH:'เกมส์ยิงปลา',nameEN:'FISH'},
        {name:'game-card',nameTH:'เกมส์การ์ด',nameEN:'CARD'},
        {name:'lotto',nameTH:'หวย',nameEN:'LOTTO'},
        {name:'e-sport',nameTH:'อีสปอร์ต',nameEN:'ESPORT'},
        {name:'poker-game',nameTH:'โป๊กเกอร์',nameEN:'POKER'},
        {name:'keno',nameTH:'คีโน',nameEN:'KENO'},
        {name:'crypto-tradding',nameTH:'เทรด',nameEN:'TRADE'},
]

export const sidebarItems = [
    {name: 'หน้าเเรก',path:'/',image:"/img/home.png" },
    {name: 'สล็อตเกม',path:'/lobby/slot-game',image:"/img/slot.png" },
    {name: 'คาสิโนสด',path:'/lobby/live-casino',image:"/img/casino.png" },
    {name: 'ยิงปลา',path:'/lobby/fish-hunter',image:"/img/shootfish.png" },
    {name: 'กีฬา',path:'/lobby/sportsbook',image:"/img/sport.png" },
    {name: 'การ์ด',path:'/lobby/game-card',image:"/img/card.png" },
    {name: 'หวย',path:'/lobby/loto',image:"/img/lotto.png" },
    {name: 'อีสปอร์ต',path:'/lobby/e-sport',image:"/img/esport.png" },
    {name: 'โป๊กเกอร์',path:'/lobby/poker-game',image:"/img/poker.png" },
    {name: 'คีโน',path:'/lobby/keno',image:"/img/keno.png" },
    {name: 'เทรด',path:'/lobby/crypto-tradding',image:"/img/trad.png" },
    // {name: 'โปรโมชั่น',path:'/information/promotion',image:"/img/promotion.png" },
    // {name: 'คืนยอดเสีย',path:'/information/return-credit',image:"/img/cashback.png" },
    // {name: 'ฝากประจำ',path:'/dailytopup',image:"/img/dailytopup.png" },
    // {name: 'กงล้อ',path:'/wheel',image:"/img/wheel.png" },
    // {name: 'เเนะนำเพื่อน',path:'/information/recommend',image:"/img/affiliated.png" },
];


export const menuList = [
    {name: 'หน้าเเรก',path:'/',icon: HomeOutlined,show:1 },
    {name: 'ข้อมูลส่วนตัว',path:'/information/profile',icon:UserOutlined,show:1 },
    // {name: 'ฝากประจำ',path:'/information/daily',icon:CarryOutOutlined,show:1},
    // {name: 'หมุนเสี่ยงโชค',path:'/information/',icon:RocketOutlined,show:1},
    {name: 'โปรโมชั่น',path:'/information/promotion',icon: GiftOutlined,show:1 },
    {name: 'คืนยอดเสีย',path:'/information/return-credit',icon: DollarOutlined,show:1},
    {name: 'ประวัติการทำรายการ',path:'/information/transaction',icon: ClockCircleOutlined,show:1 },
    {name: 'เเนะนำเพื่อน',path:'/information/recommend',icon: UsergroupAddOutlined,show:1 },
    // {name: 'พันธมิตร',path:'/information/recommend',icon: UsergroupAddOutlined,show:1 },
    {name: 'ประกาศ',path:'/information/notify',icon:SoundOutlined,show:3},
    {name: 'ติดต่อเรา',icon: CommentOutlined,show:1},
    {name: 'ออกจากระบบ',path:'#',icon: LogoutOutlined,show:0 },
];