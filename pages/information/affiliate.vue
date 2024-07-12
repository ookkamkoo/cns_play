<template>
    <h3>เเนะนำเพื่อน</h3>
    <a-flex class="p-1" :align="'center'" :justify="'center'" wrap="wrap">
        <a-col :span="24" :md="24" :lg="9">
            <label for="username" class="mx-1">รหัสเเนะนำเพื่อน</label>
            <a-input-group compact class="coppy-link">
                <a-input v-model:value="formState.username" style="width: calc(100% - 40px); border-radius: 6px 0 0 6px ;" />
                <a-tooltip title="copy link">
                    <a-button>
                    <template #icon><CopyOutlined /></template>
                    </a-button>
                </a-tooltip>
            </a-input-group>
        </a-col>
        <a-col :span="24" :md="24" :lg="4">
            <div class="m-1 info-withdrow-list">
                <div class="info-withdrow-title">จำนวณคนที่เชิญ</div>
                <div class="info-withdrow-amount-title my-1">ทั้งหมด</div>
                <div class="info-withdrow-amount center my-1"> 0.00</div>
            </div>
        </a-col>
        <a-col :span="24" :md="24" :lg="4">
            <div class="m-1 info-withdrow-list">
                <div class="info-withdrow-title">รายได้รวม</div>
                <div class="info-withdrow-amount-title my-1">ทั้งหมด</div>
                <div class="info-withdrow-amount center my-1"> 0.00</div>
            </div>
        </a-col>
    </a-flex>
    <a-flex class="p-1" :justify="'center'" wrap="wrap">
        <a-col :span="24" :lg="12">
            <h3>เงื่อนไขในการรับโบนัสแนะนำเพื่อน</h3>
            <div class="m-1 info-withdrow-list">
                <div class="info-withdrow-title">รายได้รวม</div>
                <div class="info-withdrow-amount-title my-1">ทั้งหมด</div>
                <div class="info-withdrow-amount center my-1"> 0.00</div>
                <a-col :span="24">
                    <div class="info-bank-coppy center my-2">
                        <CopyOutlined /> รับโบนัส
                    </div>
                </a-col>
            </div>
            <div class="center">
                <h3>โบนัสแนะนำเพื่อน 0.50%  จาก สมาชิกที่เสีย</h3>
                <p>
                    1.ระบบจะสะสมยอดโบนัส เวลาเที่ยงคืนของทุกวัน
                </p>
                <p>
                    2.หลังจากรับโบนัสแล้ว ยอดโบนัสของเพื่อนจะถูกสะสมใหม่
                </p>
                <p>
                    3.เพื่อนคนไหนที่ไม่มียอดโบนัส แสดงว่าเพื่อนคนนั้นไม่เข้าเงื่อนไขตามวิธีคำนวณด้านล่างนี้                                         
                </p>
                <hr>
                <h3>* วิธีคำนวณ *</h3>
                <p>
                    จะคำนวณดังนี้ เช่น โบนัสแนะนำเพื่อน 5% คนที่ 1 เสีย 100 , คนที่ 2 ได้ 100 คนที่ 2 จะไม่ถูกคำนวณ ระบบจะนับรวมเป็น 100 คิดเป็นเปอเซ็น 5% = 5฿
                </p>
            </div>
        </a-col>
        <a-col :span="24" :lg="12">
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

    const formState = reactive<any>({
        username: 'asdsd',
        password: 'sdsdsdsd',
        remember: true,
    });

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
.profile label{
    color: whitesmoke !important;
}
.label-title{
    width: 20%;
    min-width: 100px;
    max-width: 100px;
}
.input-value{
    width: 100%;
}
.read-only{
    cursor: not-allowed;
    background-color: rgb(199, 199, 199);
}
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
.coppy-link{
    text-align: center;
}
</style>