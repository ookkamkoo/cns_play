<template>
    <h3>คืนยอดเสีย</h3>
    <a-flex wrap="wrap">
        <a-col :span="24" :xl="12" class="p-1">
            <a-col :span="24" class="m-1">
                <div class="m-1 info-withdrow-list">
                    <div class="info-withdrow-title">โบนัสยอดเสีย</div>
                    <div class="info-withdrow-amount-title my-1">เครดิต</div>
                    <div class="info-withdrow-amount center my-1"> {{refunds}}</div>
                    <div class="center">สามารถรับได้ {{dateDetail==''?'ทุกวัน':dateDetail}} {{typeRefundLostSet == "1"?"รับอัตโนมัติ":"ลูกค้ากดรับเองด้วยตัวเอง"}}</div>
                    <a-col :span="24">
                        <div class="info-bank-coppy center my-2" :class="{ 'disabled': !dateTypeToday }" @click="getBobus">
                            <DollarCircleOutlined /> รับโบนัส
                        </div>
                    </a-col>
                </div>
            </a-col>
            <div class="detail center">
                <p>
                    - เครดิตโปรโมชั่นและแต้มสะสมจะไม่ถูกนำมาคำนวน                                                         
                </p>
                <p>
                    - รับโบนัสคืนเครดิตได้วันละครั้งเท่านั้น                                                                                                              
                </p>
                <p>
                    - โบนัสยอดคืนจะเป็นยอดคืน {{dateDetail}} {{typeRefundLostSet == "1"?"รับอัตโนมัติ":"ลูกค้ากดรับเองด้วยตัวเอง"}}                                                                         
                </p>
                <p>
                    - โบนัสวันก่อนจะไม่ถูกมาคำนวณในวันนี้                                                                                                        
                </p>
                <p class="mb-3 text-danger">
                    -* กรุณามากดรับเครดิตคืนเวลา 00:00 น. เพื่อให้ได้รับเครดิตสูงสุด *                                                
                </p>
            </div>
        </a-col>
        <a-col :span="24" :xl="12" class="p-1">
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
                        <a-tag color="cyan">คืนยอดเสีย</a-tag>
                    </template>
                    <template v-if="column.key === 'refund_amount'">
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
        <contextHolder />
    </a-flex>
</template>
<script setup lang="ts">
    import { getRefundCreditServices,confirmRefundCreditServices } from "~/services/refundServices";
    import type { RefundItem } from "~/services/refundServices";
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    // import { memberStore } from '~/store/index';
    import dayjs from 'dayjs';
    import { Alert } from "~/components/alert/alertComponent";
    import { checkToken } from '~/services/authService';
    import { getToken } from '~/auth/authToken'

    const dataList = ref<RefundItem[]>([]);
    const refunds = ref<string>('0.00')
    const allRecord = ref<number>(0);
    const dateTypeToday = ref<boolean>(false);
    const dateDetail = ref<string>("");
    const typeRefundLostSet = ref<string>("1");
    const [modal, contextHolder] = Modal.useModal();
    
    definePageMeta({
        layout: 'information'
    })

    // const member = memberStore();

    const dynamicColumns = computed(() => {
        return [
        {
            title: `ทั้งหมด ${allRecord.value} รายการ`, 
            children: [
            { title: 'รายการ', key: 'action', width: 30},
            { title: 'เครดิต', key: 'refund_amount', width: 30},
            { title: 'สถานะ', key: 'status', width: 30 },
            { title: 'ยอดเสียวันที่', key: 'date', width: 40 },
            ] 
        },
        ];
    });

    const getRefundCredit = async() =>{
    var data = await getRefundCreditServices();
        if(data.status = 'success'){
            dataList.value = data.data.dataList
            allRecord.value = data.data.dataList.length
            dateTypeToday.value = data.data.dateTypeToday
            dateDetail.value = data.data.dateDetail
            typeRefundLostSet.value = data.data.typeRefundLostSet
            refunds.value = Math.abs(Number(data.data.refund)).toFixed(2);
        }
    }
    
    const getBobus = async() =>{
        modal.confirm({
            title: 'คุณต้องการที่จะรับโบนัส ใช่ไหม?',
            icon: h(ExclamationCircleOutlined),
            content: h('div', 'หากคุณต้องการรับโบนัส กรุณากดยืนยัน'),
            onOk() {
                return confirmRefundCreditServices().then((data) => {
                    if(data.status == "success"){
                        Alert("success","คุณได้รับยอดเสียเรียบร้อยเเล้ว")
                    }else{
                        Alert("error", data.error);
                    }
                    getRefundCredit();
                    const token = getToken();
                    if (token) {
                        checkToken(token);
                    }
                }).catch((error) => {
                    Alert("error", "เกิดข้อผิดพลาดในการรับโบนัส");
                });
            },
        });
    }

    onMounted(()=>{
        getRefundCredit();
    })

</script>
<style scoped>
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
    .disabled {
        pointer-events: none;
        background-color: #FF9100FF;
        opacity: 0.5;  
        cursor: not-allowed;
    }
</style>