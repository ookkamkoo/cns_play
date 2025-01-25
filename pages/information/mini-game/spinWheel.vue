<template>
    <!-- <a-row>
        <LayoutsInformationMiniGameBar/>
    </a-row> -->
    <div>
        <a-flex :justify="'space-between'" class="m-2 spin-text" :align="'center'">
            <h4><NuxtLink to="/information/mini-game/listMiniGame" exact class="link-sidebar"><ArrowLeftOutlined /> กิจกรรมทั้งหมด</NuxtLink></h4>
            <div style="white-space: nowrap;">
                เหรียญของคุณ {{ member.memberDetail.balance_event }} เหรียญ
            </div>
        </a-flex>
        <br>
        <h2 class="m-2 center jackpot">🎉 กิจกรรมกงล้อ 🎉</h2>
        <canvas ref="wheelRef" :width="canvasSize" :height="canvasSize" class="spin-wheel"></canvas>
        <div class="text-center">
            เหรียญที่ต้องใช้เล่นเกมส์ {{coin}} เหรียญ
        </div>
        <a-flex :justify="'center'">
            <!-- <a-table 
            :columns="dynamicColumns"
            :data-source="dataShow"
            bordered
            :scroll="{ x: 800, y: 700 }"
            :pagination="false"
            class="my-2"
            >
                <template #bodyCell="{ column, record,index }">
                    <template v-if="column.key === 'id'">
                        <div>{{ index + 1 }}</div>
                    </template>
                    <template v-else-if="column.key === 'Coin'">
                        <div>{{ record.Coin }}</div>
                    </template>
                    <template v-else-if="column.key === 'result_detail'">
                        <div>{{ record.result_detail }}</div>
                    </template>
                    <template v-else-if="column.key === 'status'">
                        <a-tag color="green" v-if="record.status == 2">สำเร็จ</a-tag>
                        <a-tag color="red" v-else-if="record.status == 3">ยกเลิก</a-tag>
                    </template>
                    <template v-else-if="column.key === 'created_at'">
                        <div>{{ dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                    </template>
                </template>
            </a-table> -->
            <a-col :span="24" :md="24" class="p-1">
                <h3>ประวัติกิจกรรมกงล้อ</h3>
                <div class="list-container my-2">
                    <a-row class="list">
                    <a-col :span="24" class="center">
                        เเสดง 10 รายการ ล่าสุด
                    </a-col>
                    <a-col :span="24" class="my-1">
                        <a-flex :justify="'space-around'">
                        <a-col :span="4" class="center">เกมส์</a-col>
                        <a-col :span="4" class="center">เหรียญที่ใช้</a-col>
                        <a-col :span="4" class="center">ผลที่ออก</a-col>
                        <a-col :span="4" class="center">สถานะ</a-col>
                        <a-col :span="4" class="center">วันที่</a-col>

                        </a-flex>
                    </a-col>
                    <a-col :span="24">
                        <hr />
                    </a-col>
                    <a-col :span="24" class="text-12">
                        <a-flex
                            :justify="'space-around'"
                            :align="'center'"
                            v-for="(data, index) in dataShow"
                            :key="data.id || index"
                            class="my-1"
                            >
                            <a-col :span="4" class="center">
                                <div>กงล้อ</div>
                            </a-col>
                            <a-col :span="4" class="center">
                                <div>{{ data.Coin }}</div>
                            </a-col>
                            <a-col :span="4" class="center">
                                <div>{{ data.result_detail }}</div>
                            </a-col>
                            <a-col :span="4" class="center">
                                <a-tag color="green" v-if="data.status == 2">สำเร็จ</a-tag>
                                <a-tag color="red" v-else-if="data.status == 3">ยกเลิก</a-tag>
                            </a-col>
                            <a-col :span="4" class="center">
                                <div>{{ dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                            </a-col>
                        </a-flex>
                        <!-- <hr /> -->
                    </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-flex>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { createVNode } from 'vue';
    import { Alert } from '~/components/alert/alertComponent';
    import { getSettingSpinWheelServices,spinWheelServices,getDataSpinWheelServices,getTransactionSpinWheelServices } from "~/services/miniGameServices";
    import dayjs from 'dayjs';
    
    import { memberStore } from '~/store/index';
    const member = memberStore();

    const dataShow = ref<any[]>([]);
    const allRecord = ref<number>(0);
    const coin = ref<number>(0);
  
    const spinGame = async () => {
        const data = await spinWheelServices();
        if (data.status === 'success') {
            targetIndex.value = data.data.i
            member.memberDetail.balance_event = data.data.coin
            spinWheel(data.data.i);
        }else{
            Alert("error",data.message)
        }
    };

    const getDataSpinGame = async () => {
        const data = await getDataSpinWheelServices();
        if (data.status === 'success') {
            // targetIndex.value = data.data.i
            member.memberDetail.balance_event = data.data.coin
            member.memberDetail.balance = data.data.amount
            // spinWheel(data.data.i);
        }else{
            Alert("error",data.message)
        }
    };

  const showConfirm = () => {
    Modal.confirm({
        title: 'คุณต้องการหมุนกงล้อใช่ไหม?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { style: 'color:red;' }, `ใช้ `+coin.value+` เหรียญในการหมุน`),
        onOk() {
        console.log('OK');
        // spinWheel();
            if(spinning){
                Alert("error","เกมส์กำลังดำเนินการออกผล")
            }else{
                if(member.memberDetail.balance_event < coin.value){
                    Alert("error","จำนวนเหรียญขั้นต่ำที่ใช้ในการหมุน คือ "+coin.value)
                }else{
                    spinGame();
                    // spinWheel();
                    // getDataSpinGame();
                }
            }
        },
        onCancel() {
        console.log('Cancel');
        },
        class: 'test',
    });
    };


const showWinner = (winer:string) => {
    getDataSpinGame();
    Modal.confirm({
        title: 'Do you Want to delete these items?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { style: 'color:red;' }, winer),
        onOk() {
        console.log('OK');
        drawWheel()
        getTransactionSpinWheel();
        },
        onCancel() {
        console.log('Cancel');
        },
        class: 'test',
    });
};

  const canvasSize = ref(500); // ขนาดของ Canvas
  const circleRadius = ref(40);
  const aspectRatio = 1
  const wheelRef = ref<HTMLCanvasElement | null>(null) // ระบุประเภทของ wheelRef ให้ชัดเจน
  const segments = ref<string[]>([]);
  const colors = ref<string[]>([]);
  var targetIndex = ref(0);
  
  let rotationAngle = 0
  let sum = 0
  let spinning = false
  
  const radius = canvasSize.value / 2.3  // ขนาดของวงล้อให้เล็กลงเป็น 1/3 ของ canvas
//   const circleRadius = 40 // ขนาดของวงกลมตรงกลาง
  
const getSettingGame = async () => {
  const data = await getSettingSpinWheelServices();
  if (data.status === 'success') {
    const configValue = data.data.data.config_value;
    coin.value = data.data.data.game_coin;
    segments.value = configValue.map((item: any) => item.rewards); // ตั้งค่า segments
    colors.value = configValue.map((item: any) => item.bgColor);   // ตั้งค่าสี
//     const segments = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6', 'Prize 7', 'Prize 8', 'Prize 9', 'Prize 10']
//   const colors = ['#FF5733', '#33FF57', '#5733FF', '#F1C40F', '#8E44AD', '#33FF57', '#5733FF', '#FF5733', '#F1C40F', '#8E44AD']
    
    drawWheel(); // วาดวงล้อหลังจากดึงข้อมูลสำเร็จ
  }
};

const getTransactionSpinWheel = async () => {
  const data = await getTransactionSpinWheelServices();
  if (data.status === 'success') {
    dataShow.value = data.data.transactions
    allRecord.value = data.data.total_count
  }
};

  // ฟังก์ชันวาดวงล้อ
  const drawWheel = () => {
    const canvas = wheelRef.value
    if (!canvas) return
  
    const ctx = canvas.getContext('2d')
    if (!ctx) return // ตรวจสอบว่า ctx ไม่เป็น null
  
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const segmentAngle = (2 * Math.PI) / segments.value.length;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    // วาดวงกลมตรงกลาง
    ctx.beginPath()
    ctx.arc(centerX, centerY, circleRadius.value, 0, 2 * Math.PI)
    ctx.fillStyle = '#FFFFFF' // สีของวงกลม
    ctx.fill()
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()
  
    // ตั้งค่าเงารอบวงกลม
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'  // สีเงา
    ctx.shadowBlur = 15  // ความเบลอของเงา
    ctx.shadowOffsetX = 5  // ระยะห่างของเงาในแนวแกน X
    ctx.shadowOffsetY = 5  // ระยะห่างของเงาในแนวแกน Y
  
    for (let i = 0; i < segments.value.length; i++) {
        const startAngle = i * segmentAngle - Math.PI / 2 + rotationAngle
        const endAngle = startAngle + segmentAngle
    
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle)
        ctx.fillStyle = colors.value[i % colors.value.length];
        ctx.fill()
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.closePath()
    
        // วาดข้อความ
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(startAngle + segmentAngle / 2)
        ctx.textAlign = 'right'
        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 16px Arial'
        ctx.fillText(segments.value[i], radius - 10, 10)
        ctx.restore()
    }
    
    drawPointer(centerX, centerY);
    // วาดลูกศรที่ตรงกลางวงล้อ
    circlePointer(centerX, centerY)
  }
  
  // ฟังก์ชันวาดลูกศรชี้ตรงกลาง
  const drawPointer = (centerX: number, centerY: number) => {
    const canvas = wheelRef.value;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // ตรวจสอบว่า ctx ไม่เป็น null
    const pointerWidth = 50; // ความกว้างของลูกศร
    const pointerHeight = 40; // ความยาวของลูกศร
    const pointerColor = '#FF0000'; // สีของลูกศร
  
    // วาดลูกศรด้านบนวงล้อ
    ctx.beginPath();
    ctx.moveTo(centerX, radius - pointerHeight); // ปลายบนสุดของลูกศร
    ctx.lineTo(centerX - pointerWidth / 2, radius); // มุมซ้ายของฐานลูกศร
    ctx.lineTo(centerX + pointerWidth / 2, radius); // มุมขวาของฐานลูกศร
    ctx.closePath();
    ctx.fillStyle = pointerColor;
    ctx.fill();
  };
  
  // ฟังก์ชันวาดวงกลมที่ตรงกลางวงล้อ
  const circlePointer = (centerX: number, centerY: number) => {
    const canvas = wheelRef.value
    if (!canvas) return
  
    const ctx = canvas.getContext('2d')
    if (!ctx) return; // ตรวจสอบว่า ctx ไม่เป็น null
    const color = '#FF0000'  // สีของวงกลมและลูกศร
  
    // ยกเลิกการใช้เงาในตอนวาดลูกศร
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'  // ลบเงา
    ctx.shadowBlur = 15
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
  
    // วาดวงกลมที่ตรงกลางวงล้อ
    ctx.beginPath()
    ctx.arc(centerX, centerY, circleRadius.value, 0, 2 * Math.PI)
    ctx.fillStyle = color  // สีของวงกลม
    ctx.fill()
  
    // วาดกรอบวงกลมสีขาว
    ctx.lineWidth = 4  // ความหนาของเส้นกรอบ
    ctx.strokeStyle = '#FFFFFF'  // สีของกรอบ
    ctx.stroke()  // วาดกรอบวงกลม
  
    // วาดข้อความในวงกลมตรงกลาง
    ctx.save()
    ctx.font = 'bold 16px Arial' // ตั้งฟอนต์
    ctx.fillStyle = '#FFFFFF' // สีข้อความ
    ctx.textAlign = 'center' // ตั้งค่าตำแหน่งข้อความให้อยู่กลาง
    ctx.textBaseline = 'middle' // ตั้งค่าให้ข้อความอยู่กลาง
    ctx.fillText('Spin', centerX, centerY) // ข้อความที่จะวาดในวงกลม
    ctx.restore()
  }
  

  // ฟังก์ชันตรวจจับการคลิกที่ canvas
    const handleCanvasClick = (event: MouseEvent) => {
        const canvas = wheelRef.value;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect(); // ขอบของ canvas ในจอ
        const scaleX = canvas.width / rect.width; // สัดส่วนการขยายในแกน X
        const scaleY = canvas.height / rect.height; // สัดส่วนการขยายในแกน Y

        const clickX = (event.clientX - rect.left) * scaleX; // ตำแหน่ง X ที่คลิก
        const clickY = (event.clientY - rect.top) * scaleY; // ตำแหน่ง Y ที่คลิก

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // คำนวณระยะทางจากจุดศูนย์กลาง
        const distanceFromCenter = Math.sqrt(
            Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)
        );

        if (distanceFromCenter <= circleRadius.value) {
            showConfirm(); // แสดงการยืนยันเมื่อคลิกในวงกลม
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        const canvas = wheelRef.value;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect(); // ขอบของ canvas ในจอ
        const scaleX = canvas.width / rect.width; // สัดส่วนการขยายในแกน X
        const scaleY = canvas.height / rect.height; // สัดส่วนการขยายในแกน Y

        const clickX = (event.clientX - rect.left) * scaleX; // ตำแหน่ง X ที่คลิก
        const clickY = (event.clientY - rect.top) * scaleY; // ตำแหน่ง Y ที่คลิก

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // คำนวณระยะทางจากจุดศูนย์กลาง
        const distanceFromCenter = Math.sqrt(
            Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)
        );

        if (distanceFromCenter <= circleRadius.value) {
            canvas.style.cursor = 'pointer'; // เปลี่ยนเป็น pointer เมื่ออยู่ในวงกลม
        } else {
            canvas.style.cursor = 'default'; // คืนค่า cursor เป็นปกติเมื่อออกนอกวงกลม
        }
    };

  // ฟังก์ชันหมุนวงล้อ
const spinWheel = (targetIndex:number) => {
    if (spinning) return;
    spinning = true;
    // 5 data เเนะนำ 11 row

    const spinDuration = 10000; // ระยะเวลาในการหมุนเป็นมิลลิวินาที
    // const targetIndex = 1; // เลือกรางวัลแบบสุ่ม
    const segmentAngle = (2 * Math.PI) / segments.value.length;
    // const targetAngle = 0;
    // const round = (targetIndex+segmentAngle)+((segmentAngle*segments.length)*5);
    const roll = 20;
    // var roll_check = 0;
    const randomNumber = (Math.random()*segmentAngle);
    console.log("randomNumber = "+randomNumber);
    const round = ((segmentAngle*segments.value.length)*roll)-randomNumber-(targetIndex*segmentAngle);


    const segmentsCount = segments.value.length;


    // const totalRotation = (segmentAngle * segmentsCount * roll) - targetAngle - randomNumber;
    // const speed = round/2;
    // var checkDivide = 1;
    // var check = 0;

    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5); 

    const spin = (time: DOMHighResTimeStamp) => {

        const elapsedTime = time - startTime; // เวลาที่ผ่านไป
        const progress = elapsedTime / spinDuration; // สัดส่วนของเวลา
        const easedProgress = easeOutCubic(progress);
        // const easedProgress = easeOutQuint(progress);

        if (progress >= 1) {
            // หยุดการหมุนเมื่อครบเวลา
            spinning = false;
            drawWheel();
            determineWinner(targetIndex); // แสดงผลผู้ชนะ
            return;
        }

        console.log(easedProgress);
        rotationAngle = easedProgress * round;
        rotationAngle %= 2 * Math.PI;
        
        
        // if(rotationAngle >= round){
        //     rotationAngle = targetAngle;
        //     spinning = false;
        //     determineWinner(targetIndex);
        //     return;
        // }

        // // const progress = elapsedTime / spinDuration;
        // // const easeOut = Math.pow(1 - progress, 3); // ลดความเร็วเมื่อใกล้หยุด
        // console.log("test " +roll_check +"<"+ speed);
        // if(roll_check < speed){
        //     // rotationAngle += segmentAngle/checkDivide;
        //     rotationAngle += 0.01
        // }else{
        //     rotationAngle += segmentAngle/checkDivide;
        // }
        // // rotationAngle = rotationAngle + 0.01
        // console.log("segmentAngle = "+(segmentAngle/100));
        // // rotationAngle += 0.
        // console.log("rotationAngle = "+rotationAngle);
        // console.log("round = "+round);
        // check = check+1
        // console.log(`${check} = ${segments.value.length}`);
        
        // if(check == segments.value.length){
        //     checkDivide = checkDivide+0.3
        //     check = 0
        //     roll_check = roll_check+1
        //     console.log("roll_check = "+roll_check);
            
        // }
        // console.log("checkDivide = "+checkDivide);
        
        // sum = sum + rotationAngle
        
        // console.log(`rotationAngle = ${rotationAngle} `);
        // sum = sum + rotationAngle
        // console.log(`sum = ${sum} `);
        // rotationAngle %= 2 * Math.PI;

        // console.log(`${elapsedTime} / ${spinDuration} = ${progress}`);
        // console.log(`easeOut = ${easeOut} `);
        // console.log(`rotationAngles = ${rotationAngle} `);
        // rotationAngle += 4

        drawWheel();

        requestAnimationFrame(spin);
    };

    requestAnimationFrame(spin);
    };
  // ฟังก์ชันแสดงผลรางวัล
  const determineWinner = (number:number) => {
    // กำหนดดัชนีของรางวัลที่ต้องการ (เช่น รางวัลที่สอง)
    // const targetIndex = number; // ดัชนีเริ่มต้นที่ 0

    // คำนวณมุมที่ลูกศรต้องชี้ไปยังรางวัลที่ต้องการ
    // const segmentAngle = (2 * Math.PI) / segments.length;
    // console.log("targetIndex = "+targetIndex);
    // console.log("segmentAngle = "+segmentAngle);
    
    // const targetAngle = segmentAngle * targetIndex;
    // console.log("targetAngle = "+targetAngle);

    // ตั้งค่า rotationAngle ให้ตรงกับมุมที่คำนวณได้
    // rotationAngle = number-1;

    // แสดงรางวัลที่ได้
    showWinner(`คุณได้รางวัล: ${segments.value[number]}`);
    };
  
const resizeCanvas = () => {
    const width = window.innerWidth * 0.8; // 80% ของความกว้างหน้าจอ
    console.log(width);
    
    const size = Math.min(width, 500); // จำกัดความกว้างสูงสุด 500px
    canvasSize.value = size;
    circleRadius.value = size / 12; // ขนาดของวงกลมกลางจะปรับตาม canvas
    const canvas = wheelRef.value;
    
    if (canvas) {
        canvas.width = size;
        canvas.height = size * aspectRatio;
        console.log("ssssss");
        
        drawWheel(); // วาดใหม่หลังจากปรับขนาด
    }
};

  onMounted(() => {
    // resizeCanvas();
    getSettingGame();
    getTransactionSpinWheel();
    drawWheel();
    const canvas = wheelRef.value;
    if (canvas) {
        console.log("aaaaaaaa");
        
        canvas.addEventListener('click', handleCanvasClick);
        canvas.addEventListener('mousemove', handleMouseMove);
    }
  })
  
  definePageMeta({
    layout: 'information'
  })
  </script>
  
  <style scoped>
    .spin-wheel {
        display: block;
        margin: 0 auto;
        border-radius: 50%;
        width: 100%;
        max-width: 500px;
        min-width: 300px;  /* ขนาดขั้นต่ำ */
        min-height: 300px; /* ความสูงขั้นต่ำ */
        height: auto;
    }
    .spin-button {
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
        background-color: #1abc9c;
        color: #fff;
        font-size: 18px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .spin-button:hover {
        background-color: #16a085;
    }
    .spin-text {
        font-size: clamp(10px, 2vw, 14px);  /* ขนาดต่ำสุด 12px, สูงสุด 24px และตาม viewport */
    }
    .text-center{
        text-align: center;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }
    .list{
        background: linear-gradient(#2c002c, #100f4e) !important;
        border-radius: 10px;
        padding: 1rem 1rem;
    }

    .text-12 div{
        font-size: 12px !important;
    }

    .jackpot {
        font-size: 1.5rem;
        font-weight: bold;
        text-transform: uppercase;
        color: #ffd700; /* สีทอง */
        text-shadow: 0 0 10px #ffd700, 0 0 20px #ffa500, 0 0 30px #ff4500;
        transition: transform 0.3s ease;
        cursor: pointer;
    }
    @media screen and (max-width: 1100px) {
        .list-container {
            max-width: 100%;
            overflow-x: auto;
        }
        .list{
            width: 600px;
        }
    }
    @media screen and (max-width: 767px) {
        .list{
            width: 100%;
        }
    }

    @media screen and (max-width: 600px) {
        .list{
            width: 600px;
        }
    }
    /* th {
        background-color: #f4b400;
        color: white;
    }
    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    tr:hover {
        background-color: #f1f1f1;
    }
    .status-online {
        color: green;
        font-weight: bold;
    }
    .status-maintenance {
        color: red;
        font-weight: bold;
    } */
  </style>
  