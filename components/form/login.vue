<template>
    <div class="center">
        <h2>เข้าสู่ระบบ</h2>
    </div>
    <a-form
        :model="formState"
        name="horizontal_login"
        layout="inline"
        autocomplete="off"
        @submit="handleSubmit"
    >
        <a-row>
            <a-form
                :model="formState"
                name="horizontal_login"
                layout="inline"
                autocomplete="off"
                class="form-for-regist"
            >
                <a-col :span="24" class="my-2">
                    <a-form-item
                        name="username"
                        :rules="[{ required: true, message: 'Please input your username!' }]"
                        class="login-input"
                    >
                        <a-input v-model:value="formState.username" size="large" placeholder="เบอร์โทรศัพท์" :maxlength="10">
                            <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24" class="my-2">
                    <a-form-item
                        name="password"
                        :rules="[{ required: true, message: 'Please input your password!' }]"
                        class="login-input"
                    >
                        <a-input-password v-model:value="formState.password" size="large" placeholder="รหัสผ่าน" :maxlength="15">
                            <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                </a-col>
                <a-col :span="24" class="my-1" v-if="error != ''">
                    <a-alert :message="error" type="error" class="login-input" show-icon/>
                </a-col>
                <a-col :span="24" class="my-1">
                    <a-flex justify="center">
                        <a-button type="primary" shape="round" size="large" class="mx-1 login" @click="() => props.closeModal()">
                            ยกเลิก
                        </a-button>
                        <a-button type="primary" shape="round" size="large" class="mx-1 register" html-type="submit" @click="handleSubmit">
                            เข้าสู่ระบบ
                        </a-button>
                    </a-flex>
                </a-col>
                <a-col :span="24" class="my-1">
                    <div class="text-center my-1">
                        ภาษา
                    </div>
                    <a-flex :justify="'center'" :align="'space-evenly'">
                        <a-avatar
                        size="large"
                        class="languageToggle mx-1"
                        :class="{ active: activeAvatar === 1 }"
                        @click="setActive(1)"
                        >
                        <template #icon>
                            <a-image
                            :preview="false"
                            src="/img/language/Thai.webp"
                            />
                        </template>
                        </a-avatar>
                        <!-- <a-avatar
                        size="large"
                        class="languageToggle mx-1"
                        :class="{ active: activeAvatar === 2 }"
                        @click="setActive(2)"
                        >
                        <template #icon>
                            <a-image
                            :preview="false"
                            src="https://imagedelivery.net/g1yWpHq5ZqQxQIXvcCDaOA/08ef9747-bd58-4185-6331-7441b89cf000/public"
                            />
                        </template>
                        </a-avatar>
                        <a-avatar
                        size="large"
                        class="languageToggle mx-1"
                        :class="{ active: activeAvatar === 3 }"
                        @click="setActive(3)"
                        >
                        <template #icon>
                            <a-image
                            :preview="false"
                            src="https://imagedelivery.net/g1yWpHq5ZqQxQIXvcCDaOA/a50a5057-212d-4e4d-f94b-8d1f02173600/public"
                            />
                        </template>
                        </a-avatar> -->
                    </a-flex>
                </a-col>
            </a-form>
        </a-row>
    </a-form>
</template>
<script lang="ts" setup>
    import { login } from '~/services/authService';
    import { setToken,setUsername,setID } from '~/auth/authToken';
    import { memberStore } from '~/store/index';

    const member = memberStore();

    const error = ref('')
    const formState = reactive<any>({
        username: '0623373061',
        password: 'asdf123456',
    });
    const activeAvatar = ref(1);
    

    const props = defineProps<{
        closeModal:Function
    }>();

    const setActive = (id:number) => {
        activeAvatar.value = id;
    };

    const handleSubmit = async () => {
        try {
            const data = await login(formState.username,formState.password);
            console.log(data);
            if (data.status === 'success') {
                setToken(data.data.token);
                setUsername(data.data.username);
                setID(data.data.id);
                member.setMemberLogin(false);
                member.setMemberNotify(true);
                props.closeModal();
            }else{
                member.setMemberLogin(true);
                error.value = data.message +' '+ data.error
            }
        } catch (error) {
            console.error('Error fetching user roles:', error);
        }
    };

</script>
<style>
.login:hover{
    background-color: transparent !important;
    opacity: 0.8;
}
.register:hover{
    background-color: #FF9100FF !important;
    opacity: 0.8;
}
.login-input {
    margin: 0 5px !important;
  }

.ant-modal-content{
    width: 100% !important; 
    margin: 0 auto !important;
}
.text-center{
    text-align: center;
    color: whitesmoke;
}

.languageToggle {
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.languageToggle:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 255, 0.4);
}

.languageToggle.active {
  box-shadow: 0 2px 15px rgba(0, 0, 255, 0.8); /* เงาเข้ม */
  transform: scale(1.1); /* ขยายขนาดเล็กน้อยเมื่อ active */
  border: 2px solid rgba(0, 0, 255, 0.8); /* เส้นขอบ */
  border-radius: 50%; /* ให้เป็นวงกลม */
}
</style>