<template>
    <a-flex :justify="'space-between'" :align="'center'" class="header-detail">
        <div class="logo">
            <!-- <MenuOutlined class="header-menu-list" v-if="!screens.lg && !member.login" @click="props.showDrawer"/> -->
            <div class="navbar-brand" v-if="!screens.lg && !member.login" @click="props.showDrawer">
                <span class="one"></span><span class="two"></span><span class="three"></span>
            </div>
            <NuxtLink to="/" exact class="link-sidebar img-branner" style="width: 120px;">
                <a-image
                :width="120"
                :preview="false"
                :src="config.public.apiServer + '/' + member.settingDefault.imageWebsite"
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
                <a-space class="desktop-header-view" v-if="screens.xl">
                    <ul class="headerContent">
                        <li class="item">
                            <NuxtLink to="/information/recommend" exact class="nav-link">
                                <div>
                                    <a-image
                                        :width="50"
                                        :preview="false"
                                        src="/img/เเนะนำเพื่อน.webp"
                                    />
                                </div>
                                <div class="text">แนะนำเพื่อน</div>
                            </NuxtLink>
                        </li>
                        <li class="item">
                            <NuxtLink to="/information/return-credit" exact class="nav-link">
                                <div>
                                    <a-image
                                        :width="50"
                                        :preview="false"
                                        src="/img/คืนยอดเสีย.webp"
                                    />
                                </div>
                                <div class="text">คืนยอดเสีย</div>
                            </NuxtLink>
                        </li>
                        <li class="item">
                            <NuxtLink to="/information/mini-game/listMiniGame" exact class="nav-link">
                                <div>
                                    <a-image
                                        :width="50"
                                        :preview="false"
                                        src="/img/กิจกรรม.webp"
                                    />
                                </div>
                                <div class="text">กิจกรรม</div>
                            </NuxtLink>
                        </li>
                        <li class="item">
                            <NuxtLink to="/information/promotion" exact class="nav-link">
                                <div>
                                    <a-image
                                        :width="50"
                                        :preview="false"
                                        src="/img/โปรโมชั่น.webp"
                                    />
                                </div>
                                <div class="text">โปรโมชั่น</div>
                            </NuxtLink>
                        </li>
                    </ul>
                </a-space>
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
                                <span class="refresh-amount" @click="refreshAmount()">
                                    <SyncOutlined :spin="refresh_amount"/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-line"></div>
                        <NuxtLink to="/information/withdraw" exact class="link-sidebar">
                            <!-- <div class="withdraw"> -->
                                ถอนเงิน
                            <!-- </div> -->
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
                                    <span class="text-white "> <span class="textCreditMainBalance"> {{member.memberDetail.balance.toFixed(2)}}</span></span>
                                    <span class="refresh-amount">
                                        <SyncOutlined :spin="refresh_amount"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="mobile-header-action mx-1">
                            <a-dropdown :placement="'bottom'" :trigger="['click']">
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
    import { logout } from '~/auth/authToken';
    import { refreshAmountServices } from '~/services/memberServices';
    import type { MenuProps } from 'ant-design-vue';
    import { memberStore } from '~/store/index';
    type SizeType = 'small' | 'middle' | 'large';
    
    const buttonSize = ref<SizeType>('large');
    const member = memberStore();
    const config = useRuntimeConfig()
    // console.log(member.memberDetail.username);
    const checkScreenSize = () => {
      buttonSize.value = window.innerWidth >= 768 ? 'large' : 'middle';
    };
    
    // const headerLogin = ref(true)
    // const router = useRouter();

    const refresh_amount = ref(false);
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
    const refreshAmount = async() => {
        refresh_amount.value = true
        try {
            const data = await refreshAmountServices();
            if (data.status === 'success') {
                member.memberDetail.balance = data.data
            }else{
                console.error('Error fetching user roles:');
            }
        } catch (error) {
            console.error('Error fetching user roles:', error);
        }
        refresh_amount.value = false
    }
    const props = defineProps<{
        showDrawer: () => void;
        showModalLogin: () => void;
        showModalRegister: () => void;
    }>();

    const LogoutSystem = () => {
        const router = useRouter();
        logout();
        router.push('/');
    }


</script>
<style scoped> 
    .headerContent {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin: 0;
        padding: 0;
    }
    .nav{
        display: flex;
    }
    .nav-link{
        text-align: center;
        height: 10px;
    }
    .nav-link img{
        margin: 0 auto;
    }
    .headerContent li{
        list-style-type: none;
        width: 85px;
        padding: 2px;
        margin: 0 4px;
        background-clip: content-box, border-box;
        background-image: linear-gradient(180deg, #3a3a3a, #101010), linear-gradient(180deg, #ffe068, #151515);
    }
    .headerContent li:hover{
        background: radial-gradient(100% 100% at 50% 0, #ff7373 0, #d61a28 44%, #7d0508 100%) !important;
    }
    .text{
        font-size: 12px;
        color: whitesmoke;
    }
    .nav-link div{
        line-height: 55px;
    }
</style>
<style >
    .menu{
        display: inline-block;
    }
    .menu_icon {
        margin: auto;
        z-index: 10;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        padding: 5px 0;
        top: -13px;
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
    .logo{
        display: flex;
        align-items: center;
    }
    .navbar-brand {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 20px;
        cursor: pointer;
        margin: 5px;
        position: fixed;
    }

    .navbar-brand span {
    display: block;
    height: 3px;
    background-color: #a5f3fc; /* สีเหมือนในรูป */
    border-radius: 3px;
    transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
    }

    .navbar-brand span:nth-child(1) {
        transform-origin: top left;
    }

    .navbar-brand span:nth-child(3) {
    transform-origin: bottom left;
    }

    /* Animation เมื่อ active */
    .navbar-brand.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
    }

    .navbar-brand.active span:nth-child(2) {
    opacity: 0; /* ซ่อน middle line */
    }

    .navbar-brand.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
    }

    .navbar-brand span {
        display: inline-block;
        height: 5px;
        background-color: #3498db;
        border-radius: 5px;
    }

    .navbar-brand .one {
        animation: pulseWidth 1s ease infinite;
    }

    .navbar-brand .two {
        animation: pulseWidth1 1s ease infinite;
    }

    .navbar-brand .three {
        animation: pulseWidth2 1s ease infinite;
    }

    span.one {
        top: 16px;
        width: 40px;
    }

    span.two {
        top: 26px;
        width: 30px;
    }

    span.three {
        top: 35px;
        width: 50px;
    }

    .img-branner{
        position: fixed;
    }
    .item{
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
    }

    @keyframes pulseWidth {
        0% {
            width: 25px;
        }
        25% {
            width: 15px;
        }
        50% {
            width: 20px;
        }
        75% {
            width: 25px;
        }
        100% {
            width: 30px;
        }
    }

    @keyframes pulseWidth1 {
        0% {
            width: 30px;
        }
        25% {
            width: 20px;
        }
        50% {
            width: 25px;
        }
        75% {
            width: 15px;
        }
        100% {
            width: 30px;
        }
    }

    @keyframes pulseWidth2 {
        0% {
            width: 25px;
        }
        25% {
            width: 10px;
        }
        50% {
            width: 20px;
        }
        75% {
            width: 15px;
        }
        100% {
            width: 20px;
        }
    }

    @media screen and (max-width: 992px) {
        .img-branner {
            left: 90px; /* กำหนดตำแหน่งซ้าย */
        }
    }

    @media screen and (max-width: 767px) {
        .img-branner {
            left: 60px; /* กำหนดตำแหน่งซ้าย */
        }
    }
</style>