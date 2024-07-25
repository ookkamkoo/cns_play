<template>
    <a-modal v-model:open="openAddTrue" :footer="null">
      <FormAddTruewallet :closeModal="closeModal"/>
    </a-modal>
    <h3>ฝากเงิน</h3>
    <div class="my-2 info-warning">
      <h4>คำเตือน</h4>
      <div>
        - ฝากเงินด้วยบัญชีที่ท่านลงทะเบียนไว้เท่านั้น
      </div>
      <div>
        - กรณีฝากเงิน ให้เข้าเมนูฝากเงินของระบบเพื่อคัดลอกเลขบัญชีเท่านั้น เมื่อระบบเปลี่ยนบัญชีใหม่แล้ว ห้ามโอนไปบัญชีเดิมเด็ดขาด
      </div>
    </div>
    <a-row class="my-3">
      <a-col :span="24" :md="24" :xl="12"  class="my-1" v-for="value in bankSystem">
          <a-flex class="info-bank mx-1" :align="'center'" :justify="'center'" wrap="wrap">
              <a-col :span="8" :md="12" :lg="8"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  :src="value.bank.image"
                />
              </a-col>
              <a-col :span="16" :md="12" :lg="16">
                <div class="bank">
                  <span class="bank-title">ธนาคาร : </span> {{value.bank.name}}
                </div>
                <div class="name">
                  <span class="name-title">ชื่อบัญชี : </span> {{value.name}}
                </div>
                <div class="bank-number">
                  <span class="bank-number-title">เลขบัญชี : </span> {{value.book_number}} 
                </div>
              </a-col>
              <a-col :span="24" class="coppy-book-number">
                <div class="info-bank-coppy center my-1" @click="coppyBookNumber(value.book_number)">
                  <CopyOutlined /> คัดลอก
                </div>
              </a-col>
          </a-flex>
      </a-col>
    </a-row>
    <h3>บัญชีที่ลูกค้าลงทะเบียน</h3>
    <a-flex wrap="wrap">
      <a-col :span="24" :md="24" :xl="12" class="my-1">
          <a-flex class="info-bank mx-1" :align="'center'" :justify="'center'">
              <a-col :span="8" :md="12" :lg="8"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  :src="member.memberDetail.bank.image"
                />
              </a-col>
              <a-col :span="16" :md="12" :lg="16">
                <div class="bank">
                  <span class="bank-title">ธนาคาร : </span> {{ member.memberDetail.bank.name }}
                </div>
                <div class="name">
                  <span class="name-title">ชื่อบัญชี : </span> {{ member.memberDetail.firstname }} {{ member.memberDetail.lastname }}
                </div>
                <div class="bank-number">
                  <span class="bank-number-title">เลขบัญชี : </span> {{ member.memberDetail.bank_no }} 
                </div>
              </a-col>
          </a-flex>
      </a-col>
      <a-col :span="24" :md="24" :xl="12" class="my-1">
          <a-flex class="info-bank mx-1" :align="'center'" :justify="'center'" wrap="wrap" v-if="member.memberDetail.bank_true_no != ''">
              <a-col :span="8" :md="12" :lg="8"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  :src="member.memberDetail.bank_true.image"
                />
              </a-col>
              <a-col :span="16" :md="12" :lg="16">
                <div class="bank">
                  <span class="bank-title">ธนาคาร : </span> {{ member.memberDetail.bank_true.name }}
                </div>
                <div class="name">
                  <span class="name-title">ชื่อบัญชี : </span> {{ member.memberDetail.firstname }} {{ member.memberDetail.lastname }}
                </div>
                <div class="bank-number">
                  <span class="bank-number-title">เลขบัญชี : </span> {{ member.memberDetail.bank_true_no }} 
                </div>
              </a-col>
          </a-flex>
          <a-flex class="info-bank mx-1" :align="'center'" :justify="'center'" wrap="wrap" v-else>
              <a-col :span="8" :md="12" :lg="8"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  src="https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/TRUEMONEY.png"
                />
              </a-col>
              <a-col :span="16" :md="12" :lg="16">
                <div class="bank">
                  <span class="bank-title">ธนาคาร : </span> ทรูมันนี่วอลเล็ท
                </div>
                <div class="my-1">
                    <a-button ghost @click="showModalAddtrue()">เพิ่มบัญชี</a-button>
                </div>
              </a-col>
          </a-flex>
      </a-col>
    </a-flex>
</template>
<script setup lang="ts">
import { getBankSystem } from "~/services/bankService";
import type { BankSystem } from "~/services/bankService";
import { Alert } from '~/components/alert/alertComponent';
import { memberStore } from '~/store/index';

const member = memberStore();

const bankSystem = ref<BankSystem[]>([]);
const openAddTrue = ref<boolean>(false);

const showModalAddtrue = () => {
  openAddTrue.value = true;
};
  
onMounted( async() => {
  var data = await getBankSystem();
  console.log(data);
  if(data.status="success"){
    bankSystem.value = data.data
  }
});

const coppyBookNumber = async(data:string) =>{
  try {
    await navigator.clipboard.writeText(data);
    Alert("success","Coppy data success.")
  } catch (err) {
    Alert("error","Coppy fail.")
  }
}

const closeModal = () => {
  openAddTrue.value = false;
};

definePageMeta({
  layout: 'information'
})
</script>
<style>
.info-bank{
  padding: 1rem;
  background: linear-gradient(#2c002c, #100f4e) !important;
  border-radius: 10px;
}
.name{
  font-size: 17px;
  color: #FF9100FF;
}
.info-bank-coppy{
  color: whitesmoke;
  border-radius: 10px;
  padding: 5px;
  background-color: #FF9100FF;
  cursor: pointer;
}
.info-bank-coppy:hover{
  background-color: #eda33c;
}
.info-image img{
  border-radius: 5px;
}
.info-warning{
  color: rgb(249, 68, 68);
}
.coppy-book-number{
  margin-top: 1rem;
}
</style>