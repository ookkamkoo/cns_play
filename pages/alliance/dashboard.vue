<template>
    <a-row class="p-2 alliance-list">
      <a-col :span="24" :md="10">
        <a-row >
          <a-col class="p-1" :span="15">
            <label>เริ่มต้นวันที่</label>
            <a-date-picker v-model:value="formData.dateStart" />
          </a-col>
          <a-col class="p-1" :span="9">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeStart" format="HH:mm" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="24" :md="10">
        <a-row>
          <a-col class="p-1" :span="15">
            <label>ถึงวันที่</label>
            <a-date-picker v-model:value="formData.dateEnd" />
          </a-col>
          <a-col class="p-1" :span="9">
            <label><br></label>
            <a-time-picker v-model:value="formData.timeEnd" format="HH:mm" />
          </a-col>
        </a-row>
      </a-col>
      <a-col class="p-1" :span="24" :md="4">
        <label><br></label>
        <a-button class="submit sky" type="primary" @click="search" style="width: 100%;"><SearchOutlined /> ค้นหา</a-button>
      </a-col>
    </a-row>
    <a-row class="p-2">
      <div>
        <a-radio-group v-model:value="formData.dateSelect" @change="handleDateSelectChange">
          <a-radio-button value="Today">วันนี้</a-radio-button>
          <a-radio-button value="Yesterday">เมื่อวาน</a-radio-button>
          <a-radio-button value="ThisMonth">เดือนนี้</a-radio-button>
          <a-radio-button value="LastMonth">เดือนที่เเล้ว</a-radio-button>
          <!-- <a-radio-button value="all">ทั้งหมด</a-radio-button> -->
        </a-radio-group>
      </div>
    </a-row>
  <a-row>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/all-members?ref=${Alliance.getRef()}&tick=all`">
        <div class="card-list pointer">
          <a-row>
            <a-col :span="21">
              สมาชิกทั้งหมด
            </a-col>
            <a-col :span="3" class="text-right">
              <TeamOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{formState.regisAll || 0}}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">ยอดรวมสมาชิกทั้งหมด</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/all-members?ref=${Alliance.getRef()}&tick=Today`">
        <div class="card-list pointer">
          <a-row>
            <a-col :span="21">
              สมาชิกใหม่วันนี้
            </a-col>
            <a-col :span="3" class="text-right">
              <TeamOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{formState.regisToday || 0}}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">ยอดรวมสมาชิกใหม่ทั้งหมด</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/members-transaction?ref=${Alliance.getRef()}&tick=deposit`">
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              ยอดฝากวันนี้
            </a-col>
            <a-col :span="3" class="text-right">
              <SwapOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{ parseFloat(formState.totalDeposit || 0).toFixed(2) }}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">ยอดรวมฝากเงิน</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/members-transaction?ref=${Alliance.getRef()}&tick=withdraw`">
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              ยอดถอนวันนี้
            </a-col>
            <a-col :span="3" class="text-right">
              <SwapOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{ parseFloat(formState.totalWithdraw || 0).toFixed(2) }}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">ยอดรวมถอนเงิน</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/members-transaction?ref=${Alliance.getRef()}`">
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              รายได้วันนี้
            </a-col>
            <a-col :span="3" class="text-right">
              <SwapOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value"><span class="card-value">{{ parseFloat(formState.totalProfit || 0).toFixed(2) }}</span></span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">รายได้ฝาก - ถอน</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/members-transaction?ref=${Alliance.getRef()}`">
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              ยอดโบนัส
            </a-col>
            <a-col :span="3" class="text-right">
              <SwapOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value"><span class="card-value">{{ parseFloat(formState.totalBonus || 0).toFixed(2) }}</span></span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">โบนัสรวม</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/members-transaction?ref=${Alliance.getRef()}&tick=members-game`">
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              แพ้ชนะ
            </a-col>
            <a-col :span="3" class="text-right">
              <TrophyOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{ parseFloat(formState.winLost || 0).toFixed(2) }}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">รายการเล่นของสมาชิก</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/all-members?ref=${Alliance.getRef()}&tick=NotToday&action=memberOldDeposit`">
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              สมาชิกเก่าฝาก
            </a-col>
            <a-col :span="3" class="text-right">
              <TeamOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{ formState.countSumDepositMember - formState.countSumDepositMemberNew || 0 }}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">จำนวนสมาชิกเก่าฝาก</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/all-members?ref=${Alliance.getRef()}&tick=Today&action=memberNewDeposit`">
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              สมาชิกใหม่ฝาก
            </a-col>
            <a-col :span="3" class="text-right">
              <TeamOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{ formState.countSumDepositMemberNew || 0 }}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">จำนวนสมาชิกใหม่ฝาก</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/all-members?ref=${Alliance.getRef()}&tick=Today&action=memberNewNotDeposit`">
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              สมัครใหม่ไม่ฝาก
            </a-col>
            <a-col :span="3" class="text-right">
              <TeamOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{ formState.countSumDepositMemberNew0 || 0 }}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">จำนวนสมาชิกใหม่ไม่ฝาก</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <!-- {{Alliance.getAgentType()}} -->
      <NuxtLink :to="`/alliance/members-transaction?ref=${Alliance.getRef()}&tick=Today`" v-if="Alliance.getAgentType()=='1'">
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              ค่าคอมมิชชั่น
            </a-col>
            <a-col :span="3" class="text-right">
              <TeamOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{ parseFloat(formState.commission_alliance || 0).toFixed(2) }}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">คำนวณจากประเภทพันธมิตร</span>
          </a-row>
        </div>
      </NuxtLink>
      <NuxtLink :to="`/alliance/members-game?ref=${Alliance.getRef()}&tick=Today`" v-else>
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              ค่าคอมมิชชั่น
            </a-col>
            <a-col :span="3" class="text-right">
              <GiftOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{ parseFloat(formState.commission_alliance || 0).toFixed(2) }}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">คำนวณจากประเภทพันธมิตร</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
    <a-col :span="12" :md="8" :lg="6" class="px-1">
      <NuxtLink :to="`/alliance/members-transaction?ref=${Alliance.getRef()}&tick=firstDeposit`">
        <div class="card-list">
          <a-row>
            <a-col :span="21">
              ฝากแรก
            </a-col>
            <a-col :span="3" class="text-right">
              <SwapOutlined />
            </a-col>
          </a-row>
          <a-row :justify="'center'">
            <span v-if="load" class="card-value">
              <a-spin></a-spin>
            </span>
            <span v-else class="card-value">{{ parseFloat(formState.totalFirstDeposit || 0).toFixed(2) }}</span>
          </a-row>
          <a-row :justify="'center'">
            <span class="card-footer">ยอดรวมฝากแรก</span>
          </a-row>
        </div>
      </NuxtLink>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { getListAliianceServices } from '~/services/allianceServices';
import * as Alliance from '~/auth/alliance';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const load = ref<boolean>(false)
const route = useRoute()

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
        winLost: '0',
        commission_alliance: '0',
        reNewPassword: '',
    });

let formData = reactive({
    dateSelect:ref<string>('Today'),
    timeStart:ref(dayjs('00:00', 'HH:mm')),
    timeEnd:ref(dayjs('23:59', 'HH:mm')),
    dateStart:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
    dateEnd:ref<Dayjs>(dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD')),
  });

const getListAlliance = async() => {
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

  load.value = true
  const data = await getListAliianceServices(formData,ref_value,token,permission);
    if (data.status === "success") {
      Alliance.setName(data.data.name) 
      Alliance.setUsername(data.data.username) 

      formState.regisAll = data.data.countAll
      formState.regisToday = data.data.countToday
      formState.totalDeposit = data.data.totalDeposit
      formState.totalWithdraw = data.data.totalWithdraw
      formState.totalProfit = data.data.totalProfit
      formState.countSumDepositMember = data.data.countSumDepositMember
      formState.countSumDepositMemberNew = data.data.countSumDepositMemberNew
      formState.countSumDepositMemberNew0 = data.data.countSumDepositMemberNew0
      formState.totalFirstDeposit = data.data.totalFirstDeposit
      formState.winLost = data.data.winLost
      formState.commission_alliance = data.data.commission_alliance

      // member.alliance.credit = data.data.commission_alliance.toFixed(2)
      // member.alliance.percent = data.data.percent
      // member.alliance.company = data.data.company
      Alliance.setCredit(data.data.commission_alliance.toFixed(2)) 
      Alliance.setPercent(data.data.percent)
      
      Alliance.setCompany(data.data.company) 
      Alliance.setAgentType(data.data.agent_type) 
      // allRecord.value = data.data.recordsTotal;
  }
  load.value = false
}

const search = () =>{
  getListAlliance();
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
    getListAlliance();
};

onMounted( () => {
    getListAlliance();
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
  /* transform: translateY(-5px); */
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

.pointer{
  cursor: pointer;
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
.alliance-list label{
  color: #141414 !important; 
}
</style>