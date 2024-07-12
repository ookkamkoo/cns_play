<template>
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
      <a-col :span="24" :md="12" class="my-1">
          <a-flex class="info-bank mx-1" :align="'center'" :justify="'center'" wrap="wrap">
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
              <a-col :span="24">
                <div class="info-bank-coppy center my-1">
                  <CopyOutlined /> คัดลอก
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
                  src="https://play.1million.social/th/ttb.png"
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
              <a-col :span="24">
                <div class="info-bank-coppy center my-1">
                  <CopyOutlined /> คัดลอก
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
              <a-col :span="24">
                <div class="info-bank-coppy center my-1">
                  <CopyOutlined /> คัดลอก
                </div>
              </a-col>
          </a-flex>
      </a-col>
    </a-row>
    <h3>บัญชีที่ลูกค้าลงทะเบียน</h3>
    <a-flex wrap="wrap">
      <a-col :span="24" :md="12">
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
      <a-col :span="24" :md="12">
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
</style>