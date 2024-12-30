<template>
    <h3>ประวัติการทำรายการ</h3>
    <a-flex wrap="wrap">
      <a-col :span="24" class="p-1">
        <div class="table-operations">
          <a-button @click="setAction(1)">รายการฝาก</a-button>
          <a-button @click="setAction(2)">รายการถอน</a-button>
        </div>
        <a-table 
          :columns="dynamicColumns"
          :data-source="dataShow"
          bordered
          :scroll="{ x: 800, y: 700 }"
          :pagination="false"
          class="my-2"
        >
            <template #bodyCell="{ column, record,index }">
                <template v-if="column.key === 'id'">
                    <div>{{ index + 1 }}</div>
                </template>
                <template v-if="column.key === 'bank'">
                <a-image
                    width="35px"
                    :src="record.bank.image"
                    :preview="false"
                    v-if="record.bank.image != ''"
                    />
                    <div v-else> - </div>
                </template>
                <template v-if="column.key === 'bank_no'">
                    <div v-if="record.bank_no != ''">{{ record.bank_no }}</div>
                    <div v-else> - </div>
                </template>
                <template v-if="column.key === 'promotion'">
                    <div v-if="record.promotion != ''">{{ record.promotion }}</div>
                    <div v-else> - </div>
                </template>
                <template v-else-if="column.key === 'created_at'">
                    <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </template>
                <template v-else-if="column.key === 'type'">
                    <a-tag color="green" v-if="record.type == 1 || record.type == 3">ฝากเงิน</a-tag>
                    <a-tag color="red" v-else>ถอนเงิน</a-tag>
                </template>
                <template v-else-if="column.key === 'amount'">
                    <div>{{ record.amount }}</div>
                </template>
                <template v-else-if="column.key === 'status'">
                    <a-tag color="orange" v-if="record.status == 1">กำลังประมวลผล</a-tag>
                    <a-tag color="green" v-else-if="record.status == 2">สำเร็จ</a-tag>
                    <a-tag color="red" v-else-if="record.status == 3">ยกเลิก</a-tag>
                </template>
            </template>
        </a-table>
      </a-col>
    </a-flex>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getTransactionServices } from '~/services/transactionServices';
  import type { TransactionData } from '~/services/transactionServices';
  import dayjs from 'dayjs';
  
  const dataShow = ref<TransactionData[]>([]);
  const allRecord = ref<number>(0);
  const action = ref(1);
  
  const dynamicColumns = computed(() => {
    return [
      { 
        title: `ทั้งหมด ${allRecord.value} รายการ`, 
        children: [
          { title: 'ธนาคาร', dataIndex: 'bank', key: 'bank', width: 30 },
          { title: 'เลขบัญชี', key: 'bank_no', width: 40},
          { title: 'รายการ', key: 'type', width: 30},
          { title: 'โปรโมชั่น', key: 'promotion', width: 50},
          { title: 'เครดิต', key: 'amount', width: 30},
          { title: 'สถานะ', key: 'status', width: 30 },
          { title: 'วันที่', key: 'created_at', width: 40 },
        ] 
      },
    ];
  });
  
  const setAction = (action_bank: number) => {
    action.value = action_bank;
    getTransaction();
  };
  
  const getTransaction = async () => {
    try {
        const response = await getTransactionServices(action.value);
        if (response.status === 'success') {
        if (Array.isArray(response.data)) {
            dataShow.value = response.data;
            allRecord.value = response.data.length;
        } else {
            dataShow.value = [];
            allRecord.value = 0
            console.error('Response data is not an array:', response.data);
        }
        } else {
        console.error('Failed to fetch transaction data');
        }
    } catch (error) {
        console.error('Error fetching transaction data:', error);
    }
};
  
  onMounted(getTransaction);
  
  definePageMeta({
    layout: 'information'
  });
  </script>
  
  <style scoped>
  .info-withdrow-list {
    background: linear-gradient(#2c002c, #100f4e) !important;
    border-radius: 10px;
    padding: 1rem 2rem;
  }
  .table-operations button {
    margin: 0 2px;
  }
  </style>
  <style>
    .ant-table-cell, .ant-table-cell-header {
        text-align: center !important;
    }
  </style>
  