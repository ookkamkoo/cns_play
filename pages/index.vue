    <template>
        <!-- <LayoutsNewsboxhead/> -->
        <LayoutsNewsboxheadnew style="margin-top: 1rem;"/>

        <a-drawer width="100%"  height="100vh"  :title="nameGame" :placement="'right'" :open="openGame" @close="onClose">
        <template #extra>
            <!-- <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button> -->
            <a-button style="margin-right: 8px" @click="refreshUrl()">รีเฟรซ <RedoOutlined /></a-button>
        </template>
        <iframe ref="gameIframe" :src="urlGame" width="100%" height="100%" style="border: none;"></iframe>
        </a-drawer>
        <a-col>
            <a-row style="width:100%;min-height:calc(100vh - 380px);">
                <a-flex>
                    <LayoutsSidebar v-if="!screens.md"/>
                    <a-col :class="{'small-main':!screens.md}">
                        <h2 class="mx-1">
                            เกมยอดนิยม
                        </h2>
                        <NuxtLink to="/information/mini-game/dailyLogin" exact class="link-sidebar">
                            <!-- <div style="color: aquamarine;">asdasd</div> -->
                        </NuxtLink>
                        <div class="game-recommend my-4">
                            <a-row>
                                <template v-for="game in member.gameReccommend">
                                    <a-col :span="12" :md="8" :lg="6" :xl="4" class="game-recommend-item" v-if="game.is_active && (game.status == 1 || game.status == 3) ">
                                        <!-- && (game.status = 1 && game.pg_status = false) -->
                                        <!-- v-if="game.is_active && (game.status == 1 || game.status=3)" -->
                                        <!-- {{game}} -->
                                        <div class="game-recommend-item-detail" :class="{ 'maintain-detail': game.maintain }" @click="launchGame(game.game_code,provider,game.maintain,game.game_code)">
                                            <div :class="['overlay-image', { 'overlay-image-clear': isClear }]" ></div>
                                            <a-image
                                                width="100%"
                                                :preview="false"
                                                :src="game.image"
                                                loading="lazy"
                                            />
                                            <div class="overlay"></div>
                                            <span class="name">
                                                <span>{{game.game_code}}</span>
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
                                </template>
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
                                    {{member.settingDefault.title}} เว็บที่ให้บริการคาสิโนออนไลน์เต็มรูปแบบ ทั้งสล็อตออนไลน์ คาสิโนสด บาคาร่าสด เกมแทงปลา เกมกีฬา ฯลฯ
                                </h2>
                                <p>
                                    โดยผู้เล่นสามารถสนุกกับเกมของเราได้ด้วยเงินเดิมพันขั้นต่ำเพียง 10 บาทเท่านั้น และสามารถทำการฝาก-ถอนได้ตลอด 24 ชั่วโมง ด้วยระบบออโต้ ทั้งสะดวก รวดเร็วทันใจเป็นอย่างมากเหมาะสำหรับผู้ที่ชื่นชอบการเดิมพันในรูปแบบของเกมการพนันออนไลน์อันดับ 1 ในปี 2023
                                </p>
                                <h2>
                                    {{member.settingDefault.title}} บริการประทับใจ ก็ไม่เป็นสองรองใคร ใส่ใจทุกคำตอบ ตลอด 24 ชั่วโมง 7 วันต่อสัปดาห์ไม่มีหยุด
                                </h2>
                                <div class="center my-3">
                                    <a-image
                                        :width="screens.md ? '400px' : '100%'"
                                        :preview="false"
                                        :src="config.public.apiServer + '/' +member.settingDefault.imageLogoWebsite"
                                    />
                                </div>
                                <p>
                                    เพราะผู้เล่นทุกท่าน คือ คนสำคัญของเรา และเรายังมีทีมลูกค้าสัมพันธ์ที่คอยให้ความช่วยเหลือ ตอบทุกคำถาม ให้บริการทุกเรื่องที่คุณสงสัยตลอด 24 ชั่วโมง เพื่อให้คนสำคัญของเราไม่ต้องกังวลกับปัญหาที่พบตั้งแต่ต้นจนจบ นอกจากนี้ เรายังมีเว็บคาสิโน และสล็อตพันธมิตรชั้นนำที่พร้อมมาเสิร์ฟความหลากหลายของเกม และความสนุกสนาน ให้คุณได้เพลิดเพลิน เช่น SA Gaming, WM Casino, Dream Gaming, Pretty Gaming, ALLBET, Joker, PG Slot และอื่นๆ อีกมากมายจนผู้เล่นจะติดใจอย่างแน่นอน
                                </p>
                                <div class="center my-3">
                                    <a-image
                                        :width="screens.md ? '400px' : '100%'"
                                        :preview="false"
                                        src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/landing-page/cover-games-bg-min-1024x576.png"
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
                                            src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/landing-page/gg1-min.png"
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
        </a-col>
        
    </template>
    <script lang="ts" setup>
    import { Grid } from 'ant-design-vue';
    import { getGameRecommend } from '~/services/gameListServices';
    import { memberStore } from '~/store/index';
    import { launchGameService } from '~/services/gameListServices';
    import { getToken,logout } from '../auth/authToken';
    import type { Game,GameCategory } from '~/store/typeMember';

        const member = memberStore();
        const config = useRuntimeConfig()

        const isClear = ref(false); // ควบคุมสถานะของ overlay

        const clearOverlay = () => {
        isClear.value = true; // ตั้งค่าให้ overlay ค่อยๆ หายไปเมื่อภาพโหลดเสร็จ
        };


        interface GameList {
            is_active: boolean;
            maintain: boolean;
            image: string;
            categoryId: string;
            createdDate: string | null;  // Assuming `createdDate` can be null
            describe: string;
            game_code: string;
            gameId: number;
            gameName: string;
            launch_code: string;
            new: boolean;
            popular: boolean;
            productId: number;
            updatedDate: string;
            vote: boolean;
            status: number;
            pg_status: boolean;
        }

        const provider = "PG Soft"
        const gameRecommend = ref<GameList[]>([])
        const useBreakpoint = Grid.useBreakpoint;
        const screens = useBreakpoint();
        const openGame = ref<boolean>(false);
        const urlGame = ref<string>("");
        const nameGame = ref<string>("");
        
        onMounted( () => {
            window.onbeforeunload = null;
            getRecomend();
        });

        const onClose = () => {
        console.log("close");
        //   urlGame.value = "";
        openGame.value = false;
        };

        const refreshUrl = () => {
            const iframe = document.querySelector("iframe");
            if (iframe) {
                iframe.src = iframe.src;
            }
        };

        const getRecomend = async () => {
            try {
                const data = await getGameRecommend();

                if (data.status === "success") {
                    gameRecommend.value = data.data.gameRecommend;

                    // Clear existing game data in allGame
                    member.allGame.forEach((category) => {
                        category.games = [];
                    });

                    // Populate the games array for each category
                    data.data.gameAll.forEach((item: Game) => {
                        const category = member.allGame.find(
                            (cat: GameCategory) => cat.category === item.type
                        );
                        if (category) {
                            category.games.push(item);
                        } else {
                            console.warn(`No category found for game type: ${item.type}`);
                        }
                    });

                    // Set the game recommendations
                    member.setGameRecommend(data.data.gameRecommend);
                } else {
                    console.error("Failed to fetch game recommendations:", data.status);
                }
            } catch (error) {
                console.error("Error in getRecomend:", error);
            }
        };

        function getDeviceType() {
            return window.innerWidth < 768 ? "mobile" : "pc";
        }

        const launchGame = async (code: string, provider: string, maintain: boolean, name: string) => {
            let token = getToken();
            if(token){
                if (!maintain) { // Add parentheses around the condition
                    const deviceType = getDeviceType();
                    const data = await launchGameService(code, provider,deviceType);
                    console.log(data);
                    if (data.status === "success") {
                    // window.open(data.data.url, "_blank");
                    console.log(name);
                    
                    urlGame.value = data.data.url
                    openGame.value = true
                    nameGame.value = name
                    }
                }
            }else {
                member.setShowLogin(true)
                return navigateTo('/');
            }
            }
        setTimeout(() => {
            clearOverlay();
        }, 10);
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

        .game-recommend-item-detail {
            opacity: 1;
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }

        .game-recommend-item-detail.fade-out {
            opacity: 0;  /* ให้ค่อย ๆ โปร่งใส */
            transform: translateY(20px);  /* เลื่อนลงเล็กน้อยในขณะที่ fade out */
            pointer-events: none;  /* ป้องกันการกดซ้ำ */
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
        
        .overlay-image {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
            backdrop-filter: blur(8px); /* เริ่มต้นด้วยเบลอ */
            opacity: 1; /* เริ่มต้นให้ overlay ปรากฏ */
            transition: backdrop-filter 0.5s ease-in-out, opacity 0.5s ease-in-out; /* กำหนดระยะเวลา 1 วิ */
        }

        .overlay-image-clear {
            backdrop-filter: blur(0); /* ภาพชัดเจนเมื่อใช้ class นี้ */
            opacity: 0; /* ซ่อน overlay */
        }

    </style>
    <style>
    .ant-drawer-body{
        padding: 0 !important;
    }
    :where(.css-dev-only-do-not-override-19iuou).ant-drawer .ant-drawer-close{
        color: rgb(255 255 255) !important
    }
    :where(.css-dev-only-do-not-override-19iuou).ant-drawer .ant-drawer-body {
        overflow: hidden !important;
        }

        :where(.css-dev-only-do-not-override-19iuou).ant-drawer .ant-drawer-content {
            overflow: hidden !important;
        }
    .ant-drawer-title{
        color: rgb(255 255 255) !important
    }
    .ant-drawer-header{
        background-color: rgba(0, 0, 0, 1)
    }
    .ant-drawer-close{
        color: rgb(255 255 255 / 72%) !important;
    }
    </style>