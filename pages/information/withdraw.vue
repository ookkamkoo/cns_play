<template>
    <h3>ถอนเงิน</h3>
    <a-flex class="info-withdrow" wrap="wrap">
        <a-col :span="24" :md="8">
            <div class="m-1 info-withdrow-list">
                <div class="info-withdrow-title">ยอดคงเหลือ</div>
                <div class="info-withdrow-amount-title my-1">คงเหลือ</div>
                <div class="info-withdrow-amount center my-1"> 0.00</div>
                <a-col :span="24">
                    <div class="info-bank-coppy center my-2">
                        <CopyOutlined /> ถอนเงิน
                    </div>
                </a-col>
            </div>
        </a-col>
        <a-col :span="24" :md="8">
            <div class="m-1 info-withdrow-list">
                <div class="info-withdrow-title">ยอดคงเหลือ</div>
                <div class="info-withdrow-amount-title my-1">คงเหลือ</div>
                <div class="info-withdrow-amount center my-1"> 0.00</div>
                <a-col :span="24">
                    <div class="info-bank-coppy center my-2">
                        <CopyOutlined /> ถอนเงิน
                    </div>
                </a-col>
            </div>
        </a-col>
    </a-flex>
    <h3>บัญชีที่ลูกค้าลงทะเบียน</h3>
    <a-flex wrap="wrap">
      <a-col :span="24" :md="12" class="my-1">
          <a-flex class="info-bank mx-1" :align="'center'" :justify="'center'">
              <a-col :span="8" :md="12" :lg="8"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  src="https://play.1million.social/th/scb.png"
                />
              </a-col>
              <a-col :span="16" :md="12" :lg="16">
                <div class="bank">
                  <span class="bank-title">ธนาคาร : </span> ไทยพาณิชย์
                </div>
                <div class="name">
                  <span class="name-title">ชื่อบัญชี : </span>ธนากร สุขจิต
                </div>
                <div class="bank-number">
                  <span class="bank-number-title">เลขบัญชี : </span>3804526060 
                </div>
              </a-col>
          </a-flex>
      </a-col>
      <a-col :span="24" :md="12" class="my-1">
          <a-flex class="info-bank mx-1" :align="'center'" :justify="'center'" wrap="wrap">
              <a-col :span="8" :md="12" :lg="8"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  src="https://play.1million.social/th/truewallet.png"
                />
              </a-col>
              <a-col :span="16" :md="12" :lg="16">
                <div class="bank">
                  <span class="bank-title">ธนาคาร : </span> ไทยพาณิชย์
                </div>
                <div class="name">
                  <span class="name-title">ชื่อบัญชี : </span>ธนากร สุขจิต
                </div>
                <div class="bank-number">
                  <span class="bank-number-title">เลขบัญชี : </span>3804526060 
                </div>
              </a-col>
          </a-flex>
      </a-col>
    </a-flex>
</template>
<script setup lang="ts">
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