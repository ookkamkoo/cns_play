<template>
    <div class="menu">
        <div class="menu-bg">
            <ul class="menu-list">
                <li
                    class="menu-list-item"
                    v-for="item in sidebarItems"
                    :key="item.path"
                    :class="{ 'menu-list-item-active': item.path === $route.path }"
                    >
                    <NuxtLink :to="item.path" exact class="link-sidebar">
                        <div class="menu-list-item-detail">
                        <a-flex :align="'center'">
                            <div class="logo-menu-sidebar">
                                <a-image :width="60" :preview="false" :src="item.image" />
                            </div>
                            <div class="detail-menu-sidebar">
                                <span>{{ item.name }}</span>
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
    
    const route = useRoute();
    
</script>
<style>
.menu{
    height: calc(100vh - 100px);
    position: relative;
    background: linear-gradient(93deg, #2f0b06bd, #000000a6);
}

.menu-bg{
    height: calc(100vh - 150px);
    overflow: auto;
    scrollbar-width: none;
    width:200px;
}

.menu-list{
    padding: 10px;
    color:whitesmoke
}
.detail-menu-sidebar{
    color: whitesmoke;
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
</style>