<template>
    <a-modal v-model:open="open" :footer="null">
      <FormAddTruewallet :closeModal="closeModal"/>
    </a-modal>
    <h3>ข้อมูลส่วนตัว</h3>
    <a-flex class="profile" wrap="wrap">
        <a-col :span="24" :md="12" class="my-1">
            ข้อมูลผู้ใช้
            <a-flex class="mx-2 my-1" :align="'center'" wrap="wrap">
                <a-col class="label-title">
                    <label for="username">ชื่อผู้ใช้งาน</label>
                </a-col>
                <a-col class="input-value">
                    <a-input v-model:value="member.memberDetail.username" class="read-only" readonly/>
                </a-col>
            </a-flex>
            <a-flex class="mx-2 my-1" :align="'center'" wrap="wrap">
                <a-col class="label-title">
                    <label for="username">ชื่อบัญชีผู้ใช้งาน</label>
                </a-col>
                <a-col class="input-value">
                    <a-input v-model:value="fullName" class="read-only" readonly/>
                </a-col>
            </a-flex>
            <a-flex class="mx-2 my-1" :align="'center'" wrap="wrap">
                <a-col class="label-title">
                    <label for="username">วันที่สมัคร</label>
                </a-col>
                <a-col class="input-value">
                    <a-input v-model:value="formattedCreatedAt" class="read-only" readonly/>
                </a-col>
            </a-flex>
            <a-flex class="mx-2 my-1" :align="'center'" wrap="wrap">
                <a-col class="label-title">
                    <label for="username">IP </label>
                </a-col>
                <a-col class="input-value">
                    <a-input v-model:value="member.memberDetail.last_ip_login" class="read-only" readonly/>
                </a-col>
            </a-flex>
            บัญชีธนาคาร
            <a-flex class="info-bank m-1" :align="'center'" :justify="'center'" wrap="wrap">
              <a-col :span="8" :md="12" :lg="8"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  :src="member.memberDetail.bank.image"
                />
              </a-col>
              <a-col :span="16" :md="12" :lg="16">
                <div class="bank">
                  <span class="bank-title">ธนาคาร : </span> {{member.memberDetail.bank.name}}
                </div>
                <div class="name">
                  <span class="name-title">ชื่อบัญชี : </span> {{member.memberDetail.firstname}} {{member.memberDetail.lastname}}
                </div>
                <div class="bank-number">
                  <span class="bank-number-title">เลขบัญชี : </span>{{member.memberDetail.bank_no}} 
                </div>
              </a-col>
          </a-flex>
          <a-flex class="info-bank m-1" :align="'center'" :justify="'center'" wrap="wrap" v-if="member.memberDetail.bank_true_no != ''">
              <a-col :span="8" :md="12" :lg="8"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  :src="member.memberDetail.bank_true.image"
                />
              </a-col>
              <a-col :span="16" :md="12" :lg="16" >
                <div class="bank">
                  <span class="bank-title">ธนาคาร : </span> {{member.memberDetail.bank_true.name}}
                </div>
                <div class="name">
                  <span class="name-title">ชื่อบัญชี : </span> {{member.memberDetail.firstname}} {{member.memberDetail.lastname}}
                </div>
                <div class="bank-number">
                  <span class="bank-number-title">เลขบัญชี : </span>{{member.memberDetail.bank_true_no}} 
                </div>
              </a-col>
          </a-flex>
          <a-flex class="info-bank m-1" :align="'center'" :justify="'center'" wrap="wrap" v-else>
              <a-col :span="8" :md="12" :lg="8"  class="center info-image">
                <a-image
                  :width="60"
                  :preview="false"
                  src="https://cdn-fastplay.sgp1.cdn.digitaloceanspaces.com/banks/TRUEMONEY.png"
                />
              </a-col>
              <a-col :span="16" :md="12" :lg="16">
                <div class="bank">
                  <span class="bank-title">ธนาคาร : ทรูมันนี่วอลเล็ท</span>
                </div>
                <div class="my-1">
                    <a-button ghost @click="showModal()">เพิ่มบัญชี</a-button>
                </div>
              </a-col>
          </a-flex>
        </a-col>
        <a-col :span="24" :md="12" class="my-1">
            เปลี่ยนรหัสผ่าน
            <a-flex class="mx-2 my-1" :align="'center'" wrap="wrap">
                <a-col class="label-title">
                    <label for="password">รหัสผ่านปัจจุบัน</label>
                </a-col>
                <a-col class="input-value">
                    <a-input v-model:value="formState.password" />
                </a-col>
            </a-flex>
            <a-flex class="mx-2 my-1" :align="'center'" wrap="wrap">
                <a-col class="label-title">
                    <label for="newPassword">รหัสผ่านใหม่</label>
                </a-col>
                <a-col class="input-value">
                    <a-input v-model:value="formState.newPassword" />
                </a-col>
            </a-flex>
            <a-flex class="mx-2 my-1" :align="'center'" wrap="wrap">
                <a-col class="label-title">
                    <label for="reNewPassword">ยืนยันรหัสผ่าน</label>
                </a-col>
                <a-col class="input-value">
                    <a-input v-model:value="formState.reNewPassword" />
                </a-col>
            </a-flex>
            <a-col :span="24" class="center my-2">
                <a-button type="primary" class="addProfile" @click="setPasswordNewCheck()">บันทึกข้อมูล</a-button>
            </a-col>
        </a-col>
    </a-flex>
</template>
<script setup lang="ts">
    import { memberStore } from '~/store/index';
    import { changePasswordMember } from '~/services/memberServices';
    import dayjs from 'dayjs';
    import { Alert } from '~/components/alert/alertComponent';
    const open = ref<boolean>(false);
    const route = useRoute()
    const action = route.query.action

    const member = memberStore();

    const formState = reactive<any>({
        password: '',
        newPassword: '',
        reNewPassword: '',
    });

    const fullName = computed(() => {
        const { firstname, lastname } = member.memberDetail;
        return `${firstname} ${lastname}`;
    });

    const formattedCreatedAt = computed(() => {
        const createdAt = member.memberDetail.created_at;
        return dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss');
    });

    const showModal = () => {
        open.value = true;
    };

    const closeModal = () => {
        open.value = false;
    };
    const setPasswordNewCheck = () =>{
        if(formState.password != '' && formState.newPassword != '' && formState.reNewPassword != ''){
            if(formState.newPassword == formState.reNewPassword ){
                setPasswordNew();
            }else{
                Alert("error","กรุณากรอกรหัสผ่านให้ตรงกัน.")
            }
        }else{
            Alert("error","กรุณากรอกข้อมูลให้ครบ.")
        }
    }
    const setPasswordNew = async() =>{
        var data = await changePasswordMember(formState);
        if(data.status == 'success'){
            Alert("success","เปลี่ยนรหัสผ่านเรียบร้อยเเล้ว.")
        }else{
            Alert("error",data.error)
        }
    }
    onMounted(() => {
        if(action == 'addTrue'){
            open.value = true
        }
    });

    definePageMeta({
        layout: 'information'
    })
</script>
<style scoped>
.profile label{
    color: whitesmoke !important;
}
.label-title{
    width: 20%;
    min-width: 100px;
    max-width: 100px;
}
.input-value{
    width: 100%;
}
.read-only{
    cursor: not-allowed;
    background-color: rgb(199, 199, 199);
}
.addProfile{
    background-color: #FF9100FF;
}
</style>