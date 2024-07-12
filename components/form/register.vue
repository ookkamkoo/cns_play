<template>
    <div class="center">
      <h2>สมัครสมาชิก</h2>
    </div>
    <a-tabs v-model:activeKey="activeKey" @change="handleChange" class="register-form">
        <a-tab-pane key="1">
            <template #tab>
                <span>
                    เบอร์โทรศัพท์
                </span>
            </template>
            <a-row>
                <a-form
                    :model="formState"
                    name="horizontal_login"
                    layout="inline"
                    autocomplete="off"
                    class="form-for-regist"
                >
                    <a-col :span="24" :md="24">
                    <label for="เบอร์โทรศัพท์">เบอร์โทรศัพท์</label>
                    <a-form-item name="username" :rules="[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' }]">
                        <a-input v-model:value="formState.username" placeholder="09xxxxxxxx" size="large" :maxlength="10"/>
                    </a-form-item>
                    </a-col>
                </a-form>
            </a-row>
            <a-col :span="24" class="action-form">
                <a-flex justify="center">
                    <a-button type="primary" shape="round" size="large" class="mx-1 login" :disabled="activeKey == '1'">
                        ก่อนหน้า
                    </a-button>
                    <a-button type="primary" shape="round" size="large" class="mx-1 register" @click="next('2')">
                        ถัดไป
                    </a-button>
                </a-flex>
            </a-col>
        </a-tab-pane>
        <a-tab-pane key="2">
        <template #tab>
            <span>
                ธนาคาร
            </span>
        </template>
        <a-row class="my-1">
            <a-form
                :model="formState"
                name="horizontal_login"
                layout="inline"
                autocomplete="off"
                class="form-for-regist"
            >
                <a-col class="my-1" :span="24">
                <label><b>ธนาคาร</b></label>
                <a-select ref="selectBank" v-model:value="formState.bankId" style="width: 100%" size="large">
                    <template v-for="option in optionsBank" :key="option.name">
                    <a-select-option :value="option.id" v-if="option.show">
                        <template #default>
                        <a-image :src="option.image" :alt="option.name" width="20px" height="20px" />
                        {{ option.name }}
                        </template>
                    </a-select-option>
                    </template>
                </a-select>
                </a-col>
                <a-col :span="24" class="my-1">
                <label for="เลขบัญชี">เลขบัญชี</label>
                <a-form-item name="book_bank" :rules="[{ required: true, message: 'กรุณากรอกเลขบัญชี' }]"  class="register-input-0">
                    <a-input v-model:value="formState.book_bank" placeholder="กรอกเลขบัญชี" size="large" :maxlength="15"/>
                </a-form-item>
                </a-col>
                <a-col class="my-1" :span="24">
                <label><b>ทรูวอเล็ต (ถ้ามี)</b></label>
                <a-select ref="selectTrue" v-model:value="formState.bankTrueId" style="width: 100%" size="large">
                    <template v-for="option in optionsBank" :key="option.name">
                    <a-select-option :value="option.id" v-if="!option.show">
                        <template #default>
                        <a-image :src="option.image" :alt="option.name" width="20px" height="20px"/>
                        {{ option.name }}
                        </template>
                    </a-select-option>
                    </template>
                </a-select>
                </a-col>
                <a-col :span="24" class="my-1">
                    <label for="เลขบัญชีทรูวอเล็ต">เลขบัญชีทรูวอเล็ต (ถ้ามี)</label>
                    <a-form-item name="book_true_no" :rules="[{ required: true, message: 'กรุณากรอกเลขบัญชีทรูวอเล็ต' }]" class="register-input-0">
                        <a-input v-model:value="formState.book_true_no" placeholder="กรอกเลขบัญชีทรูวอเล็ต" size="large" :maxlength="15"/>
                    </a-form-item>
                </a-col>
                <a-flex v-if="getName" :justify="'space-between'" class="getname">
                    <a-col :span="12" class="my-1">
                        <label for="ชื่อบัญชีธนาคาร">ชื่อบัญชีธนาคาร</label>
                        <a-form-item name="name" :rules="[{ required: true, message: 'กรุณากรอกชื่อบัญชีธนาคาร' }]" class="register-input">
                            <a-input v-model:value="formState.name" placeholder="กรุณากรอกชื่อบัญชีธนาคาร" size="large" :maxlength="15" :readonly="getNameSuccess" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" class="my-1">
                        <label for="นามสกุลบัญชีธนาคาร">นามสกุลบัญชีธนาคาร</label>
                        <a-form-item name="lastname" :rules="[{ required: true, message: 'นามสกุลบัญชีธนาคาร' }]" class="register-input">
                            <a-input v-model:value="formState.lastname" placeholder="นามสกุลบัญชีธนาคาร" size="large" :maxlength="15" :readonly="getNameSuccess"/>
                        </a-form-item>
                    </a-col>
                </a-flex>
            </a-form>
        </a-row>
        <a-col :span="24" class="my-1">
            <a-flex justify="center">
                <a-button type="primary" shape="round" size="large" class="mx-1 login" @click="prev('1')">
                    ก่อนหน้า
                </a-button>
                <a-button type="primary" shape="round" size="large" class="mx-1 register" @click="next('3')">
                    ถัดไป
                </a-button>
            </a-flex>
        </a-col>
        </a-tab-pane>
        <a-tab-pane key="3">
            <template #tab>
                <span>
                    รหัสผ่าน
                </span>
            </template>
            <a-row>
                <a-form
                    :model="formState"
                    name="horizontal_login"
                    layout="inline"
                    autocomplete="off"
                    class="form-for-regist"
                >
                    <a-col class="p-1" :span="12" :md="12">
                    <label><b>ช่องทางเข้าการถึง</b></label>
                    <a-select ref="selectMarketing" v-model:value="formState.marketingId" style="width: 100%" size="large">
                        <a-select-option value="">ช่องทางเข้าการถึง</a-select-option>
                        <template v-for="option in optionsMarketing" :key="option.name">
                        <a-select-option :value="option.id">{{ option.name }}</a-select-option>
                        </template>
                    </a-select>
                    </a-col>
                    <a-col :span="12" :md="12" class="my-1">
                    <label for="ไอดีไลน์">ไอดีไลน์ (ถ้ามี)</label>
                    <a-form-item name="line_id" :rules="[{ required: true, message: 'กรุณากรอกไอดีไลน์' }]" class="register-input">
                        <a-input v-model:value="formState.line_id" placeholder="กรอกไอดีไลน์ (ถ้ามี)" size="large" :maxlength="15"/>
                    </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="my-1">
                    <label for="รหัสผ่าน" class="mx-1">รหัสผ่าน</label>
                    <a-form-item name="password" :rules="[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]" class="register-input">
                        <a-input v-model:value="formState.password" placeholder="กรอกรหัสผ่าน 4-15 ตัว" size="large" :maxlength="15"/>
                    </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="my-1">
                    <label for="ยืนยันรหัสผ่าน" class="mx-1">ยืนยันรหัสผ่าน</label>
                    <a-form-item name="re_password" :rules="[{ required: true, message: 'กรุณายืนยันรหัสผ่าน' }]" class="register-input">
                        <a-input v-model:value="formState.re_password" placeholder="กรอกรหัสผ่าน 4-15 ตัว" size="large" :maxlength="15"/>
                    </a-form-item>
                    </a-col>
                </a-form>
            </a-row>
            <a-col :span="24" class="my-1">
                <a-flex justify="center">
                    <a-button type="primary" shape="round" size="large" class="mx-1 login" @click="prev('2')">
                        ก่อนหน้า
                    </a-button>
                    <a-button type="primary" shape="round" size="large" class="mx-1 register" @click="next('3')">
                        สมัครสมาชิก
                    </a-button>
                </a-flex>
            </a-col>
        </a-tab-pane>
  </a-tabs>
</template>
  
  <script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { getDetailconfigMember,getNameServices } from '~/services/memberServices';
  import { Alert } from '../alert/alertComponent';
  
  const optionsBank = ref<any[]>([]);
  const optionsMarketing = ref<any[]>([]);
  const memberSetting = ref<any>();
  const activeKey = ref('1');
  const getName = ref(false);
  const getNameSuccess = ref(false);
  
  const formState = reactive<any>({
    username: '',
    password: '',
    name: '',
    lastname: '',
    remember: true,
    bankId: 1,
    book_bank:'',
    bankTrueId: 16,
    book_true_no:'',
    marketingId: 1,
    line_id:'',
    re_password:'',
  });
  
  const prev = (data :string) => {
        activeKey.value =  data;
  };
  const next = async(data :string) => {
    if(activeKey.value == '1'){
        if (formState.username == ''){
            Alert('error','กรุณากรอกเบอร์โทรศัพท์')
        }else{
            if(phoneNumberPattern()){
                activeKey.value =  data;
            }else{
                Alert('error','กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
            }
        }
    }else if(activeKey.value == '2'){
        if (formState.book_bank == ''){
            Alert('error','กรุณากรอกเลขบัญชีธนาคาร')
        }else{
            if(getName.value){
                if(formState.name == '' || formState.lastname == ''){
                    Alert('error','กรุณากรอก ชื่อ - นามสกุลให้ถูกต้อง')
                }else{
                    activeKey.value =  data;
                }
            }
            // ดึงชื่อ
            if(await getNames()){
                getName.value = true
            }else{
                getName.value = true
            }
        }
    }else if(activeKey.value == '3'){
        if (formState.password == '' || formState.re_password == ''){
            Alert('error','กรุณากรอกรหัสผ่าน')
        }else{
            activeKey.value =  data;
        }
    }
  };

  const handleChange = () => {
    if(formState.username == ''){
        activeKey.value = '1';
    }else if(formState.book_bank == '' ){
        activeKey.value = '2';
    }else if(formState.line_id == '' || formState.password == '' || formState.re_password == ''){
        activeKey.value = '3';
    }
  };

  const phoneNumberPattern = () => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(formState.username);
  }
  
  onMounted(async () => {
    try {
      const data = await getDetailconfigMember();
      if (data.status === 'success') {
        optionsBank.value = data.data.Bank;
        optionsMarketing.value = data.data.Marketing;
        memberSetting.value = data.data.MemberSetting;
        getNameSuccess.value = true
        if(memberSetting.value.config_value == "true"){
            getName.value = false
        }else{
            getName.value = true
        }
      }
    } catch (error) {
      console.error('Error fetching user roles:', error);
    }
  });

  const getNames = async () =>{
    try {
      const data = await getNameServices(formState.bankId,formState.book_bank);
      if (data.status === 'success') {
        formState.name = data.data.name
        formState.lastname = data.data.lastname
        return true
      }else{
        return false
      }
    } catch (error) {
        console.error('Error fetching user roles:', error);
        return false
    }
}
  
  </script>
  
  <style>
  .login:hover {
    background-color: transparent !important;
    opacity: 0.8;
  }
  .register:hover {
    background-color: #ff9100ff !important;
    opacity: 0.8;
  }
  label {
    color: whitesmoke;
  }
  
  .register-input {
    margin: 0 5px !important;
  }
  .register-input-0 {
    margin: 0 0px !important;
  }
  .name {
    width: 100%;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  .action-form{
    margin: 1rem 0.5rem 0 0 ;
  }
  .form-for-regist{
    width: 100% !important;
  }
  .register-form .ant-tabs-tab {
    color: whitesmoke;
  }
  :where(.css-dev-only-do-not-override-19iuou).ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
    color: #ff9100ff;
  }
  :where(.css-dev-only-do-not-override-19iuou).ant-tabs .ant-tabs-ink-bar{
    background: #ff9100ff;
  }
  :where(.css-dev-only-do-not-override-19iuou).ant-tabs .ant-tabs-tab-btn:focus:not(:focus-visible), :where(.css-dev-only-do-not-override-19iuou).ant-tabs .ant-tabs-tab-remove:focus:not(:focus-visible), :where(.css-dev-only-do-not-override-19iuou).ant-tabs .ant-tabs-tab-btn:active, :where(.css-dev-only-do-not-override-19iuou).ant-tabs .ant-tabs-tab-remove:active{
    color: #ff9100ff;
  }
  .getname{
    width: 100%;
  }
  </style>
  