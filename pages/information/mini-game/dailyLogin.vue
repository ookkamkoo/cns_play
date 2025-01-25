<template>
    <div>
      <a-flex :justify="'space-between'" class="m-2 spin-text" :align="'center'">
        <h4>
          <NuxtLink to="/information/mini-game/listMiniGame" exact class="link-sidebar">
            <ArrowLeftOutlined /> กิจกรรมทั้งหมด
          </NuxtLink>
        </h4>
        <div style="white-space: nowrap;">
          เหรียญของคุณ {{ member.memberDetail.balance_event }} เหรียญ
        </div>
      </a-flex>
      <br />
      <h2 class="m-2 center jackpot">🎉 กิจกรรมล็อกอิน 🎉</h2>
      <!-- <div @click="getSettingDailyLogin()">asdasd</div> -->
      <a-flex style="max-width: 1100px; margin: 0 auto;" wrap="wrap">
        <a-col
          :span="12" :md="8" :xl="4"
          v-for="(day, index) in dataShow"
          :key="index"
          class="daily-login-card"
        >
            <div class="daily-login-card-list"           
             :class="{ 
                'claimed': day.status === 'login', 
                'waiting': day.status === 'wait',
                'no-login': day.status === 'no login' 
            }">
                <a-image v-if="day.status == 'login'" src="/img/icon_status/success.png" :width="60" :preview="false" class="my-2"/>
                <a-image v-else-if="day.status == 'no login'" src="/img/icon_status/fail.png" :width="60" :preview="false" class="my-2"/>
                <a-image v-else-if="day.status == 'wait'" src="/img/icon_status/wait.png" :width="60" :preview="false" class="my-2"/>
                <div class="day-header">{{ day.day }}</div>
                <div class="reward m-2">{{ day.reward }}</div>
                <div v-if="day.status == 'login'" style="margin: 0.25rem;">
                        <a-button
                            v-if="day.claim == 'claim'"
                            type="primary"
                            class="claim-button"
                            :disabled="day.status !== 'login' || day.cliam_status"
                            @click="claimReward(index)"
                        >
                            {{ day.claimed ? 'Claimed' : 'Claim' }}
                        </a-button>
                        <div v-else class="m-2 text-12">ล็อกอินสำเร็จ</div>
                </div>
                <div v-else-if="day.status == 'no login'" class="m-2 text-12">
                        ไม่ได้ล็อกอิน
                </div>
                <div v-else-if="day.status == 'wait'" class="m-2 text-12">
                        ยังไม่ถึงเวลา
                </div>
                <!-- <div class="day-header">{{ day.day }}</div>
                <div class="reward">{{ day.reward }}</div>
                <div v-if="day.status == 'login'">
                        <a-button
                            v-if="day.claim == 'claim'"
                            type="primary"
                            :disabled="day.status !== 'login' || day.cliam_status"
                            @click="claimReward(index)"
                        >
                            {{ day.claimed ? 'Claimed' : 'Claim' }}
                        </a-button>
                        <div v-else>login success</div>
                </div>
                <div v-else-if="day.status == 'no login'">
                        login fail
                </div>
                <div v-else-if="day.status == 'wait'">
                        wait
                </div> -->
                
            </div>
        </a-col>
      </a-flex>
      <a-col class="m-2" style="max-width: 1100px; margin: 2rem auto;" >
        <h4>เงื่อนไข</h4>
        <p class="text-12">1. <span v-if="segments.loginMethod=='login'">Login ด้วยการเข้าใช้งาน login ปกติ</span> <span v-else >Login ด้วยการฝากเงินจำนวน {{ segments.loginAmount }} บาท</span> </p>
        <p class="text-12">2. ต้อง Login ให้ครบ {{segments.dayLogin}} ครัง <span v-if="segments.dailyLogin=='loginContinua'">ติดต่อกัน</span> ภายในระยะเวลา {{ segments.dayExpires }} วัน</p>
        <p class="text-12">3. ผลรางวัลคือ <span v-if="segments.prizeType == 'coin'">จำนวนเหรียญ {{segments.prizeResult}} เหรียญ</span><span>จำนวนเงิน {{segments.prizeResult}} บาท</span></p>
      </a-col>
    </div>
  </template>
  
  
  <script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { createVNode } from 'vue';
    import { Alert } from '~/components/alert/alertComponent';
    import { openCardServices,getDataCardServices,getSettingDailyLoginServices,getTransactionCardServices,claimDailyLogin } from "~/services/miniGameServices";
    import dayjs from 'dayjs';
    
    import { memberStore } from '~/store/index';
    const member = memberStore();

    const dataShow = ref<any[]>([]);
    const coin = ref<number>(0);
    const isLoading = ref<boolean[]>(Array(8).fill(false));
    const spinning = ref<boolean>(false);
    const segments = ref<Record<string, any>>({});

    const dailyRewards = ref([
        { reward: "10 Coins", claimed: false },
        { reward: "20 Coins", claimed: false },
        { reward: "30 Coins", claimed: false },
        { reward: "50 Coins", claimed: false },
        { reward: "100 Coins", claimed: false },
        { reward: "150 Coins", claimed: false },
        { reward: "200 Coins", claimed: false },
    ]);

    const claimReward = (index: number) => {
        // if (dataShow.value[index].status !== "login" || dataShow.value[index].claimed) return;
        //     dataShow.value[index].claimed = true;
            // console.log(`คุณรับรางวัล ${dataShow.value[index].reward}`);
            claim();

        };
    const claim = async () => {
        const data = await claimDailyLogin();
        if (data.status === 'success') {
            getSettingDailyLogin()
            showWinner(data.data.reward)
            if(data.data.rewar_form == "cash"){
                member.memberDetail.balance
            }else{
                member.memberDetail.balance_event
            }
        }else{
            Alert("error",data.message)
        }
    };
  
    // const openCard = async (index:number) => {
    //     const data = await openCardServices();
    //     if (data.status === 'success') {
    //         // targetIndex.value = data.data.i
    //         member.memberDetail.balance_event = data.data.coin
    //         showWinner(data.data.result)
    //     }else{
    //         Alert("error",data.message)
    //     }
    //     isLoading.value[index] = false;
    // };

    const showWinner = (winer:string) => {
        getDataSpinGame();
        Modal.confirm({
            title: winer+'?',
            icon: createVNode(ExclamationCircleOutlined),
            content: createVNode('div', { style: 'color:green;' }, winer),
            onOk() {
                console.log('OK');
                getTransactionCard();
            },
                onCancel() {
                console.log('Cancel');
            },
            class: 'test',
        });
    };

    const getDataSpinGame = async () => {
        const data = await getDataCardServices();
        if (data.status === 'success') {
            // targetIndex.value = data.data.i
            member.memberDetail.balance_event = data.data.coin
            member.memberDetail.balance = data.data.amount
            // spinWheel(data.data.i);
        }else{
            Alert("error",data.message)
        }
    };

    const getSettingDailyLogin = async () => {
        const data = await getSettingDailyLoginServices();
        if (data.status === 'success') {
            const configValue = data.data.data.config_value;
            coin.value = data.data.data.game_coin;
            segments.value = {
                dailyLogin: configValue.dailyLogin,
                dayExpires: configValue.dayExpires,
                dayLogin: configValue.dayLogin,
                loginAmount: configValue.loginAmount,
                loginMethod: configValue.loginMethod,
                prizeResult: configValue.prizeResult,
                prizeType: configValue.prizeType,
            };
            dataShow.value = data.data.day
        }else{
            Alert("error",data.message)
        }
    };

    const getTransactionCard = async () => {
        const data = await getTransactionCardServices();
        if (data.status === 'success') {
            // dataShow.value = data.data.transactions
        }
    };

    // const handleCardClick = async (index: number) => {
    //     // แสดง Modal เพื่อยืนยันการดำเนินการ
    //     Modal.confirm({
    //         title: 'คุณต้องการเปิดไพ่ใช่ไหม?',
    //         icon: createVNode(ExclamationCircleOutlined),
    //         content: createVNode('div', { style: 'color:red;' }, `ใช้ ${coin.value} เหรียญในการเปิดไพ่`),
    //         onOk: async () => {
    //             console.log('OK');
    //             console.log(spinning.value);
                
    //             if (spinning.value) {
    //                 Alert("error", "เกมส์กำลังดำเนินการอยู่");
    //             } else if (member.memberDetail.balance_event < coin.value) {
    //                 Alert("error", `จำนวนเหรียญขั้นต่ำที่ใช้ในการเปิดไพ่คือ ${coin.value}`);
    //             } else {
    //                 if (isLoading.value[index]) return; // ป้องกันการกดซ้ำ

    //                 // ตั้งค่าการโหลดเป็น true สำหรับการ์ดที่คลิก
    //                 isLoading.value[index] = true;

    //                 try {
    //                     // เรียกใช้ API หรือฟังก์ชันที่ต้องการ
    //                     // await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock การโหลด (2 วินาที)
    //                     // console.log(`Card ${index} clicked and processed.`);
    //                     // Alert("success", `คุณเปิดไพ่สำเร็จ!`);
    //                     await openCard(index);
    //                 } catch (error) {
    //                     console.error("Error:", error);
    //                     Alert("error", "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
    //                 }
    //             }
    //         },
    //         onCancel: () => {
    //             console.log('Cancel');
    //         },
    //         class: 'test',
    //     });
    // };


//   const showConfirm = () => {
//     Modal.confirm({
//         title: 'คุณต้องการหมุนกงล้อใช่ไหม?',
//         icon: createVNode(ExclamationCircleOutlined),
//         content: createVNode('div', { style: 'color:red;' }, `ใช้ `+coin.value+` เหรียญในการหมุน`),
//         onOk() {
//         console.log('OK');
//         // spinWheel();
//             if(spinning){
//                 Alert("error","เกมส์กำลังดำเนินการออกผล")
//             }else{
//                 if(member.memberDetail.balance_event < coin.value){
//                     Alert("error","จำนวนเหรียญขั้นต่ำที่ใช้ในการหมุน คือ "+coin.value)
//                 }else{
//                     spinGame();
//                     // spinWheel();
//                     // getDataSpinGame();
//                 }
//             }
//         },
//         onCancel() {
//         console.log('Cancel');
//         },
//         class: 'test',
//     });
//     };


  onMounted(() => {
    getDataSpinGame();
    getSettingDailyLogin();
    // getTransactionCard();
  })
  
  definePageMeta({
    layout: 'information'
  })
  </script>
  
  <style scoped>
    .spin-wheel {
        display: block;
        margin: 0 auto;
        border-radius: 50%;
        width: 100%;
        max-width: 500px;
        min-width: 300px;  /* ขนาดขั้นต่ำ */
        min-height: 300px; /* ความสูงขั้นต่ำ */
        height: auto;
    }
    .spin-button {
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        background-color: #1abc9c;
        color: #fff;
        font-size: 18px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .spin-button:hover {
        background-color: #16a085;
    }
    .spin-text {
        font-size: clamp(10px, 2vw, 14px);  /* ขนาดต่ำสุด 12px, สูงสุด 24px และตาม viewport */
    }
    .text-center{
        text-align: center;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }
    /* th {
        background-color: #f4b400;
        color: white;
    }
    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    tr:hover {
        background-color: #f1f1f1;
    }
    .status-online {
        color: green;
        font-weight: bold;
    }
    .status-maintenance {
        color: red;
        font-weight: bold;
    } */
    .open-card{
        background-color: black;
        border-radius: 5px;
        padding: 7px;
        margin: 10px 5px;
        cursor: pointer;
    }
    .card{
        cursor: pointer;
    }
    .list{
        background: linear-gradient(#2c002c, #100f4e) !important;
        border-radius: 10px;
        padding: 1rem 1rem;
    }
    .image-card {
        display: inline-block;
        transition: transform 0.3s ease, box-shadow 0.3s ease; /* เพิ่ม transition เพื่อความลื่นไหล */
        border-radius: 8px;
        overflow: hidden;
    }

    .image-card:hover {
        transform: scale(1.05); /* ขยายขนาด 10% */
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* เพิ่มเงาเมื่อ hover */
    }  

    .text-12 div{
        font-size: 12px !important;
    }

    .daily-login-card {
        text-align: center;
        padding: 10px;
    }
    .daily-login-card-list{
        /* background: linear-gradient(135deg, #d4f5d4, #b0e2b0); */
        border-radius: 12px;
        /* background: linear-gradient(135deg, #f3f4f6, #e4e7eb); */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        /* cursor: pointer; */
        padding: 5px;
    }

    .claim-button {
        background: linear-gradient(135deg, #FFDAB9, #FF8C00); /* ไล่สีส้มอ่อนถึงส้มเข้ม */
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5); /* เงาสีเทา */
    }

    /* .daily-login-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    } */

    .daily-login-card-list.claimed {
        /* background: linear-gradient(135deg, #d4f5d4, #b0e2b0);
        border: 2px solid #4caf50; */
        background: linear-gradient(135deg, #00FA9A, #3CB371);
        /* box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2); */
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5); /* เงาสีเทา */
        border-radius: 12px;
    }

    .daily-login-card-list.waiting {
        /* background: linear-gradient(135deg, #ffe4e6, #f8d1d3);
        border: 2px solid #f44336; */
        background: linear-gradient(135deg, #FFE4E1, #FF7F7F); /* ไล่เฉดสีชมพูอ่อนถึงแดงอ่อน */
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5); /* เงาสีเทา */
        border-radius: 12px;
    }

    .daily-login-card-list.no-login {
        /* background: linear-gradient(135deg, #f3f3f3, #e0e0e0);
        border: 2px solid #9e9e9e; */
        background: linear-gradient(135deg, #D3D3D3, #A9A9A9); /* ไล่เฉดสีเทาอ่อนถึงเทาเข้ม */
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5); /* เงาสีเทา */
        border-radius: 12px;
    }

    .daily-login-card .day-header {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #3c3c3c;
    }

    .daily-login-card .reward {
    font-size: 1rem;
    margin-bottom: 15px;
    color: #666;
    }
    .text-12{
        font-size: 12px;
    }

    .claim-button:disabled{
        background: linear-gradient(135deg, #B0B0B0, #808080);
    }

    .jackpot {
        font-size: 1.5rem;
        font-weight: bold;
        text-transform: uppercase;
        color: #ffd700; /* สีทอง */
        text-shadow: 0 0 10px #ffd700, 0 0 20px #ffa500, 0 0 30px #ff4500;
        transition: transform 0.3s ease;
        cursor: pointer;
    }



    @media screen and (max-width: 1100px) {
        .list-container {
            max-width: 100%;
            overflow-x: auto;
        }
        .list{
            width: 600px;
        }
    }
    @media screen and (max-width: 767px) {
        .list{
            width: 100%;
        }
    }

    @media screen and (max-width: 600px) {
        .list{
            width: 600px;
        }
    }
  </style>
  