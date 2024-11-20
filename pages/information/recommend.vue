<template>
    <h3>เเนะนำเพื่อน</h3>
    <a-flex class="p-1"  :justify="'start'" :align="'center'" wrap="wrap">
        <a-col :span="24" :md="24" :lg="9" :xl="6">
            <div class="m-1 info-withdrow-list">
                <div class="info-withdrow-title">จำนวณคนที่เชิญ</div>
                <div class="info-withdrow-amount-title my-1">ทั้งหมด</div>
                <div class="info-withdrow-amount center my-1"> {{memberRegis}}</div>
            </div>
        </a-col>
        <a-col :span="24" :md="24" :lg="9" :xl="6">
            <div class="m-1 info-withdrow-list">
                <div class="info-withdrow-title">รายได้รวม</div>
                <div class="info-withdrow-amount-title my-1">ทั้งหมด</div>
                <div class="info-withdrow-amount center my-1"> {{recomend}}</div>
            </div>
        </a-col>
    </a-flex>

    <a-flex class="p-1">
        <a-col :span="24" :lg="12">
            <h3>รหัสเเนะนำเพื่อน</h3>
            <a-flex class="p-1" :justify="'center'" wrap="wrap">
                <a-col :span="24" :md="24" :lg="24" :xl="13">
                    <a-flex class="p-1" :justify="'center'" wrap="wrap">
                        <a-qrcode :value="linkRecommand"
                            class="qrcode center"
                            bg-color="whitesmoke"
                        />
                        <br>
                    </a-flex>
                    <a-input-group compact class="coppy-link">
                        <a-input v-model:value="linkRecommand" style="width: calc(100% - 40px); border-radius: 6px 0 0 6px ;" />
                        <a-tooltip title="copy link" @click="coppy()">
                            <a-button>
                            <template #icon><CopyOutlined /></template>
                            </a-button>
                        </a-tooltip>
                    </a-input-group>
                </a-col>
            </a-flex>
        </a-col>
    </a-flex>


    <a-flex class="p-1" :justify="'center'" wrap="wrap">
        <a-col :span="24" :xl="12">
            <h3>เงื่อนไขในการรับโบนัสแนะนำเพื่อน</h3>
            <div class="m-1 info-withdrow-list">
                <div class="info-withdrow-title">รายได้รวม</div>
                <div class="info-withdrow-amount-title my-1">ทั้งหมด</div>
                <div class="info-withdrow-amount center my-1"> {{recomend}}</div>
                <a-col :span="24">
                    <div class="info-bank-coppy center my-2" @click="confirmRecommand">
                        <CopyOutlined /> รับโบนัส
                    </div>
                </a-col>
            </div>
            <div class="center">
                <h3>โบนัสแนะนำเพื่อน 0.50%  จาก สมาชิกที่เสีย</h3>
                <p>
                    1.ระบบจะสะสมยอดโบนัส เวลาเที่ยงคืนของทุกวัน
                </p>
                <p>
                    2.หลังจากรับโบนัสแล้ว ยอดโบนัสของเพื่อนจะถูกสะสมใหม่
                </p>
                <!-- <p>
                    3.เพื่อนคนไหนที่ไม่มียอดโบนัส แสดงว่าเพื่อนคนนั้นไม่เข้าเงื่อนไขตามวิธีคำนวณด้านล่างนี้                                         
                </p>
                <hr>
                <h3>* วิธีคำนวณ *</h3>
                <p>
                    จะคำนวณดังนี้ เช่น โบนัสแนะนำเพื่อน 5% คนที่ 1 เสีย 100 , คนที่ 2 ได้ 100 คนที่ 2 จะไม่ถูกคำนวณ ระบบจะนับรวมเป็น 100 คิดเป็นเปอเซ็น 5% = 5฿
                </p> -->
            </div>
        </a-col>
        <a-col :span="24" :xl="12">
            <h3>รายการเเนะนำเพื่อน</h3>
            <a-table 
            :columns="dynamicColumns"
            :data-source="dataList"
            bordered
            :scroll="{ x: 500, y: 700 }"
            :pagination="false"
            class="my-1"
            >
                <template #bodyCell="{ column, record,index }">
                    <template v-if="column.key === 'action'">
                        <a-tag color="cyan">เเนะนำเพื่อน</a-tag>
                    </template>
                    <template v-else-if="column.key === 'id'">
                        <div>{{index + 1}}</div>
                    </template>
                    <template v-else-if="column.key === 'username_send_id'">
                        <div>{{record.username_send_id}}</div>
                    </template>
                    <template v-else-if="column.key === 'refund_amount'">
                        <div>{{ Math.abs(record.refund_amount) }}</div>
                    </template>
                    <template v-else-if="column.key === 'date'">
                        <div>{{ dayjs(record.date).format('YYYY-MM-DD') }}</div>
                    </template>
                    <template v-else-if="column.key === 'status'">
                        <a-tag color="orange" v-if="record.status == 0">ยังไม่ได้รับ</a-tag>
                        <a-tag color="green" v-else-if="record.status == 1">รับเเล้ว</a-tag>
                        <a-tag color="red" v-else-if="record.status == 2">หมดเวลา</a-tag>
                    </template>
                </template>
            </a-table>
        </a-col>
    </a-flex>
    <contextHolder />
</template>
<script setup lang="ts">
    import { getRecommendServicesList,confirmRecomandServices } from '~/services/recommendService';
    import type { Recommend } from '~/services/recommendService';
    import { memberStore } from '~/store/index';
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import dayjs from 'dayjs';
    import { Alert } from "~/components/alert/alertComponent";
    import { getToken } from '~/auth/authToken'
    import { checkToken } from '~/services/authService';

    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl;
    const member = memberStore();
    const linkRecommand = baseUrl+'?token='+member.memberDetail.key_ref;
    const [modal, contextHolder] = Modal.useModal();

    const dataList = ref<Recommend[]>([]);
    const recomend = ref<string>('0.00')
    const memberRegis = ref<number>(0)
    
    console.log(linkRecommand);

    console.log(member);
    
    definePageMeta({
    layout: 'information'
    })

    const dynamicColumns = computed(() => {
        return[
        {
            title: 'รายการ', key: 'action',width: 150,
        },
        {
            title: 'รหัสลูกค้า', key: 'username_send_id',width: 150,
        },
        {
            title: 'วันที่',key: 'date', width: 150,
        },
        {
            title: 'สถานะ',key: 'status', width: 150,
        },
        {
            title: 'ยอดโบนัสสะสม',key: 'refund_amount' ,width: 150,
        },
        ];
    });


    onMounted( () => {
        getRecomend();
    });

    const getRecomend = async() =>{
        var data = await getRecommendServicesList();
        // console.log(data);
        if(data.status="success"){
            dataList.value = data.data.recommend_list
            recomend.value = Math.abs(Number(data.data.total_amount)).toFixed(2);
            memberRegis.value = Number(data.data.member_regis);
        }
    }
    

    const confirmRecommand = async() =>{
        modal.confirm({
            title: 'คุณต้องการที่จะรับโบนัส ใช่ไหม?',
            icon: h(ExclamationCircleOutlined),
            content: h('div', 'หากคุณต้องการรับโบนัส กรุณากดยืนยัน'),
            onOk() {
                return confirmRecomandServices().then((data) => {
                    if(data.status == "success"){
                        Alert("success","คุณได้รับยอดเสียเรียบร้อยเเล้ว")
                    }else{
                        Alert("error", data.error);
                    }
                    getRecomend();
                    const token = getToken();
                    if (token) {
                        checkToken(token);
                    }
                }).catch((error) => {
                    // console.log(error);
                    Alert("error", "เกิดข้อผิดพลาดในการรับโบนัส");
                });
            },
        });
    }

    const coppy = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(linkRecommand).then(() => {
            message.success('คัดลอกสำเร็จ')
            }).catch(err => {
            message.error('คัดลอกไม่สำเร็จ!')
            })
        }
    }

</script>
<style scoped>
.profile label{
    color: whitesmoke !important;
}
.label-title{
    width: 20%;
    min-width: 100px;
    max-width: 100px;
}
.input-value{
    width: 100%;
}
.read-only{
    cursor: not-allowed;
    background-color: rgb(199, 199, 199);
}
.info-withdrow-list{
    background: linear-gradient(#2c002c, #100f4e) !important;
    border-radius: 10px;
    padding: 1rem 2rem;
}
.info-withdrow-title{
    font-size: 16px;
}
.info-withdrow-amount{
    font-size: 18px;
}
.coppy-link{
    text-align: center;
}
</style>