<template>
    <div class="elementor-background-overlay-line">
        <a-row justify="center">
            <a-col :span="24" :md="16">
                <a-flex>
                        <a-image
                                :width="400"
                                :preview="false"
                                src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/icon/joker-gaming.417d073.png"
                        />
                        <a-image
                            :width="400"
                            :preview="false"
                            src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/icon/ambbet.1d53780.png"
                        />
                        <a-image
                            :width="400"
                            :preview="false"
                            src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/icon/ameba.dea3fdf.png"
                        />
                        <a-image
                            :width="400"
                            :preview="false"
                            src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/icon/dragoonsoft.a39781a.png"
                        />
                        <a-image
                            :width="400"
                            :preview="false"
                            src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/icon/dream-gaming.d993e67.png"
                        />
                        <a-image
                            :width="400"
                            :preview="false"
                            src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/icon/gamatron.96cdfab.png"
                        />
                        <a-image
                            :width="400"
                            :preview="false"
                            src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/icon/joker-gaming.417d073.png"
                        />
                        <a-image
                            :width="400"
                            :preview="false"
                            src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/icon/live-22.dfd4972.png"
                        />
                </a-flex>
            </a-col>
        </a-row>
    </div>
    <div class="elementor-background-overlay-dark">
            <a-row justify="center">
                <a-col :span="16">
                    <div class="center my-2 footer-md">
                        <h2>
                            {{member.settingDefault.title}} เว็บคาสิโนออนไลน์ 
                        </h2>
                        <h2>
                            ครองอันดับในใจคนไทย 10 ปีซ้อน 
                        </h2>
                        <h3>
                            {{member.settingDefault.title}} บาคาร่า คาสิโนออนไลน์ ที่ดีที่สุด เพื่อประสบการณ์ที่ดีของผู้เล่นอย่างแท้จริง แบบ {{member.settingDefault.title}}
                        </h3>
                        <h4>
                            Created website by
                        </h4>
                        <div class="center">
                            <a-image
                                :width="screens.md ? '400px' : '100%'"
                                :preview="false"
                                :src="config.public.apiServer + '/' +member.settingDefault.imageLogoWebsite"
                            />
                        </div>
                        <h4>
                            Terms and Conditions 
                        </h4>
                        <h5>
                            Copyright © 2023 {{member.settingDefault.title}} All Rights Reserved.
                        </h5>
                    </div>
                </a-col>
            </a-row>
        </div>
</template>

<script lang="ts" setup>
  import { Grid } from 'ant-design-vue';
  import { memberStore } from '~/store/index';
  const useBreakpoint = Grid.useBreakpoint;
  const member = memberStore();
  const screens = useBreakpoint();
  const config = useRuntimeConfig()
  
</script>
<style scoped>
  @media (max-width: 767px) {
    .footer-md {
      padding-bottom: 45px;
    }
  }
</style>
<style>
.elementor-background-overlay-dark{
    background-color: rgba(0, 0, 0, 0.811);
}
.elementor-background-overlay-line{
    border-top: 2px solid #fff;
    border-bottom: 2px solid #fff;
    box-shadow: 0 0 5px #fff, 0 0 15px #0088ff, 0 0 25px #00f7ff;
    background-color: rgba(0, 0, 0, 0.396);
}
</style>