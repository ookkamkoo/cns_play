<template>
    <a-modal v-model:open="openAddTrue" :footer="null">
      <FormAddTruewallet :closeModal="closeModalAddtrue"/>
    </a-modal>
    <a-modal v-model:open="open" :footer="null">
      <FormWithdraw :closeModal="closeModal"/>
    </a-modal>
    <h3>ถอนเงิน</h3>
    <a-flex class="info-withdrow" wrap="wrap">
        <a-col :span="24" :md="12" :xl="8">
            <div class="m-1 info-withdrow-list">
                <div class="info-withdrow-title">จำนวนเงิน</div>
                <div class="info-withdrow-amount-title my-1">คงเหลือ</div>
                <div class="info-withdrow-amount center my-1">{{ member.memberDetail.balance.toFixed(2) }}</div>
                <a-col :span="24">
                    <div class="info-bank-coppy center my-2" @click="showModal()">
                        <CopyOutlined /> ถอนเงิน
                    </div>
                </a-col>
            </div>
        </a-col>
        <!-- <a-col :span="24" :md="12" :xl="8">
            <div class="m-1 info-withdrow-list">
                <div class="info-withdrow-title">จำนวนเหรียญ</div>
                <div class="info-withdrow-amount-title my-1">คงเหลือ</div>
                <div class="info-withdrow-amount center my-1"> {{ member.memberDetail.balance_event }}</div>
                <a-col :span="24">
                    <div class="info-bank-coppy center my-2">
                        <CopyOutlined /> เล่นเกมส์
                    </div>
                </a-col>
            </div>
        </a-col> -->
    </a-flex>
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
      <a-col :span="24" :md="24" :xl="12" class="my-1" v-if="member.settingDefault.registerTruewallet == 'true'">
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
  import { Alert } from "~/components/alert/alertComponent";
import { memberStore } from "~/store/index";
  const open = ref<boolean>(false);
  const openAddTrue = ref<boolean>(false);

  const member = memberStore();

  const showModal = () => {
    if(member.settingDefault.withdrawStatus == "false"){
      Alert("error","ระบบเงินยังไม่พร้อมใช้งาน.")
    }else{
      open.value = true;
    }
  };

  const closeModal = () => {
    open.value = false;
  };

  const showModalAddtrue = () => {
    openAddTrue.value = true;
  };

  const closeModalAddtrue = () => {
    openAddTrue.value = false;
  };

  
  definePageMeta({
    layout: 'information'
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
</style>