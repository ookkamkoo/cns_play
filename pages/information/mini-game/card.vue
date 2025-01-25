<template>
    <div>
        <a-flex :justify="'space-between'" class="m-2 spin-text" :align="'center'">
            <h4><NuxtLink to="/information/mini-game/listMiniGame" exact class="link-sidebar"><ArrowLeftOutlined /> กิจกรรมทั้งหมด</NuxtLink></h4>
            <div style="white-space: nowrap;">
                เหรียญของคุณ {{ member.memberDetail.balance_event }} เหรียญ
            </div>
        </a-flex>
        <br>
        <h2 class="m-2 center jackpot">🎉 กิจกรรมเปิดไพ่ 🎉</h2>
            <a-row style="max-width: 1100px; margin: 0 auto;">
                <a-flex :justify="'center'" :align="'center'" wrap="wrap" class="m-2">
                    <a-col
                        :span="12"
                        :md="6"
                        class="center card"
                        v-for="(item, index) in 8"
                        :key="index"
                        @click="handleCardClick(index)"
                    >
                        <div class="image-card">
                        <a-image 
                            :preview="false"
                            src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/menu-game/miniGame/%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B9%84%E0%B8%9E%E0%B9%88.png"
                        />
                        <div class="open-card"><span v-if="!isLoading[index]">เปิดไพ่</span><span class="loading-container" v-else><a-spin /> </span></div>
                        </div>
                    </a-col>
                </a-flex>
            </a-row>
        <div class="text-center m-2">
            เหรียญที่ต้องใช้เล่นเกมส์ {{coin}} เหรียญ
        </div>
        <a-flex :justify="'center'">
            <a-col :span="24" :md="24" class="p-1">
                <h3>ประวัติกิจกรรมเปิดไพ่</h3>
                <div class="list-container my-2">
                    <a-row class="list">
                    <a-col :span="24" class="center">
                        เเสดง 10 รายการ ล่าสุด
                    </a-col>
                    <a-col :span="24" class="my-1">
                        <a-flex :justify="'space-around'">
                        <a-col :span="4" class="center">เกมส์</a-col>
                        <a-col :span="4" class="center">เหรียญที่ใช้</a-col>
                        <a-col :span="4" class="center">ผลที่ออก</a-col>
                        <a-col :span="4" class="center">สถานะ</a-col>
                        <a-col :span="4" class="center">วันที่</a-col>

                        </a-flex>
                    </a-col>
                    <a-col :span="24">
                        <hr />
                    </a-col>
                    <a-col :span="24" class="text-12">
                        <a-flex
                            :justify="'space-around'"
                            :align="'center'"
                            v-for="(data, index) in dataShow"
                            :key="data.id || index"
                            class="my-1"
                            >
                            <a-col :span="4" class="center">
                                <div>เปิดไพ่</div>
                            </a-col>
                            <a-col :span="4" class="center">
                                <div>{{ data.Coin }}</div>
                            </a-col>
                            <a-col :span="4" class="center">
                                <div>{{ data.result_detail }}</div>
                            </a-col>
                            <a-col :span="4" class="center">
                                <a-tag color="green" v-if="data.status == 2">สำเร็จ</a-tag>
                                <a-tag color="red" v-else-if="data.status == 3">ยกเลิก</a-tag>
                            </a-col>
                            <a-col :span="4" class="center">
                                <div>{{ dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                            </a-col>
                        </a-flex>
                        <!-- <hr /> -->
                    </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-flex>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { createVNode } from 'vue';
    import { Alert } from '~/components/alert/alertComponent';
    import { openCardServices,getDataCardServices,getSettingCardServices,getTransactionCardServices } from "~/services/miniGameServices";
    import dayjs from 'dayjs';
    
    import { memberStore } from '~/store/index';
    const member = memberStore();

    const dataShow = ref<any[]>([]);
    const coin = ref<number>(0);
    const isLoading = ref<boolean[]>(Array(8).fill(false));
    const spinning = ref<boolean>(false);
    const segments = ref<string[]>([]);
  
    const openCard = async (index:number) => {
        const data = await openCardServices();
        if (data.status === 'success') {
            // targetIndex.value = data.data.i
            member.memberDetail.balance_event = data.data.coin
            showWinner(data.data.result)
        }else{
            Alert("error",data.message)
        }
        isLoading.value[index] = false;
    };

    const showWinner = (winer:string) => {
        getDataSpinGame();
        Modal.confirm({
            title: 'Do you Want to delete these items?',
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

    const getSettingCard = async () => {
        const data = await getSettingCardServices();
        if (data.status === 'success') {
            const configValue = data.data.data.config_value;
            coin.value = data.data.data.game_coin;
            segments.value = configValue.map((item: any) => item.rewards); // ตั้งค่า segments
        }else{
            Alert("error",data.message)
        }
    };

    const getTransactionCard = async () => {
        const data = await getTransactionCardServices();
        if (data.status === 'success') {
            dataShow.value = data.data.transactions
        }
    };

    const handleCardClick = async (index: number) => {
        // แสดง Modal เพื่อยืนยันการดำเนินการ
        Modal.confirm({
            title: 'คุณต้องการเปิดไพ่ใช่ไหม?',
            icon: createVNode(ExclamationCircleOutlined),
            content: createVNode('div', { style: 'color:red;' }, `ใช้ ${coin.value} เหรียญในการเปิดไพ่`),
            onOk: async () => {
                console.log('OK');
                console.log(spinning.value);
                
                if (spinning.value) {
                    Alert("error", "เกมส์กำลังดำเนินการอยู่");
                } else if (member.memberDetail.balance_event < coin.value) {
                    Alert("error", `จำนวนเหรียญขั้นต่ำที่ใช้ในการเปิดไพ่คือ ${coin.value}`);
                } else {
                    if (isLoading.value[index]) return; // ป้องกันการกดซ้ำ

                    // ตั้งค่าการโหลดเป็น true สำหรับการ์ดที่คลิก
                    isLoading.value[index] = true;

                    try {
                        // เรียกใช้ API หรือฟังก์ชันที่ต้องการ
                        // await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock การโหลด (2 วินาที)
                        // console.log(`Card ${index} clicked and processed.`);
                        // Alert("success", `คุณเปิดไพ่สำเร็จ!`);
                        await openCard(index);
                    } catch (error) {
                        console.error("Error:", error);
                        Alert("error", "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
                    }
                }
            },
            onCancel: () => {
                console.log('Cancel');
            },
            class: 'test',
        });
    };


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
    getSettingCard();
    getTransactionCard();
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
  