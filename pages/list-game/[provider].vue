<template>
    <a-row>
        <a-flex>
            <LayoutsSidebar v-if="!screens.md"/>
            <a-col :class="{'small-main':!screens.md}">
              <span class="m-2 page-back"  @click="goBack">
                << ย้อนกลับ
              </span>
              <h2 class="m-2">
                  รายการเกมส์ค่าย {{provider}}
              </h2>
              <div class="game-recommend my-4">
                  <a-row>
                      <a-col :span="12" :md="8" :lg="4" :xl="4" class="game-recommend-item" v-for="game,index in gameRecommend">
                        <div class="game-recommend-item-detail" :class="{ 'maintain-detail': game.maintain }" @click="launchGame(game.code,provider,game.maintain)" v-if="game.isActive">
                            <a-image
                                width="100%"
                                :preview="false"
                                :src="game.imageUrl"
                            />
                            <div class="maintain" v-if="game.maintain">
                                <div calss="maintain-center">
                                    ปิดปรับปรุง
                                </div>
                            </div>
                            <div class="overlay"></div>
                            <span class="name">
                                <span>{{game.name}}</span>
                            </span>
                            <div class="provider-name">PGSOFT</div>
                            <div class="box-play">
                                <div class="button-play boxGoPlay" data-gameid="1682240">เล่น</div>
                            </div>
                            <div class="hot" v-if="game.hot==true">
                                <img src="https://play.1million.social/image/fire.gif">
                            </div>
                        </div>
                      </a-col>
                  </a-row>
              </div>
            </a-col>
        </a-flex>
    </a-row>

  </template>
  <script lang="ts" setup>
  import { Grid } from 'ant-design-vue';
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
import { Alert } from '~/components/alert/alertComponent';
  import { getGameList,launchGameService } from '~/services/gameListServices';

  const useBreakpoint = Grid.useBreakpoint;
  const screens = useBreakpoint();

  interface GameList {
    id: string;
    imageUrl: string;
    isActive: boolean;
    loby: boolean;
    name: string;
    priority: number;
    productCode: string;
    provider: string;
    type: string;
    code: string;
    hot: boolean;
    maintain: boolean;
}

  const route = useRoute();
  const router = useRouter();
  const provider = ref<string>("");
  const gameRecommend = ref<GameList[]>([])


  const updateCategory = async() => {
      const providerParam = route.params.provider;
      if (Array.isArray(providerParam)) {
          provider.value = providerParam[0];
      } else {
          provider.value = providerParam as string;
      }

      var data = await getGameList(provider.value)
      console.log(data);
      
      if(data.status == "success"){
        gameRecommend.value = data.data
      }
  };

  watch(route, updateCategory, { immediate: true });

  const goBack = () => {
      router.go(-1);
  };

  const launchGame = async (code: string, provider: string, maintain: boolean) => {
  if (!maintain) { // Add parentheses around the condition
    const data = await launchGameService(code, provider);
    console.log(data);
    if (data.status === "success") {
      window.open(data.data.url, "_blank");
    }
  }
}

  </script>
  <style scoped>
  /* For demo */
  .elementor-background-overlay{
    background-color: transparent;
    background-image: linear-gradient(360deg, #00000000 0%, #000000 100%);
    transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
  }
  .elementor-background-overlay-line-top{
    border-top: 2px solid #fff;
    box-shadow: 0 0 5px #fff, 0 0 15px #0088ff, 0 0 25px #00f7ff;
    background-color: rgba(0, 0, 0, 0.396);
  }
  .name{
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 12px;
    width: 100%;
    padding: 10px 15px;
    z-index: 2;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%);
    text-transform: capitalize;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  }
  .provider-name{
    position: absolute;
    top: 8px;
    right: 8px;
    border-radius: 5px;
    padding: 1px 4px;
    background: rgba(34, 36, 42, 0.575);
    font-size: 10px;
  }
  
  .box-play{
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    -webkit-transform: scale(0);
    transform: scale(0);
    transition: all .3s ease;
    z-index: 2;
    height: 100%;
  }

  .maintain {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000000a0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity:1;
    z-index: 999;
  }

  .maintain-detail .overlay{
    opacity:0 !important
  }

  .maintain-detail .box-play{
    -webkit-transform: scale(0) !important; 
    transform: scale(0) !important;
  }
  
  .maintain .box-play{
    -webkit-transform: scale(0); 
    transform: scale(0);
  }

  .maintain-center{
    position: relative;
    top: 50%;
    left: 50%;
  }
  .overlay{
    background: #000000a9;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity:0;
    transition: opacity 0.5s ease-in-out;
  }
  
  .game-recommend-item-detail:hover .overlay{
    opacity:1
  }
  .game-recommend-item-detail:hover .box-play{
    -webkit-transform: scale(0.99); 
    transform: scale(0.99);
  }

  .game-recommend-item-detail:after{
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    box-shadow: inset 0 0 30px 10px #0000006b;
    border-radius: 10px;
  }
  .boxGoPlay {
    position: relative;
    transition: .5s;
    text-transform: uppercase;
    text-align: center;
  }
  .button-play, .button-play:focus, .button-play:active, .button-play:hover {
    background: linear-gradient(to bottom, #FF9100FF 0%, #FF9100FF 100%);
    border-radius: 1.5rem;
    color: #fff;
    cursor: pointer;
    margin: auto;
    padding: 5px 15px;
    min-width: 80px;
    font-size: 14px;
  }
  .hot {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    padding: 8px 5px 5px 8px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 30px 0 0 0;
  }
  .hot img {
    width: 20px !important;
    filter: drop-shadow(0 0 5px orange) invert(0%);
  }
  .game-recommend-item{
    border-radius: 1rem;
    padding: 0.5rem;
  }
  .game-recommend-item-detail{
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
  }
  .page-back{
    cursor: pointer;
    margin: 1rem;
  }
  </style>