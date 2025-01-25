<template>
  <h3>ประวัติการทำรายการ</h3>
  <a-flex wrap="wrap" :gutter="[16, 16]">
    <a-col :span="24">
      <div class="table-operations m-2">
        <a-button
          type="dashed"
          :class="{ active: currentAction === 1 }"
          @click="setActionActive(1)"
        >
          รายการฝาก
        </a-button>
        <a-button
          type="dashed"
          :class="{ active: currentAction === 2 }"
          @click="setActionActive(2)"
        >
          รายการถอน
        </a-button>
      </div>
    </a-col>
    <a-col :span="24" class="p-1">
      <div class="list-container">
        <a-row class="list">
          <a-col :span="24" class="center">
            เเสดง 10 รายการ ล่าสุด
          </a-col>
          <a-col :span="24" class="my-1">
            <a-flex :justify="'space-around'">
              <a-col :span="3" class="center">ธนาคาร</a-col>
              <a-col :span="3" class="center">เลขบัญชี</a-col>
              <a-col :span="3" class="center">รายการ</a-col>
              <a-col :span="3" class="center">โปรโมชั่น</a-col>
              <a-col :span="3" class="center">เครดิต</a-col>
              <a-col :span="3" class="center">สถานะ</a-col>
              <a-col :span="3" class="center">วันที่</a-col>
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
              <a-col :span="3" class="center">
                <a-image
                  width="35px"
                  :src="data.bank.image"
                  :preview="false"
                  v-if="data.bank.image !== ''"
                />
                <div v-else> - </div>
              </a-col>
              <a-col :span="3" class="center">
                <div>{{ data.bank_no }}</div>
              </a-col>
              <a-col :span="3" class="center">
                <a-tag color="green" v-if="data.type === 1 || data.type === 3">
                  ฝากเงิน
                </a-tag>
                <a-tag color="red" v-else>ถอนเงิน</a-tag>
              </a-col>
              <a-col :span="3" class="center">
                <div>{{ data.promotion }}</div>
              </a-col>
              <a-col :span="3" class="center">
                <div>{{ data.amount.toFixed(2) }}</div>
              </a-col>
              <a-col :span="3" class="center">
                <a-tag color="orange" v-if="data.status === 0">ยังไม่ได้รับ</a-tag>
                <a-tag color="green" v-else-if="data.status === 1">รับเเล้ว</a-tag>
                <a-tag color="red" v-else-if="data.status === 2">หมดเวลา</a-tag>
              </a-col>
              <a-col :span="3" class="center">
                <div>{{ dayjs(data.created_at).format('YYYY-MM-DD') }}</div>
              </a-col>
            </a-flex>
            <!-- <hr /> -->
          </a-col>
        </a-row>
      </div>
    </a-col>
  </a-flex>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getTransactionServices } from "~/services/transactionServices";
import type { TransactionData } from "~/services/transactionServices";
import dayjs from "dayjs";

const dataShow = ref<TransactionData[]>([]);
const allRecord = ref<number>(0);
const action = ref(1);
const currentAction = ref(1);

const dynamicColumns = computed(() => {
  return [
    {
      title: `ทั้งหมด ${allRecord.value} รายการ`,
      children: [
        { title: "ธนาคาร", dataIndex: "bank", key: "bank", width: 30 },
        { title: "เลขบัญชี", dataIndex: "bank_no", key: "bank_no", width: 40 },
        { title: "รายการ", dataIndex: "type", key: "type", width: 30 },
        { title: "โปรโมชั่น", dataIndex: "promotion", key: "promotion", width: 50 },
        { title: "เครดิต", dataIndex: "amount", key: "amount", width: 30 },
        { title: "สถานะ", dataIndex: "status", key: "status", width: 30 },
        { title: "วันที่", dataIndex: "created_at", key: "created_at", width: 40 },
      ],
    },
  ];
});

const setAction = (action_bank: number) => {
  action.value = action_bank;
  getTransaction();
};
const setActionActive = (id: number) => {
  currentAction.value = id;
};

const getTransaction = async () => {
  try {
    const response = await getTransactionServices(action.value);
    if (response.status === "success") {
      if (Array.isArray(response.data)) {
        dataShow.value = response.data;
        allRecord.value = response.data.length;
      } else {
        dataShow.value = [];
        allRecord.value = 0;
        console.error("Response data is not an array:", response.data);
      }
    } else {
      console.error("Failed to fetch transaction data");
    }
  } catch (error) {
    console.error("Error fetching transaction data:", error);
  }
};

onMounted(getTransaction);

definePageMeta({
  layout: "information",
});
</script>

<style scoped>
.table-operations button {
  margin: 0 2px;
}

.list-container {
  width: 100%;
  overflow-x: auto;
}

.list {
  white-space: nowrap;
}

.text-12 div {
  font-size: 12px !important;
}

.active {
  background-color: #1890ff !important; /* สีพื้นหลังสำหรับปุ่ม active */
  color: white !important; /* สีข้อความ */
  border-color: #1890ff !important; /* สีขอบ */
}

@media screen and (max-width: 1150px) {
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
