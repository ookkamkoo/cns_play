<template>
  <a-col :class="{'small-main':!screens.md}" style="width: 100%;">
    <h2 class="m-2">
      {{category.name_th}}
    </h2>
    <div class="game-recommend my-4">
        <a-row>
            <a-col :span="12" :md="8" :lg="6" :xl="3" class="game-recommend-item" v-for="game in gameRecommend">
                <div class="game-recommend-item-detail" @click="goGameList(game.name)">
                    <a-image
                        width="100%"
                        :preview="false"
                        :src="game.image"
                    />
                    <div class="overlay"></div>
                    <span class="name">
                        <span>{{game.name}}</span>
                    </span>
                    <div class="provider-name">PGSOFT</div>
                    <div class="box-play">
                        <div class="button-play boxGoPlay" data-gameid="1682240">เล่น</div>
                    </div>
                    <div class="hot">
                        <img src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/icon/fire.gif">
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
  </a-col>
</template>
<script lang="ts" setup>
import { gameCategories } from '~/data/data';
import { getProviderGameList } from '~/services/gameListServices';
import { Grid } from 'ant-design-vue';
import { memberStore } from '~/store/index';
const member = memberStore();

interface GameMenuItem {
    id: number;
    name: string;
    name_th: string;
    icon: string;
    ref: string;
    image: string;
    priority: number;
    is_active: boolean;
  }

interface GameList {
  id: string;
  image: string;
  is_active: boolean;
  loby: boolean;
  name: string;
  priority: number;
  productCode: string;
  provider: string;
  type: string;
}

const route = useRoute();
const category = ref<GameMenuItem>({ id: 0, name: '', name_th: '', ref: '', icon: '', image: '', priority: 0, is_active: false });

const useBreakpoint = Grid.useBreakpoint;
const screens = useBreakpoint();

const gameRecommend = ref<GameList[]>([])

const updateCategory = async() => {
  const game = route.params.category;
  console.log(game);
  
  category.value = member.menuBar.find((cat: GameMenuItem) => cat.name === game) || {
    id: 0,
    name: '',
    name_th: '',
    ref: '',
    icon: '',
    image: '',
    priority: 0,
    is_active: false,
  };
  
  var data = await getProviderGameList(category.value.ref)
  console.log(data.data);
  
  if(data.status == "success"){
    gameRecommend.value = data.data
  }
};

watch(route, updateCategory, { immediate: true });

const goGameList = (provider: string) => {
  return navigateTo('/list-game/' + provider)
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
</style>