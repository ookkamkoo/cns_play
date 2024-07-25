<template>
    <h3>เพิ่มบัญชีทรูวอเล็ต</h3>
    <a-col span="24">
        <label for="">กรอกเบอร์ทรวอเล็ต</label>
        <a-input v-model:value="formState.Truewallet" size="large" placeholder="092xxxxxxx" :maxlength="10"/>
    </a-col>
    <a-col :span="24" class="my-2 center">
        <a-button size="large" type="primary" class="mx-1 addTrue" danger @click="checkSubmit">เพิ่มบัญชีทรูวอเล็ต</a-button>
    </a-col>
</template>
<script lang="ts" setup>
    import { addTruewalletService } from "~/services/bankService";
    import { Alert } from '~/components/alert/alertComponent';
    import { getToken } from '~/auth/authToken'
    import { checkToken } from '~/services/authService';
    const formState = reactive<any>({
        Truewallet:'',
    });

    const props = defineProps<{
        closeModal: () => void
    }>();

    const checkSubmit = async() =>{
        if(formState.Truewallet != ''){
            addTrueWallet();
            const token = getToken();
            if (token) {
                await checkToken(token);
            }
        }else{
            Alert("error","กรุณกรอกข้อมูลให้ครบ!")
        }
    }

    const addTrueWallet = async() => {
        var data = await addTruewalletService(formState.Truewallet);
        if(data.status == 'success'){
            Alert("success","Update truewallet success.")
            props.closeModal()
        }else{
            Alert("error",data.message)
        }
    }
</script>
<style scoped>
.addTrue{
    background-color: #FF9100FF;
}
</style>