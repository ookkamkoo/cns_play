<template>
    <a-flex :justify="'space-between'" :align="'center'" class="header-detail">
        <div class="logo">
            <MenuOutlined class="header-menu-list" v-if="!screens.lg" @click="props.showDrawer"/>
            <NuxtLink to="/" exact class="link-sidebar">
                <a-image
                :width="120"
                :preview="false"
                src="https://image.1million.social/image/imageList/1707495347305.png"
            />
            </NuxtLink>
        </div>
        <a-space v-if="member.login">
            <a-button type="primary" shape="round" ghost :size="buttonSize" class="login" @click="props.showModalLogin">
                ลงชื่อเข้าใช้
            </a-button>
            <a-button type="primary" shape="round" :size="buttonSize" class="register" @click="props.showModalRegister">
                สมัครใช้งาน
            </a-button>
        </a-space>
        <a-space v-else>
                <a-space class="desktop-header-view" v-if="screens.lg">
                    <div class="header-detail">
                        <div class="header-detail">
                            <div class="header-detail-name">
                                <span class="header-detail-icon mx-1"><UserOutlined />  </span>
                                <span class="topBar-username"> {{member.memberDetail.username}} </span>
                            </div>
                        </div>
                    </div>
                    <div class="header-detail mobile-header-detail">
                        <div class="header-detail">
                            <div class="header-detail-name">
                                <span class="header-detail-icon mx-1"><WalletOutlined />  </span>
                                <span class="text-white"> <span class="textCreditMainBalance"> {{member.memberDetail.balance.toFixed(2)}}</span></span>
                                <span class="refresh-amount">
                                    <SyncOutlined :spin="refreshAmount"/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-line"></div>
                        <NuxtLink to="/information/withdraw" exact class="link-sidebar">
                            <div class="withdraw">
                                ถอนเงิน
                            </div>
                        </NuxtLink>
                    <div class="vertical-line"></div>
                    <NuxtLink to="/information/deposit" exact class="link-sidebar">
                        <a-button type="primary" shape="round" :size="'large'" class="register">
                            ฝากเงิน
                        </a-button>
                    </NuxtLink>
                    <a-button type="primary" shape="round" ghost :size="'large'" class="logut" @click="LogoutSystem">
                        ออกจากระบบ
                    </a-button>
                </a-space>
                <div class="mobile-header-view" v-if="!screens.lg">
                    <a-flex :justify="'space-between'" :align="'center'">
                        <div class="header-detail mx-1">
                            <div class="header-detail-list" :class="{'font-12':!screens.md}">
                                <!-- <div class="header-detail-name">
                                    <span class="header-detail-icon"><UserOutlined />  </span>
                                    <span class="topBar-username"> 0652837588 </span>
                                </div> -->
                                <div class="mobile-header-detail-name header-detail-name-border">
                                    <span class="text-white "> <span class="textCreditMainBalance"> 0.00</span></span>
                                    <span class="refresh-amount">
                                        <SyncOutlined :spin="refreshAmount"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="mobile-header-action mx-1">
                            <a-dropdown :placement="'bottom'">
                            <template #overlay>
                                <a-menu @click="handleMenuClick">
                                    <NuxtLink to="/information/deposit" exact class="link-sidebar">
                                        <a-menu-item key="1">
                                            ฝากเงิน
                                        </a-menu-item>
                                    </NuxtLink>
                                    <NuxtLink to="/information/withdraw" exact class="link-sidebar">
                                        <a-menu-item key="2">
                                            ถอนเงิน
                                        </a-menu-item>
                                    </NuxtLink>
                                </a-menu>
                            </template>
                            <a-button class="register">
                                <PlusOutlined />
                            </a-button>
                            </a-dropdown>
                        </div>
                    </a-flex>
                </div>
        </a-space>
    </a-flex>
</template>
<script lang="ts" setup>
    import { Grid } from 'ant-design-vue';
    import { getToken,logout } from '~/auth/authToken';
    import type { MenuProps } from 'ant-design-vue';
    import { memberStore } from '~/store/index';
    type SizeType = 'small' | 'middle' | 'large';
    
    const buttonSize = ref<SizeType>('large');
    const member = memberStore();
    // console.log(member.memberDetail.username);
    const checkScreenSize = () => {
      buttonSize.value = window.innerWidth >= 768 ? 'large' : 'middle';
    };
    
    // const headerLogin = ref(true)
    // const router = useRouter();

    const refreshAmount = ref(false);
    const useBreakpoint = Grid.useBreakpoint;
    const screens = useBreakpoint();

    const handleMenuClick: MenuProps['onClick'] = e => {
        console.log('click', e);
    };

    onMounted(() => {
      window.addEventListener('resize', checkScreenSize);
      checkScreenSize(); // Initial check
    });

    onUnmounted(() => {
      window.removeEventListener('resize', checkScreenSize);
    });

    // const loginShow = () =>{
    //     const token = getToken();
    //     if(token != null){
    //         headerLogin.value = false
    //     }else{
    //         headerLogin.value = true
    //     }
    // }
    
    const props = defineProps<{
        showDrawer:Function,
        showModalLogin:Function,
        showModalRegister:Function,
    }>();

    const LogoutSystem = () => {
        logout();
    }


</script>
<style >
    .menu{
        display: inline-block;
    }
    .login{
        display: inline-block;
        text-transform: uppercase;
        color: #FF9100FF !important;
        background: transparent;
        border: 2px solid #FF9100FF !important;
    }
    .logut{
        display: inline-block;
        text-transform: uppercase;
        color: whitesmoke !important;
        background: transparent;
        border: 2px solid whitesmoke !important;
    }
    .register{
        display: inline-block;
        text-transform: uppercase;
        color: white;
        background: #FF9100FF;
        border: 2px solid #FF9100FF;
    }
    .topBar-container-top, .topBar-container-bottom {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-end;
    color: #959595;
    }
    .header-detail{
        color: whitesmoke;
        font-size: 17px;
    }
    .username{
        color: #959595;
    }
    .header-detail-icon{
        font-size: 19px;
        color: #FF9100FF;
    }
    .vertical-line {
        width: 0;
        height: 20px;
        border-right: 1px solid #404040;
        margin-left: 5px;
        margin-right: 5px;
    }
    .withdraw{
        color: #9cb0d1;
    }
    .refresh-amount{
        color: whitesmoke;
        font-size: 17px;
        font-weight: 800;
        margin-left: 10px;
        cursor: pointer;
    }
    .mobile-header-view .header-detail-name{
        line-height: 40px !important;
    }
    .select-type-header{
        border-radius: 50% !important;
        width: 40px !important;
    }
    .mobile-header-action{
        line-height: 40px !important;
    }
    .mobile-header-detail-name{
        line-height: 30px !important;
    }
    .header-menu-list{
        color: whitesmoke;
        font-size: 20px;
        font-weight: bold;
    }
    .header-detail-name-border{
        border: 1px solid rgba(245, 245, 245, 0.398);
        padding: 0 12px;
        border-radius: 10px;
        
    }
    .header-detail{
        height: 100%;
    }
    .small-header{
        padding: 0 10px !important;
    }
</style>