<template>
    <div class="sidebar-info">
        <div class="sidebar-info-detail">
            <a-flex class="m-2">
                <a-col :span="6" class="center">
                    <a-image
                        :width="60"
                        :preview="false"
                        src="/img/icon/personal.webp"
                    />
                </a-col>
                <a-col :span="18">
                    <div class="username font-12">
                        ชื่อผู้ใช้งาน: {{member.memberDetail.bank_no}}
                    </div>
                    <div class="name">
                        ชื่อบัญชี: {{member.memberDetail.firstname}} {{member.memberDetail.lastname}} 
                    </div>
                    <div class="verify">
                        <a-flex class="verify-detail">
                            <a-cal :span="6" class="verify-icon">
                            <check-circle-outlined />
                            </a-cal>
                            <a-cal :span="7" class="font-12">
                                ยืนยันบัญชีเเล้ว
                            </a-cal>
                        </a-flex>
                    </div>
                </a-col>
            </a-flex>
            <hr/>
            <div class="sidebar-info-amount">
                <div class="">
                    เครดิตเงินสด
                </div>
                <div class="amount">
                    {{member.memberDetail.balance.toFixed(2)}}
                </div>
            </div>
            <a-flex :justify="'center'" class="button-info-list">
                <NuxtLink to="/information/deposit" class="button-info-link">
                    <div class="button-info button-info-deposit">
                        <!-- <BankOutlined /> -->
                         <a-flex :justify="'center'" :align="'center'">
                            <a-image
                                :width="25"
                                :preview="false"
                                src="/img/icon/deposit.webp"
                            />
                            <span>
                                ฝากเงิน
                            </span>
                         </a-flex>
                    </div>
                </NuxtLink>
                <NuxtLink to="/information/withdraw" class="button-info-link">
                    <div class="button-info button-info-withdrow">
                        <!-- <AuditOutlined /> -->
                         <a-flex :justify="'center'" :align="'center'">
                            <a-image
                                :width="25"
                                :preview="false"
                                src="/img/icon/withdraw.webp"
                            />
                            <span>
                                ถอนเงิน
                            </span>
                         </a-flex>
                    </div>
                </NuxtLink>
            </a-flex>
        </div>
        <div class="sidebar-info-detail mt-2">
            <a-flex v-for="item in menuList">
                <a :href="`https://line.me/R/ti/p/${member.settingDefault.websiteLine}?oat_content=url`" target="_blank" v-if="item.show == 1 && item.name == 'ติดต่อเรา'" class="sidebar-menu-list-link">
                    <a-flex class="sidebar-menu-list-detail" :align="'center'" >
                        <a-col :span="4" class="sidebar-menu-list-icon">
                            <component :is="item.icon" />
                        </a-col>
                        <a-col :span="20">
                            {{item.name}}
                        </a-col>
                    </a-flex>
                </a>
                <NuxtLink :to="item.path" v-if="item.show == 1 && item.name == 'เเนะนำเพื่อน' && !member.memberDetail.is_agent" class="sidebar-menu-list-link">
                    <a-flex class="sidebar-menu-list-detail" :align="'center'" >
                        <a-col :span="4" class="sidebar-menu-list-icon">
                            <component :is="item.icon" />
                        </a-col>
                        <a-col :span="20">
                            {{item.name}}
                        </a-col>
                    </a-flex>
                </NuxtLink>
                <a :href="`/alliance/dashboard?ref=${member.memberDetail.key_ref}&token=${getToken()}&status=alliance`" 
                    v-if="item.show == 1 && item.name == 'เเนะนำเพื่อน' && member.memberDetail.is_agent" 
                    target="_blank" 
                    class="sidebar-menu-list-link">
                    <a-flex class="sidebar-menu-list-detail" :align="'center'">
                        <a-col :span="4" class="sidebar-menu-list-icon">
                            <component :is="item.icon" />
                        </a-col>
                        <a-col :span="20">
                            พันธมิตร
                        </a-col>
                    </a-flex>
                </a>
                <NuxtLink :to="item.path" v-if="item.show == 1 && item.name != 'ติดต่อเรา'  && item.name != 'เเนะนำเพื่อน'" class="sidebar-menu-list-link">
                    <a-flex class="sidebar-menu-list-detail" :align="'center'" >
                        <a-col :span="4" class="sidebar-menu-list-icon">
                            <component :is="item.icon" />
                        </a-col>
                        <a-col :span="20">
                            {{item.name}}
                        </a-col>
                    </a-flex>
                </NuxtLink>
                <div  v-if="item.show == 3" class="sidebar-menu-list-link" @click="handleNotifyClick">
                    <a-flex class="sidebar-menu-list-detail" :align="'center'" >
                        <a-col :span="4" class="sidebar-menu-list-icon">
                            <component :is="item.icon" />
                        </a-col>
                        <a-col :span="20">
                            {{item.name}}
                        </a-col>
                    </a-flex>
                </div>
            </a-flex>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { menuList } from '~/data/data';
import { memberStore } from '~/store/index';
import { getToken } from '~/auth/authToken'

const member = memberStore();
const config = useRuntimeConfig()

const handleNotifyClick = () => {
    member.setMemberNotify(true);
};

</script>
<style scoped>
.sidebar-info-detail{
    background-color: rgba(0, 0, 0, 0.739);
    border-radius: 10px;
    padding: 1rem;
    color: whitesmoke;
    margin: 5px;
}
.sidebar-info-detai-contailner{
    margin: 0 auto;
}
.amount{
    color: whitesmoke;
    font-size: 16px;
}
.button-info{
    border-radius: 10px;
    padding: 1rem 1.5rem;
    margin: 0 1rem;
    cursor: pointer;
}
.button-info-deposit{
    background: #FF9100FF;
    color: whitesmoke;
    border: 1px solid #FF9100FF;
}
.sidebar-info-amount{
    padding: 1rem 0;
    color: rgb(83, 83, 83);
}
.button-info-withdrow{
    border: 1px solid whitesmoke;
    color: whitesmoke;
}
.name{
    color: #FF9100FF;
    margin: 2px 0 ;
}
.sidebar-menu-list-link{
    width: 100%;
    color: whitesmoke;
}
.button-info-link{
    width: auto;
}
.mt-2{
    margin-top: 1rem;
}
</style>