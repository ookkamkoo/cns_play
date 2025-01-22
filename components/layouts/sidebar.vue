<template>
    <div class="menu" :class="{'small-memu':!screens.md}">
        <div class="menu-bg" :class="{'small-memu-bg':!screens.md}">
            <ul class="menu-list">
                <li
                        class="menu-list-item"
                        key="/"
                        :class="{ 'menu-list-item-active':   $route.path === '/'}"
                    >
                    <NuxtLink to="/" exact class="link-sidebar">
                        <div class="menu-list-item-detail">
                        <a-flex :align="'center'" :vertical="!screens.md">
                            <a-col class="logo-menu-sidebar" :class="{'small-logo-menu-sidebar-img':!screens.md}">
                                <a-image :width="60" :preview="false" src="/img/home.webp" :class="{'logo-menu-sidebar-img':!screens.md}"/>
                            </a-col>
                            <div class="detail-menu-sidebar">
                                <span>หน้าเเรก</span>
                            </div>
                        </a-flex>
                        </div>
                    </NuxtLink>
                </li>
                <li
                        class="menu-list-item"
                        v-for="item in member.menuBar"
                        :key="item.name"
                        :class="{ 'menu-list-item-active': '/lobby/'+item.name === $route.path }"
                    >
                    <NuxtLink :to="'/lobby/'+item.name" exact class="link-sidebar">
                        <div class="menu-list-item-detail">
                        <a-flex :align="'center'" :vertical="!screens.md">
                            <a-col class="logo-menu-sidebar" :class="{'small-logo-menu-sidebar-img':!screens.md}">
                                <a-image :width="60" :preview="false" :src="item.icon" :class="{'logo-menu-sidebar-img':!screens.md}"/>
                            </a-col>
                            <div class="detail-menu-sidebar">
                                <span>{{ item.name_th }}</span>
                            </div>
                        </a-flex>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { sidebarItems } from '~/data/data';
    import { Grid } from 'ant-design-vue';
    import { memberStore } from '~/store/index';

    const member = memberStore();
    
    const useBreakpoint = Grid.useBreakpoint;
    const screens = useBreakpoint();
    
    const route = useRoute();
    
</script>
<style>
.menu{
    height: calc(100vh - 100px);
    position: fixed;
    background: linear-gradient(93deg, #2f0b06bd, #000000a6);
}
.small-memu{
    position: sticky;
    top: 100px;
}

.menu-bg{
    height: calc(100vh - 150px);
    overflow: auto;
    scrollbar-width: none;
    width:200px;
}
.small-memu-bg{
    width:110px;
}

.menu-list{
    padding: 10px;
    color:whitesmoke
}
.detail-menu-sidebar{
    color: whitesmoke;
    text-align: center;
}
.menu-list-item:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 3px;
    height: 55%;
    background: #FFFFFFFF;
    border-radius: 0 20px 20px 0;
}
.menu-list-item{
    list-style-type: none;
    list-style: none;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background: linear-gradient(#2C002CFF, #100F4EFF);
    position: relative;
    box-shadow: 0 5px 10px #000000b0;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all .3s;
    font-size: 13px;
    position: relative;
    border: 1px solid transparent;
}
.menu-list-item-detail{
    padding: 7px 15px;
    width: 100%;
}
.router-link-active,.link-sidebar{
    width: 100%;
}
.menu-list-item:hover {
    border: 1px solid #fff;
}
.menu-list-item-active{
    background: radial-gradient(100% 100% at 50% 0, #F9FAFAFF 0,#A349A4FF 44%, #0F002EFF 100%) !important;
    border: 1px solid #fff;
}
.logo-menu-sidebar{
    margin-right: 10px;
}
.logo-menu-sidebar-img{
    width: 40px !important;
}
.small-logo-menu-sidebar-img{
    margin-right: 0px;
    text-align: center;
}
</style>