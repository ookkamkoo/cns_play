<template>
    <LayoutsNewsboxhead/>
    <a-row>
        <a-flex>
            <LayoutsSidebar v-if="!screens.md"/>
            <a-col :class="{'small-main':!screens.md}">
                <h2 class="mx-1">
                    เกมยอดนิยม
                </h2>
                <div class="game-recommend my-4">
                    <a-row>
                        <a-col :span="12" :md="8" :lg="6" :xl="4" class="game-recommend-item" v-for="game in gameRecommend">
                            <div class="game-recommend-item-detail">
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
                                    <img src="https://play.1million.social/image/fire.gif">
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-flex>
    </a-row>
    <a-row :alight="'center'">
        <div class="elementor-background-overlay">
            <a-row justify="center">
                <a-col :span="16" >
                    <a-col :span="24">
                        <h2>
                            1MILLION เว็บที่ให้บริการคาสิโนออนไลน์เต็มรูปแบบ ทั้งสล็อตออนไลน์ คาสิโนสด บาคาร่าสด เกมแทงปลา เกมกีฬา ฯลฯ
                        </h2>
                        <p>
                            โดยผู้เล่นสามารถสนุกกับเกมของเราได้ด้วยเงินเดิมพันขั้นต่ำเพียง 10 บาทเท่านั้น และสามารถทำการฝาก-ถอนได้ตลอด 24 ชั่วโมง ด้วยระบบออโต้ ทั้งสะดวก รวดเร็วทันใจเป็นอย่างมากเหมาะสำหรับผู้ที่ชื่นชอบการเดิมพันในรูปแบบของเกมการพนันออนไลน์อันดับ 1 ในปี 2023
                        </p>
                        <h2>
                            1MILLION บริการประทับใจ ก็ไม่เป็นสองรองใคร ใส่ใจทุกคำตอบ ตลอด 24 ชั่วโมง 7 วันต่อสัปดาห์ไม่มีหยุด
                        </h2>
                        <div class="center my-3">
                            <a-image
                                :width="screens.md ? '400px' : '100%'"
                                :preview="false"
                                src="https://image.1million.social/image/imageList/1707495347305.png"
                            />
                        </div>
                        <p>
                            เพราะผู้เล่นทุกท่าน คือ คนสำคัญของเรา และเรายังมีทีมลูกค้าสัมพันธ์ที่คอยให้ความช่วยเหลือ ตอบทุกคำถาม ให้บริการทุกเรื่องที่คุณสงสัยตลอด 24 ชั่วโมง เพื่อให้คนสำคัญของเราไม่ต้องกังวลกับปัญหาที่พบตั้งแต่ต้นจนจบ นอกจากนี้ เรายังมีเว็บคาสิโน และสล็อตพันธมิตรชั้นนำที่พร้อมมาเสิร์ฟความหลากหลายของเกม และความสนุกสนาน ให้คุณได้เพลิดเพลิน เช่น SA Gaming, WM Casino, Dream Gaming, Pretty Gaming, ALLBET, Joker, PG Slot และอื่นๆ อีกมากมายจนผู้เล่นจะติดใจอย่างแน่นอน
                        </p>
                        <div class="center my-3">
                            <a-image
                                :width="screens.md ? '400px' : '100%'"
                                :preview="false"
                                src="https://play.1million.social/wp-content/uploads/2023/11/cover-games-bg-min-1024x576.png"
                            />
                        </div>
                    </a-col>
                </a-col>
            </a-row>
        </div>
        <div class="elementor-background-overlay elementor-background-overlay-line-top">
            <a-row justify="center">
                <a-col :span="16">
                    <a-col :span="24">
                        <a-row justify="space-around" align="middle" class="">
                            <a-col :span="24" :md="12"  class="my-3">
                                <a-image
                                    :width="screens.md ? '400px' : '100%'"
                                    :preview="false"
                                    src="https://play.1million.social/wp-content/uploads/2023/11/gg1-min.png"
                                />
                            </a-col>
                            <a-col :span="24" :md="12">
                                <div class="center">
                                    <h2>
                                        สนุก และ คว้าชัยชนะได้ทุกที่ทุกเวลา
                                    </h2>
                                    <p>
                                        ให้บริการความสนุกไม่รู้จบ 24 ชม. ไปกับดีลเลอร์ “DEALER” สาวสวย สุดเซ็กซี่ คอยแจกไพ่ ให้คุณได้ลุ้นทุกเกมส์เดิมพัน สบายตา สบายใจ ด้วย สาวๆ น่ารัก สุดเซ็กซี่ มาใส่บิกินี่ แต่ละสีแต่ละวันสีสด มาแจกไพ่ ท่านจะได้รับประสบการณ์ใหม่ในการเดิมพัน
                                    </p>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-col>
            </a-row>
        </div>
    </a-row>
    
  </template>
  <script lang="ts" setup>
  import { Grid } from 'ant-design-vue';
  import { getGameRecommend } from '~/services/gameListServices';
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
        code: string;
    }

    const gameRecommend = ref<GameList[]>([])
    const useBreakpoint = Grid.useBreakpoint;
    const screens = useBreakpoint();
    
    onMounted( () => {
        getRecomend();
    });

    const getRecomend = async() =>{
        var data = await getGameRecommend();
        // console.log(data);
        if(data.status="success"){
            gameRecommend.value = data.data
        }
    }
  </script>
  <style scoped>
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
    .small-main{
        display: block;
        top: 0;
        width: calc(100% - 110px);
        margin-left: auto;
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