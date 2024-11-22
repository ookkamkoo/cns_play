<template>
    <a-modal v-model:open="open" width="650px">
        <h3>รายละเอียดโปรโมชั่น</h3>
        <a-row :justify="'center'">
            <a-image
                :src="detail.image"
                style="border-radius: 5px;"
                :preview="false"
                width="360px"
            />
        </a-row>
        <a-row>
            <a-col :span="24" class="center-checkbox my-1">
                <h3>ชื่อ {{detail.name}}</h3>
            </a-col>

            <a-col :span="24">
                <h4>ประเภทโปรโมชั่น</h4>
            </a-col>
            <a-col :span="24">
                <a-row v-if="detail.type=='1'">
                    <a-col :span="12" class="center-checkbox">
                        <a-checkbox v-model:checked="isNewMember1" class="smoky-checkbox" disabled>สมาชิกใหม่</a-checkbox>
                    </a-col>
                    <a-col :span="12" class="center-checkbox">
                        <a-checkbox v-model:checked="isNewMember2" class="smoky-checkbox" disabled>สมาชิกเก่า</a-checkbox>
                    </a-col>
                </a-row>
                <a-row v-if="detail.type=='2'">
                    <a-col :span="12" class="center-checkbox">
                        <a-checkbox v-model:checked="isNewMember3" class="smoky-checkbox" disabled>สมาชิกใหม่</a-checkbox>
                    </a-col>
                    <a-col :span="12" class="center-checkbox">
                        <a-checkbox v-model:checked="isNewMember4" class="smoky-checkbox" disabled>สมาชิกเก่า</a-checkbox>
                    </a-col>
                </a-row>
                <a-row v-if="detail.type=='3'">
                    <a-col :span="12" class="center-checkbox">
                        <a-checkbox v-model:checked="isNewMember5" class="smoky-checkbox" disabled>สมาชิกใหม่</a-checkbox>
                    </a-col>
                    <a-col :span="12" class="center-checkbox">
                        <a-checkbox v-model:checked="isNewMember6" class="smoky-checkbox" disabled>สมาชิกเก่า</a-checkbox>
                    </a-col>
                </a-row>
            </a-col>

            <a-col :span="24">
                <h4>วันที่สามารถรับโปรโมชั่น</h4>
                <span v-if="detail.type_open=='1'">
                    <p class="left-spacing">รับได้ทุกวัน</p>
                </span>
                <span v-if="detail.type_open=='2'">
                    <p class="left-spacing">{{detail.open_data}}</p>
                </span>
                <span v-if="detail.type_open=='3'">
                    <p class="left-spacing"> {{detail.open_data}}</p>
                </span>
            </a-col>

            <a-col :span="24">
                <h4>เวลารับโปรโมชั่น</h4>
            </a-col>
            <a-col :span="24">
                <a-row v-if="detail.time_open_close=='1'">
                    <a-col :span="12" class="center-checkbox">
                        เวลาเปิด 00:00:00
                    </a-col>
                    <a-col :span="12" class="center-checkbox">
                        เวลาปิด 23:59:59
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24">
                <a-row v-if="detail.time_open_close=='2'">
                    <a-col :span="12">
                        เวลาเปิด {{ dayjs(detail.time_open).format('HH:mm:ss') }}
                    </a-col>
                    <a-col :span="12">
                        เวลาปิด {{ dayjs(detail.time_close).format('HH:mm:ss') }}
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24">
                <h4>ฝากขั้นต่ำ</h4>
                <p class="left-spacing">จำนวนฝากขั้นต่ำ คือ {{detail.low_deposit}}</p>
            </a-col>
            <a-col :span="24">
                <h4>ประเภทถอนสูงสุด</h4>
                <p v-if="detail.type_max_withDraw == 1" class="left-spacing">จำนวนเงิน</p>
                <p v-else-if="detail.type_max_withDraw == 2" class="left-spacing">จำนวนเท่า ยอดฝาก</p>
                <p v-else-if="detail.type_max_withDraw == 3" class="left-spacing">จำนวนเท่า ยอดฝาก + โบนัส</p>
            </a-col>
            <a-col :span="24">
                <h4>ประเภทรายการฝาก</h4>
                <a-row v-if="detail.type_deposit == 1">
                    <a-col :span="8" v-if="detail.bonus_type == 1" class="center-checkbox">
                        เปอร์เซ็น
                    </a-col>
                    <a-col :span="8" v-if="detail.bonus_type == 2" class="center-checkbox">
                        จำนวนเงิน
                    </a-col>
                    <a-col :span="8" class="center-checkbox">
                        โบนัสสูงสุด
                    </a-col>
                    <a-col :span="8" class="center-checkbox">
                        ถอนสูงสุด
                    </a-col>
                    <a-col :span="8" class="center-checkbox">
                        {{detail.condition_data.amount}}
                    </a-col>
                    <a-col :span="8" class="center-checkbox">
                        {{detail.condition_data.bonus}}
                    </a-col>
                    <a-col :span="8" class="center-checkbox">
                        {{detail.condition_data.amountMaxWithDraw}}
                    </a-col>
                </a-row>
                <a-row v-if="detail.type_deposit == 2" v-for="v,index in detail.condition_data">
                    <a-col :span="6" class="center-checkbox">
                        รายการที่
                    </a-col>
                    <a-col :span="6" v-if="detail.bonus_type == 1" class="center-checkbox">
                        เปอร์เซ็น
                    </a-col>
                    <a-col :span="6" v-if="detail.bonus_type == 2" class="center-checkbox">
                        จำนวนเงิน
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        โบนัสสูงสุด
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        ถอนสูงสุด
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        {{index + 1 }}
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        {{v.amount}}
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        {{v.bonus}}
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        {{v.amountMaxWithDraw}}
                    </a-col>
                </a-row>
                <a-row v-if="detail.type_deposit == 3" v-for="v,index in detail.condition_data">
                    <a-col :span="6" class="center-checkbox">
                        มากกว่า
                    </a-col>
                    <a-col :span="6" v-if="detail.bonus_type == 1" class="center-checkbox">
                        เปอร์เซ็น
                    </a-col>
                    <a-col :span="6" v-if="detail.bonus_type == 2" class="center-checkbox">
                        จำนวนเงิน
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        โบนัสสูงสุด
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        ถอนสูงสุด
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        {{v.amount}}
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        {{v.amount}}
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        {{v.bonus}}
                    </a-col>
                    <a-col :span="6" class="center-checkbox">
                        {{v.amountMaxWithDraw}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24">
                <h4>เทิร์นการเล่น</h4>
                <a-row>
                    <a-col :span="4" class="center-checkbox">m2</a-col>
                    <a-col :span="4" class="center-checkbox">game</a-col>
                    <a-col :span="4" class="center-checkbox">keno</a-col>
                    <a-col :span="4" class="center-checkbox">step</a-col>
                    <a-col :span="4" class="center-checkbox">lotto</a-col>
                    <a-col :span="4" class="center-checkbox">poker</a-col>
                </a-row>
                <a-row>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.m2}}</a-col>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.game}}</a-col>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.keno}}</a-col>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.step}}</a-col>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.lotto}}</a-col>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.poker}}</a-col>
                </a-row>
                <a-row>
                    <a-col :span="4" class="center-checkbox">casino</a-col>
                    <a-col :span="4" class="center-checkbox">eSport</a-col>
                    <a-col :span="4" class="center-checkbox">parlay</a-col>
                    <a-col :span="4" class="center-checkbox">trading</a-col>
                    <a-col :span="4" class="center-checkbox">football</a-col>
                    <a-col :span="4" class="center-checkbox">multiplePlayer</a-col>
                </a-row>
                <a-row>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.casino}}</a-col>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.eSport}}</a-col>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.parlay}}</a-col>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.trading}}</a-col>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.football}}</a-col>
                    <a-col :span="4" class="center-checkbox">{{detail.turn.multiplePlayer}}</a-col>
                </a-row>
            </a-col>
        </a-row>
        <!-- <p>{{ detail }}</p> -->
        <template #footer>
            <div class="modal-footer">
                <a-button type="primary" class="bright-orange" @click="confirmPromotion(detail.id,detail.name)">รับโปรโมชั่น</a-button>
                <a-button @click="open=false">ปิด</a-button>
            </div>
        </template>
    </a-modal>
    <h3>โปรโมชั่นของคุณ</h3>
    <a-flex>
        <a-col :span="12" :sm="12" :xl="6" class="promotion-item">
            <div class="image-container p-1" @click="promotionDetail(promotionMember)">
                <a-image
                    :src="promotionMember.image"
                    style="border-radius: 5px;"
                    :preview="false"
                />
                <div class="overlay">
                    <p class="detail-promotion">รายละเอียด</p>
                </div>
            </div>
        </a-col>
    </a-flex>
    <h3>โปรโมชั่นทัั้งหมด</h3>
    <a-flex wrap="wrap">
        <a-col :span="12" :sm="12" :xl="6" class="promotion-item">
            <div class="image-container p-1" @click="promotionDetail(noPromotion)">
                <a-image
                    src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/pg-game/%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%82%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99.webp"
                    style="border-radius: 5px;"
                    :preview="false"
                />
                <div class="overlay">
                    <p class="detail-promotion">รายละเอียด</p>
                </div>
            </div>
            <a-row :justify="'center'" class="mx-1">
                <a-button type="primary" class="bright-orange mx-1" @click="confirmPromotion(0,'ไม่เลือกโปรโมชั่น')">รับโปรโมชั่น</a-button>
            </a-row>
        </a-col>

        <a-col :span="12" :sm="12" :xl="6" v-for="v in promotion" :key="v.id" class="promotion-item">
            <div class="image-container p-1" @click="promotionDetail(noPromotion)">
                <a-image
                    :src="config.public.apiServer + '/' + v.image"
                    style="border-radius: 5px;"
                    :preview="false"
                />
                <div class="overlay">
                    <p class="detail-promotion">รายละเอียด</p>
                </div>
            </div>
            <a-row :justify="'center'" class="mx-1">
                <a-button type="primary" class="bright-orange mx-1" @click="confirmPromotion(v.id,v.name)">รับโปรโมชั่น</a-button>
            </a-row>
        </a-col>

    </a-flex>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { getPromotionServices,confirmPromotionServices } from "~/services/promotion";
    import type { Promotion } from "~/services/promotion";
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { createVNode } from 'vue';
    import dayjs from 'dayjs';
    import { Alert } from '~/components/alert/alertComponent';
    const config = useRuntimeConfig()

    const noPromotion: Promotion = {
        id: 0,
        name: "ไม่รับโปรโมชั่น",
        type: 1,
        bonus_type: 1,
        bonus_withdraw: 1,
        type_open: 1,
        open_data: "",
        time_open_close: 1,
        time_open: "2024-10-27T00:00:00+07:00",
        time_close: "2024-10-27T23:59:00+07:00",
        low_deposit: 0,
        limit_round: 0,
        type_deposit: 1,
        type_max_withDraw: 2,
        condition_data: { bonus: 0, amount: 0, amountMaxWithDraw: 0 },
        turn: {
            m2: 0,
            game: 0,
            keno: 0,
            step: 0,
            lotto: 0,
            poker: 0,
            casino: 0,
            eSport: 0,
            parlay: 0,
            trading: 0,
            football: 0,
            multiplePlayer: 0
        },
        image: "https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/pg-game/%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%82%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99.webp",
        is_active: true,
        created_by: 1,
        created_at: "2024-10-27T13:17:38.006021+07:00",
        updated_by: 1,
        updated_at: "2024-10-28T00:22:01.769606+07:00"
    };
    
    const promotion = ref<Promotion[]>([]);
    const promotionMember = ref<Promotion>(noPromotion);
    const open = ref<boolean>(false);
    const detail = ref<any>();
    const isNewMember1 = ref(true);
    const isNewMember2 = ref(true);
    const isNewMember3 = ref(true);
    const isNewMember4 = ref(false);
    const isNewMember5 = ref(false);
    const isNewMember6 = ref(true);

    const showModal = () => {
        open.value = true;
    };

    const promotionDetail = (data:any) => {
        showModal()
        detail.value = data
    };
    
    const getPromotion = async () => {
        const data = await getPromotionServices();
        if (data.status === 'success') {
            promotion.value = data.data.promotions;
            if(data.data.promotionsMember != null){
                promotionMember.value = data.data.promotionsMember
                console.log(promotionMember);
                
            }else{
                promotionMember.value = noPromotion
            }
        } else {
            console.error("Failed to fetch promotions.");
        }
    };

    const confirmPromotion = async (id: number,name:string) => {
        Modal.confirm({
            title: 'ลูกค้าต้องการเลือกโปรโมชั่นนี้ใช่ไหม?',
            icon: createVNode(ExclamationCircleOutlined),
            content: 'ลูกค้าต้องการเลือกโปรโมชั่น '+name,
            
            // Make onOk async
            async onOk() {
                try {
                    console.log('OK');
                    const data = await confirmPromotionServices(id);
                    if (data.status === 'success') {
                        Alert("success","เเก้ไขโปรโมชั่นเรียบร้อยเเล้ว.")
                    } else {
                        console.error("Failed to fetch promotions.");
                    }
                } catch (error) {
                    console.error("Error confirming promotion:", error);
                }
            },
            onCancel() {
                console.log('Cancel');
            },
            class: 'test',
        });
    };
    
    onMounted(() => {
        getPromotion();
    });
    
    definePageMeta({
        layout: 'information'
    });
</script>

<style>
    .promotion-item {
        position: relative;
    }
    
    .image-container {
        position: relative;
        display: inline-block;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        opacity: 0;
        border-radius: 5px;
        transition: opacity 0.3s ease;
        cursor: pointer;
    }

    .image-container:hover .overlay {
        opacity: 1;
    }

    .bright-orange {
        background-color: #ff9500;
        border-color: #ff9500;
        color: white;
    }

    .bright-orange:hover {
        background-color: #e68400 !important;
        border-color: #e68400;
    }

    .mx-1 {
        margin: 0.5rem 1rem;
    }

    .detail-promotion {
        border: 2px solid #ff9500;
        padding: 5px 10px;
        border-radius: 10px;
        font-weight: bold;
    }

    .smoky-checkbox span{
        color: whitesmoke !important;
    }

    .ant-checkbox-wrapper-checked .ant-checkbox-inner{
        border-color: whitesmoke !important;
        background: #1677ff !important;
    }

    .smoky-checkbox .ant-checkbox-inner:after{
        border-color: whitesmoke !important;
    }

    .left-spacing {
        padding-left: 20px;
    }

    .center-checkbox {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-footer {
        display: flex;
        justify-content: center;
        padding: 10px;
        margin-top: 20px;
    }
</style>
