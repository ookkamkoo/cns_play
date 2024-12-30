<template>
  <a-row class="p-2 alliance-list">
      <a-col :span="11">
        <a-row >
          <a-col class="p-1" :span="12">
            <label>สถานะ</label>
            <a-select
              ref="select"
              v-model:value="formData.status"
              style="width: 100%"
              @change="handleSelectChange"
            >
              <a-select-option value="all">ทั้งหมด</a-select-option>
              <a-select-option value="deposit">รายการฝาก</a-select-option>
              <a-select-option value="withdraw">รายการถอน</a-select-option>
            </a-select>
          </a-col>
          <a-col class="p-1" :span="12" v-if="formData.status == 'deposit'">
            <label>รายการ</label>
            <a-select
              ref="select"
              v-model:value="formData.action"
              style="width: 100%"
            >
              <a-select-option value="all">ทั้งหมด</a-select-option>
              <a-select-option value="first_deposit">ฝากเเรก</a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="p-2 alliance-list">
      <a-col :span="11">
        <a-row >
          <a-col class="p-1" :span="15">
            <label>เริ่มต้นวันที่</label>
            <a-date-picker v-model:value="formData.dateStart" />
          </a-col>
          <a-col class="p-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeStart" format="HH:mm" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="11">
        <a-row>
          <a-col class="p-1" :span="15">
            <label>ถึงวันที่</label>
            <a-date-picker v-model:value="formData.dateEnd" />
          </a-col>
          <a-col class="p-1" :span="8">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeEnd" format="HH:mm" />
          </a-col>
        </a-row>
      </a-col>
      <a-col class="p-1" :span="2">
        <label><br></label>
        <a-button class="submit sky" type="primary" @click="search"><SearchOutlined /> ค้นหา</a-button>
      </a-col>
    </a-row>
    <a-row class="p-2">
      <div>
        <a-radio-group v-model:value="formData.dateSelect" @change="handleDateSelectChange">
          <a-radio-button value="Today">วันนี้</a-radio-button>
          <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
          <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
          <a-radio-button value="LastMonth">เดือนที่เเล้ว</a-radio-button>
        </a-radio-group>
      </div>
    </a-row>
  <a-row>
    <a-col class="p-1">
      <a-table 
          :columns="dynamicColumns"
          :data-source="dataShow"
          bordered
          :scroll="{ x: 1000, y: 700 }"
          :pagination="paginationConfig"
          :loading="loading"
          @change="handleTableChange"
      >
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'username'">
              <div class="text-center">{{ record.username }}</div>
            </template>
            <template v-if="column.key === 'type'">
              <div class="text-center"  v-if="record.type == 1 || record.type == 3"><a-tag color="green">ฝากเงิน</a-tag></div>
              <div class="text-center" v-else-if="record.type == 2"><a-tag color="red" >ถอนเงิน</a-tag></div>
            </template>
            <template v-if="column.key === 'amount'">
              <div class="text-center">{{ record.amount }}</div>
            </template>
            <template v-if="column.key === 'bonus'">
              <div class="text-center">{{ record.bonus }}</div>
            </template>
            <template v-else-if="column.key === 'created_at'">
              <div class="text-center">{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
        </template>
        <template #summary>
          <tr class="center">
              <td colspan=1><strong>ผลรวมทั้งหมด</strong></td>
              <td colspan=2></td>
              <td><strong>{{sumBetWinLoss.toFixed(2)}}</strong></td>
              <td colspan=1></td>
          </tr>
          <tr class="center" v-if="formData.status == 'all'">
              <td colspan=1><strong>Company</strong></td>
              <td colspan=1>{{Alliance.getCompany()}} %</td>
              <td colspan=1> = {{ Number(Alliance.getCompany()) / 100 }} * {{ sumBetWinLoss }}</td>
              <td colspan=1>{{ companyResult.toFixed(2) }}</td>
              <td><strong>{{ company.toFixed(2) }}</strong></td>
          </tr>
          <tr class="center" v-if="formData.status == 'all'">
              <td colspan=1><strong>Commission</strong></td>
              <td colspan=1>{{Alliance.getPercent()}} %</td>
              <td colspan=1> = {{ Number(Alliance.getPercent()) / 100 }} * {{ companyResult.toFixed(2) }}</td>
              <td>{{ Number(companyResult - (companyResult * (Number(Alliance.getPercent()) / 100))).toFixed(2) }}</td>
              <td colspan=1><strong>{{ commission.toFixed(2) }}</strong></td>
          </tr>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { getMemberProfitServices } from '~/services/allianceServices';
import { memberStore } from '~/store/index';
import * as Alliance from '~/auth/alliance';
// import { SelectTypes } from 'ant-design-vue/es/select';
const member = memberStore();
const route = useRoute()

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const sumBetWinLoss = ref<number>(0);
const company = ref<number>(0);
const companyResult = ref<number>(0);
const commission = ref<number>(0);

const dataShow = ref<any[]>([]);
const allRecord = ref<number>(0);
const loading = ref(true);

const dynamicColumns = computed(() => {
  return [
  { title: `ทั้งหมด ${allRecord.value} รายการ`, children: [
    { title: 'ยูสเซอร์เนม', width:80, dataIndex: 'username', key: 'username' },
    { title: 'สถานะ', dataIndex: 'type', key: 'type', width: 100 },
    // { title: 'เลขบัญชี', width:80, dataIndex: 'bank_no', key: 'bank_no' },
    { title: 'โบนัส', width:80, dataIndex: 'bonus', key: 'bonus' },
    { title: 'จำนวนเงิน', width:80, dataIndex: 'amount', key: 'amount' },
    { title: 'วันที่', dataIndex: 'created_at', key: 'created_at', width: 80 },
  ] },
  ];
});

const formState = reactive<any>({
        regisAll: '0',
        regisToday: '0',
        totalDeposit: '0',
        totalWithdraw: '0',
        totalProfit: '0',
        totalBonus: '0',
        countSumDepositMember: '0',
        countSumDepositMemberNew: '0',
        countSumDepositMemberNew0: '0',
        totalFirstDeposit: '0',
        reNewPassword: '',
    });

let formData = reactive({
    dateSelect:ref<string>('Today'),
    timeStart:ref(dayjs('00:00:00', 'HH:mm')),
    timeEnd:ref(dayjs('23:59:59', 'HH:mm')),
    dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    page:ref<number>(1),
    pageSize:ref<number>(10),
    status:"all",
    action:"all",
  });

const getDataAlliance = async() => {
  loading.value = true;
  const ref_value = Array.isArray(route.query.ref)
    ? route.query.ref[0] || ""
    : route.query.ref || "";
  const token = Array.isArray(route.query.token)
    ? route.query.token[0] || ""
    : route.query.token || "";
    const permission = Array.isArray(route.query.status)
    ? route.query.status[0] || ""
    : route.query.status || "";
  // console.log(ref_value)

  // member.alliance.ref = ref_value
  Alliance.setRef(ref_value) 
  Alliance.setToken(token) 
  Alliance.setPermission(permission) 
  const data = await getMemberProfitServices(formData,ref_value,token,permission);
    if (data.status === "success") {
      dataShow.value = data.data.data
      allRecord.value = data.data.recordsTotal

      sumBetWinLoss.value = data.data.totalProfit || 0;
      // sumBetWinLoss.value = 10000;
      company.value = (Number(sumBetWinLoss.value) * Number(Alliance.getCompany()) / 100);
      
      const sumBetWinLossValue = Number(sumBetWinLoss.value ?? 0);
      const companyPercent = Number(Alliance.getCompany() ?? 0);
      
      companyResult.value = sumBetWinLossValue - (sumBetWinLossValue * companyPercent / 100);
      commission.value = (Number(companyResult.value) * Number(Alliance.getCompany()) / 100);


      paginationConfig.value.total = data.data.recordsTotal;
  }
  loading.value = false;
}
const search = () =>{
  getDataAlliance();
}
const handleSelectChange = () =>{
  formData.action = "all"
}
const handleDateSelectChange = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    if(formData.dateSelect === "Today"){
      formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    } else if(formData.dateSelect === "Yesterday"){
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);
      const day = String(yesterday.getDate()).padStart(2, '0');
      formData.dateStart = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
      formData.dateEnd = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    } else if(formData.dateSelect === "ThisMonth"){
      const firstDay = dayjs(`${year}-${month}-01`, 'YYYY-MM-DD');
      const lastDay = dayjs(firstDay).endOf('month');
      formData.dateStart = firstDay;
      formData.dateEnd = lastDay;
    }else if (formData.dateSelect === "LastMonth") { // เพิ่มเงื่อนไขสำหรับเดือนที่แล้ว
        const lastMonth = dayjs().subtract(1, 'month');
        const firstDay = dayjs(lastMonth).startOf('month');
        const lastDay = dayjs(lastMonth).endOf('month');
        formData.dateStart = firstDay;
        formData.dateEnd = lastDay;
    }else if(formData.dateSelect === "all"){
      const firstDay = dayjs(`1999-01-01`, 'YYYY-MM-DD');
      const lastDay = dayjs(`9999-12-31`, 'YYYY-MM-DD');
      formData.dateStart = firstDay;
      formData.dateEnd = lastDay;
    }

    formData.timeStart = dayjs('00:00', 'HH:mm');
    formData.timeEnd = dayjs('23:59', 'HH:mm');
    getDataAlliance();
};

const paginationConfig = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `ทั้งหมด ${total} รายการ`,
});

const handleTableChange = (pagination: any) => {
  formData.page = pagination.current
  getDataAlliance();
  paginationConfig.value.current = pagination.current
  paginationConfig.value.pageSize = pagination.pageSize
};

onMounted( () => {
    getDataAlliance();
});


definePageMeta({
  layout: 'alliance'
})
</script>

<style scoped>
/* General spacing */
.px-1 {
  padding: 8px; /* Balanced padding */
}

/* Align text to the right */
.text-right {
  text-align: right;
}

/* Card container with gradient background */
.card-list {
  border: 1px solid rgba(0, 0, 0, 0.1); /* Transparent border */
  border-radius: 15px; /* Smooth rounded corners */
  padding: 15px; /* Balanced padding */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Subtle shadow */
  background: linear-gradient(88deg, rgb(19, 180, 202), rgb(24, 202, 190)); /* Gradient background */
  color: #ffffff; /* White text for better contrast */
  transition: all 0.3s ease; /* Smooth hover effect */
}

.card-list:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); /* Stronger shadow on hover */
  transform: translateY(-5px); /* Slight lift on hover */
  background: linear-gradient(88deg, rgb(17, 152, 170), rgb(20, 170, 160)); /* Slightly darker gradient on hover */
}

/* Card value styling */
.card-value {
  font-size: 28px; /* Bigger font size for visibility */
  font-weight: bold; /* Bold text */
  color: #ffffff; /* White text */
  margin-top: 12px; /* Increased spacing above */
  text-align: center; /* Center alignment */
}

/* Footer text */
.card-footer {
  font-size: 12px; /* Slightly larger text for better readability */
  color: rgba(255, 255, 255, 0.9); /* Slightly brighter white */
  margin-top: 10px; /* Adjusted spacing above */
  text-align: center; /* Center alignment */
  font-style: italic; /* Italic style for subtle emphasis */
}

.text-center{
  text-align: center;
}

/* Responsive adjustments for mobile */
@media (max-width: 768px) {
  .card-list {
    padding: 12px; /* Reduce padding on smaller screens */
  }

  .card-value {
    font-size: 24px; /* Adjust font size */
  }

  .card-footer {
    font-size: 12px; /* Adjust footer font size */
  }
}
</style>

<style>
.ant-picker{
  width: 100%;
}
:where(.css-dev-only-do-not-override-19iuou).ant-table-wrapper .ant-table-thead >tr>th, :where(.css-dev-only-do-not-override-19iuou).ant-table-wrapper .ant-table-thead >tr>td{
  text-align: center !important;
}
</style>