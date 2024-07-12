<template>
    <h3>คืนยอดเสีย</h3>
    <a-flex wrap="wrap">
        <a-col :span="24" :xl="12" class="p-1">
            <a-col :span="24" class="m-1">
                <div class="m-1 info-withdrow-list">
                    <div class="info-withdrow-title">โบนัสยอดเสีย</div>
                    <div class="info-withdrow-amount-title my-1">เครดิต</div>
                    <div class="info-withdrow-amount center my-1"> 0.00</div>
                    <a-col :span="24">
                        <div class="info-bank-coppy center my-2">
                            <DollarCircleOutlined /> รับโบนัส
                        </div>
                    </a-col>
                </div>
            </a-col>
            <div class="detail center">
                <p>
                    - เครดิตโปรโมชั่นและแต้มสะสมจะไม่ถูกนำมาคำนวน                                                           
                </p>
                <p>
                    - รับโบนัสคืนเครดิตได้วันละครั้งเท่านั้น                                                                                                              
                </p>
                <p>
                    - โบนัสยอดคืนจะเป็นยอดคืน วันต่อวัน                                                                                                   
                </p>
                <p>
                    - โบนัสวันก่อนจะไม่ถูกมาคำนวณในวันนี้                                                                                                        
                </p>
                <p>
                    - โบนัสยอดคืนจะถูกรีเซ็ตเที่ยงคืนของทุกวัน                                                        
                </p>
                <p class="mb-3 text-danger">
                    -* กรุณามากดรับเครดิตคืนเวลา 23:59 น. เพื่อให้ได้รับเครดิตสูงสุด *                                                
                </p>
            </div>
        </a-col>
        <a-col :span="24" :xl="12" class="p-1">
            <a-table
                class="m-1"
                :columns="columns"
                :data-source="data"
                :scroll="{ y: 600 }"
            />
        </a-col>
    </a-flex>
</template>
<script setup lang="ts">
    definePageMeta({
    layout: 'information'
    })

    const columns = [
        {
            title: 'วันที่', dataIndex: 'name',width: 150,
        },
        {
            title: 'ประเทศ',dataIndex: 'age', width: 150,
        },
        {
            title: 'จำนวนยอดคืน',dataIndex: 'address',
        },
        ];

        const data = [...Array(10)].map((_, i) => ({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        }));
</script>
<style scoped>
    .info-withdrow-list{
        background: linear-gradient(#2c002c, #100f4e) !important;
        border-radius: 10px;
        padding: 1rem 2rem;
    }
    .info-withdrow-title{
        font-size: 16px;
    }
    .info-withdrow-amount{
        font-size: 18px;
    }
</style>