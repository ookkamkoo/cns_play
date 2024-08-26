<template>
    <h2>แจ้งถอนเงิน</h2>
    <h4>เลือกบัญชีถอนเงิน</h4>
    <a-flex wrap="wrap" :align="'center'" :justify="'center'">
      <a-col :span="24" :sm="12" class="my-1 bank-member" @click="toggleClass(1)" >
          <a-flex class="info-bank mx-1" :class="{ 'clicked': isClicked1 }" :align="'center'" :justify="'center'" wrap="wrap">
              <a-col :span="24" :md="24" :lg="24"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  :src="member.memberDetail.bank.image"
                />
              </a-col>
              <a-col :span="24" :xs="24" :lg="24" class="center bank-member-detail">
                <div class="bank">
                  <span class="bank-title"></span> {{ member.memberDetail.bank.name }}
                </div>
                <div class="name">
                  <span class="name-title"></span> {{ member.memberDetail.firstname }} {{ member.memberDetail.lastname }}
                </div>
                <div class="bank-number">
                  <span class="bank-number-title"></span> {{ member.memberDetail.bank_no }} 
                </div>
              </a-col>
          </a-flex>
      </a-col>
      <a-col :span="24" :sm="12" class="my-1 bank-member" @click="toggleClass(2)"  v-if="member.memberDetail.bank_true_no != ''">
          <a-flex class="info-bank mx-1" :class="{ 'clicked': isClicked2 }"  :align="'center'" :justify="'center'" wrap="wrap">
              <a-col :span="24" :md="24" :lg="24"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  src="https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/TRUEMONEY.png"
                />
              </a-col>
              <a-col :span="24" :md="24" :lg="24" class="center bank-member-detail">
                <div class="bank">
                  <span class="bank-title"></span> {{ member.memberDetail.bank_true.name }}
                </div>
                <div class="name">
                  <span class="name-title"></span> {{ member.memberDetail.firstname }} {{ member.memberDetail.lastname }}
                </div>
                <div class="bank-number">
                  <span class="bank-number-title"></span> {{ member.memberDetail.bank_true_no }}
                </div>
              </a-col>
          </a-flex>
      </a-col>
      <a-col :span="24" class="my-2">
        <a-flex wrap="wrap">
            <a-col :span="24" :sm="12" class="input-withdraw my-1">
                <label for="">จำนวนเงินที่ถอนได้</label>
                <div class="max-amount">{{formState.maxAmount}}</div>
                <p class="input-withdraw-detail">จำนวนเงินที่ลูกค้ามี</p>
            </a-col>
            <a-col :span="24" :sm="12" class="input-withdraw my-1">
                <a-input-group compact>
                    <label for="">จำนวนเงินที่ถอนได้</label>
                    <a-input-number v-model:value="formState.amount" style="width: calc(100% - 75px);font-weight: 600;" class="form-withdraw" :step="0.01" :max="formState.maxAmount"/>
                    <a-button type="primary" @click="allWithdrow()" class="bt-withdraw">ทั้งหมด</a-button>
                    <p class="input-withdraw-detail">ถอนขั้นต่ำ 0 - 100000 บาท</p>
                </a-input-group>
            </a-col>
            <a-col :span="24" class="center">
              <a-button type="primary" ghost :style="{ width: '80px', margin: '5px' }" @click="addAmount(10)">10</a-button>
              <a-button type="primary" ghost :style="{ width: '80px', margin: '5px' }" @click="addAmount(50)">50</a-button>
              <a-button type="primary" ghost :style="{ width: '80px', margin: '5px' }" @click="addAmount(100)">100</a-button>
              <a-button type="primary" ghost :style="{ width: '80px', margin: '5px' }" @click="addAmount(500)">500</a-button>
              <a-button type="primary" ghost :style="{ width: '80px', margin: '5px' }" @click="addAmount(1000)">1000</a-button>
              <a-button type="primary" ghost :style="{ width: '80px', margin: '5px' }" @click="addAmount(5000)">5000</a-button>
              <a-button type="primary" ghost :style="{ width: '80px', margin: '5px' }" @click="addAmount(10000)">10000</a-button>
              <a-button type="primary" ghost :style="{ width: '100px', margin: '5px' }" @click="addAmount(0)" danger>ลบทั้งหมด</a-button>
            </a-col>
        </a-flex>
      </a-col>
      <a-col :span="24" class="my-2">
        <a-flex :justify="'center'" :align="'center'">
            <a-button size="large" type="primary" class="mx-1" style="width: 100%;" danger @click="props.closeModal">ยกเลิก</a-button>
            <a-button size="large" type="primary" class="mx-1" style="width: 100%;" @click="confirmWithdraw()">ถอนเงิน</a-button>
        </a-flex>
      </a-col>
    </a-flex>
</template>
<script lang="ts" setup>
import { memberStore } from "~/store/index";
import { withdrawServices } from "~/services/withdraw";
import { Alert } from "../alert/alertComponent";
const isClicked1 = ref(true);
const isClicked2 = ref(false);

const member = memberStore();

const props = defineProps({
  closeModal: Function
});

const toggleClass = (colNum: number) => {
  if (colNum === 1) {
    isClicked1.value = true;
    isClicked2.value = false;
    formState.withdraw_with = 'bank'
    console.log('bank');
  } else if (colNum === 2) {
    isClicked2.value = true;
    isClicked1.value = false;
    formState.withdraw_with = 'true'
    console.log('true');
  }
};

const allWithdrow = () =>{
    formState.amount = member.memberDetail.balance.toFixed(2)
}

const formState = reactive<any>({
    maxAmount: member.memberDetail.balance.toFixed(2),
    amount: 0,
    withdraw_with:'bank'
  });

const addAmount = (amount:number) =>{
  if(amount == 0){
    formState.amount = 0
  }else{
    formState.amount += amount
  }

  if(formState.amount > member.memberDetail.balance){
    formState.amount = member.memberDetail.balance
  }
}

const confirmWithdraw = () =>{
  if(formState.amount == 0){
    Alert("error","กรุณากรอกจำนวนเงินให้ถูกต้อง")
  }else{
    withdraw();
  }
}

const withdraw = async() => {
  var data = await withdrawServices(formState.amount,formState.withdraw_with);
  if(data.status == 'success'){
      Alert("success","ทำรายการถอนเงินเรียบร้อย")
      if (props.closeModal) {
        props.closeModal();
      }
  }else{
    Alert("error",data.error);
  }
}

</script>
<style scoped>
    .bank-member-detail{
        margin-top: 1rem;
    }
    .info-bank:hover{
        cursor: pointer;
    }
    .clicked {
        background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%) !important;
    }
    .input-withdraw{
        padding: 0 5px;
    }
    .form-withdraw{
        border-radius: 6px 0 0 6px !important;
        font-family: 800 !important;
    }
    .input-withdraw-detail{
        margin: 2px 0;
        font-size: 12px;
        color: rgba(171, 171, 171, 0.818);
    }
    .bt-withdraw{
        border-radius: 0 6px 6px 0 !important;
        background-color: #FF9100FF;
    }
    .bt-withdraw:hover{
        background-color: #FF9100FF;
    }
    .max-amount{
        background-color: whitesmoke;
        border-radius: 6px;
        padding: 5px;
        text-align: center;
        font-weight: 600;
        color: black;
    }
</style>