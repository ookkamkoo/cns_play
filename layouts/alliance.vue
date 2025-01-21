<template>
  <!-- Drawer (สำหรับ Mobile) -->
  <a-drawer
    :placement="placement"
    :closable="false"
    :open="open"
    :width="270"
    @close="onClose"
  >
    <a-row class="sidebar-mobile">
      <a-flex :justify="'space-between'" :align="'center'" class="p-1">
        <a-col>
          <a-avatar
            src="https://www.antdv.com/assets/logo.1ef800a8.svg"
          />
          <span class="app-name">พันธมิตร</span>
        </a-col>
       <a-col><MenuOutlined class="menu-list-mobile" @click="onClose" /></a-col>
      </a-flex>
      <a-flex vertical class="user-profile-container p-2">
        <!-- โซน Avatar -->
        <a-row class="p-3" :justify="'center'">
          <a-col class="avatar-center">
            <a-avatar style="background-color: #87d068">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </a-col>
        </a-row>

        <!-- ข้อความด้านล่าง -->
        <div class="user-id text-center">{{Alliance.getUsername()}}</div> 
        <a-flex :justify="'space-between'">
          <a-col :span="12"><p class="user-id">Percent: {{Alliance.getPercent()}} %</p></a-col>
          <a-col :span="12"><p class="user-id center">Company: {{Alliance.getCompany()}} %</p></a-col>
        </a-flex>
        <p class="user-id" v-if="Alliance.getAgentType() == '0'"><b>ประเภท :</b> ยอดเสีย</p><p class="user-id" v-else-if="Alliance.getAgentType() == '1'"><b>ประเภท :</b> ยอดฝากถอน</p>
      </a-flex>
      <ul>
        <li>
          <router-link :to="`/alliance/dashboard?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
            <HomeOutlined /> หน้าแรก
          </router-link>
        </li>
        <li>
          <router-link :to="`/alliance/all-members?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
            <TeamOutlined /> สมาชิกทั้งหมด
          </router-link>
        </li>
        <li>
          <router-link :to="`/alliance/members-transaction?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
            <SwapOutlined /> รายการ ฝาก-ถอน
          </router-link>
        </li>
        <li>
          <router-link :to="`/alliance/members-game?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
            <TrophyOutlined /> รายการเกมส์
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/alliance/old-members-deposit">
            <GiftOutlined /> สมาชิกเก่าฝาก
          </router-link>
        </li>
        <li>
          <router-link to="/alliance/new-members-deposit">
            <GiftOutlined /> สมาชิกใหม่ฝาก
          </router-link>
        </li>
        <li>
          <router-link to="/alliance/new-members-no-deposit">
            <GiftOutlined /> สมัครใหม่ไม่ฝาก
          </router-link>
        </li> -->
        <!-- <li>
          <router-link to="`/alliance/commission?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
            <GiftOutlined /> ค่าคอมมิชชั่น
          </router-link>
        </li> -->
        <!-- <li>
          <router-link :to="`/alliance/first-deposit?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
            <GiftOutlined /> ฝากแรก
          </router-link>
        </li> -->
      </ul>
    </a-row>
  </a-drawer>

  <!-- Layout หลัก -->
  <a-row :justify="'center'">
    <!-- Sidebar บนจอใหญ่ -->
    <a-col :span="24" :md="6" :lg="4" class="sidebar-alliance p-2">
      <!-- User Info Section -->
      <a-flex :justify="'center'" :align="'center'" wrap="wrap" class="user-info">
        <a-col :span="24" :md="6">
          <!-- ไอคอนเมนู (แสดงเฉพาะจอเล็ก) -->
          <MenuOutlined class="menu-list" @click="showDrawer" />
          <div class="user-avatar">
            <a-avatar style="background-color: #87d068" :size="48">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </div>
        </a-col>
        <a-col :span="24" :md="18">
          <div class="user-details" >
            <p class="user-id">ผู้ใช้งาน: {{Alliance.getUsername()}}</p>
            <p class="user-id">Percent: {{Alliance.getPercent()}} %</p>
            <p class="user-id">Company: {{Alliance.getCompany()}} %</p>
            <p class="user-id" v-if="Alliance.getAgentType() == '0'"><b>ประเภท :</b> ยอดเสีย</p>
            <p class="user-id" v-else-if="Alliance.getAgentType() == '1'"><b>ประเภท :</b> ยอดฝากถอน</p>
          </div>
          <div class="user-details-mobile" >
            <a-flex :justify="'space-around'">
              <p >ผู้ใช้งาน: {{Alliance.getUsername()}}</p>
              <p  v-if="Alliance.getAgentType() == '0'"><b>ประเภท :</b> ยอดเสีย</p><p  v-else-if="Alliance.getAgentType() == '1'"><b>ประเภท :</b> ยอดฝากถอน</p>
            </a-flex>
            <a-flex :justify="'space-around'">
              <p >Percent: {{Alliance.getPercent()}} %</p>
              <p >Percent: {{Alliance.getCompany()}} %</p>
            </a-flex>
          </div>
        </a-col>
        <a-col :span="24" :md="24">
          <a-row horizontal class="credit-info">
            <a-col span="24" class="credit-label">
              ยอดเงินที่ได้รับ
            </a-col>
            <a-col span="24" class="credit-amount">
              {{ Alliance.getCredit() }}
            </a-col>
          </a-row>
        </a-col>
      </a-flex>

      <!-- Sidebar Menu (แสดงเฉพาะจอใหญ่) -->
      <a-row class="sidebar-list">
        <ul>
          <li>
            <router-link :to="`/alliance/dashboard?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
              <HomeOutlined /> หน้าแรก
            </router-link>
          </li>
          <li>
            <router-link :to="`/alliance/all-members?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
              <TeamOutlined /> สมาชิกทั้งหมด
            </router-link>
          </li>
          <li>
            <router-link :to="`/alliance/members-transaction?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
              <SwapOutlined /> รายการ ฝาก-ถอน
            </router-link>
          </li>
          <li>
            <router-link :to="`/alliance/members-game?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
              <TrophyOutlined /> รายการเกมส์
            </router-link>
          </li>
          <!-- <li>
            <router-link to="/alliance/old-members-deposit">
              <GiftOutlined /> สมาชิกเก่าฝาก
            </router-link>
          </li>
          <li>
            <router-link to="/alliance/new-members-deposit">
              <GiftOutlined /> สมาชิกใหม่ฝาก
            </router-link>
          </li>
          <li>
            <router-link to="/alliance/new-members-no-deposit">
              <GiftOutlined /> สมัครใหม่ไม่ฝาก
            </router-link>
          </li>
          <li>
            <router-link to="/alliance/commission">
              <GiftOutlined /> ค่าคอมมิชชั่น
            </router-link>
          </li> -->
          <!-- <li>
            <router-link :to="`/alliance/first-deposit?ref=${Alliance.getRef()}&token=${Alliance.getToken()}&status=${Alliance.getPermission()}`">
              <GiftOutlined /> ฝากแรก
            </router-link>
          </li> -->
        </ul>
      </a-row>
    </a-col>

    <!-- Content (Slot) -->
    <a-col :span="24" :md="18" :lg="16">
      <slot />
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CheckCircleOutlined } from '@ant-design/icons-vue'
import type { DrawerProps } from 'ant-design-vue'
import { memberStore } from '~/store/index';
import * as Alliance from '~/auth/alliance';
const member = memberStore();


const placement = ref<DrawerProps['placement']>('left')
const open = ref<boolean>(false)

const showDrawer = () => {
  open.value = true
}

const onClose = () => {
  open.value = false
}
</script>

<style scoped>
/* User Info (แถบสีฟ้าด้านบน) */
.user-info {
  margin-bottom: 20px;
  background: linear-gradient(88deg, rgb(19, 180, 202), rgb(24, 202, 190));
  padding: 15px;
  border-radius: 10px;
  color: #ffffff;
}

.user-avatar {
  text-align: center;
}

.user-details {
  margin-left: 10px;
}

.user-id {
  font-size: 12px;
  color: whitesmoke !important;
}

.account-name {
  font-weight: bold;
  color: #ff9800;
}

.account-status {
  font-size: 12px;
  color: whitesmoke;
  display: flex;
  align-items: center;
}

.account-status span {
  margin-right: 5px;
}

/* Credit Info */
.credit-info {
  background-color: #f9f9f98c;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  color: #ffffff;
}

.credit-label {
  font-size: 14px;
  color: #262626;
  margin-bottom: 5px;
}

.credit-amount {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #3c3c3c;
}

/* Sidebar ด้านซ้าย (แสดงเฉพาะจอใหญ่) */
/* .sidebar-alliance {
  padding: 5px;
} */

.sidebar-list {
  background: linear-gradient(88deg, rgb(19, 180, 202), rgb(24, 202, 190));
  border-radius: 10px;
  padding: 10px 15px;
  margin-top: 20px;
}

.sidebar-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.sidebar-list li {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 8px;
  color: #ffffff;
  transition: background 0.3s ease, color 0.3s ease;
}
.sidebar-list a {
  padding: 8px 10px;
  width: 100%;
}

.sidebar-list li span {
  margin-right: 8px;
}

.sidebar-list li:hover {
  background: rgba(255, 255, 255, 0.3);
  color: #ffeb3b;
  cursor: pointer;
}

.sidebar-list a {
  color: whitesmoke;
}

/* ไอคอนเมนู (MenuOutlined) - ปกติซ่อนในจอใหญ่ */
.menu-list {
  cursor: pointer;
  font-size: 17px;
  margin-right: 10px;
}

/* Drawer (Mobile) */
.sidebar-mobile {
  /* พื้นหลังขาว */
  background-color: #fff;
  height: 100%;
  padding: 15px;

  /* ตัวอักษร/ไอคอนปกติเป็นสีดำ */
  color: rgba(0, 0, 0, 0.88);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.sidebar-mobile ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-mobile li {
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 8px 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  /* สีตัวอักษรเริ่มต้น (ไม่ขัดกับ .sidebar-mobile color) */
  color: rgba(0, 0, 0, 0.88);
  transition: background 0.3s ease;
}

/* Hover effect */
.sidebar-mobile li:hover {
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.88); /* คงสีดำไว้ หรือเปลี่ยนเป็นสีอื่นตามต้องการ */
  cursor: pointer;
}

.sidebar-mobile li span {
  margin-right: 8px;
}

/* ลิงก์ (RouterLink) ใน Drawer ให้เป็นสีดำ */
.sidebar-mobile a {
  color: rgba(0, 0, 0, 0.88);
  text-decoration: none;
}

/* ป้องกันลิงก์เปลี่ยนสีตอน hover/visited (ตั้งเป็น rgba(0, 0, 0, 0.88) เช่นเดิม) */
.sidebar-mobile a:hover,
.sidebar-mobile a:visited,
.sidebar-mobile a:active {
  color: rgba(0, 0, 0, 0.88);
}
.app-name {
  margin-left: 8px;
  font-weight: bold;
  font-size: 16px;
}
.avatar-center{
  margin: auto 0;
}

.user-profile-container {
  /* ตัวอย่าง: พื้นหลังขาว, มุมโค้ง, เงา ฯลฯ */
  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0 2px 5px rgba(0,0,0,0.1); */
  padding: 16px; 
  /* ปรับตามความเหมาะสม */
}

/* แก้ไขระยะ padding ด้านใน */
.p-3 {
  padding: 1rem; /* 1 rem = ประมาณ 16px แล้วแต่ config */
}

/* จัดวาง Avatar ให้อยู่กลางคอลัมน์ */
.avatar-center {
  display: flex;
  justify-content: center;
  /* หากต้องการปรับขนาด Avatar หรือ margin เพิ่มก็ทำได้เช่นกัน */
}

/* จัดแนวข้อความให้กึ่งกลาง */
.text-center {
  text-align: center;
  margin: 4px 0; /* ให้มีระยะห่างเล็กน้อยบนล่าง */
}

/* สไตล์เฉพาะสำหรับ user-id, user-name เพิ่มได้ตามต้องการ */
.user-id {
  font-weight: 500; /* กึ่งหนา */
  color: #333;
}

.user-name {
  font-weight: 700; /* หนากว่า */
  color: #555;
}


/* สไตล์ Responsive */
/* ซ่อน Sidebar บนจอเล็ก (< 768px), ใช้ Drawer แทน */
@media (max-width: 767px) {
  .sidebar-list {
    display: none !important;
  }
  .user-details {
    display: none !important;
  }
}

/* ซ่อนปุ่มเมนู Drawer บนจอใหญ่ (> 767px) */
@media (min-width: 767px) {
  .menu-list {
    display: none !important;
  }
  .user-details-mobile {
    display: none !important;
  }
}
</style>
