<template>
    <h3>ประวัติการทำรายการ</h3>
    <a-flex wrap="wrap">
        <a-col :span="24" class="p-1">
            <div class="table-operations">
                <a-button >ทั้งหมด</a-button>
                <a-button >รายการฝาก</a-button>
                <a-button >รายการถอน</a-button>
            </div>

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
    .table-operations button{
        margin: 0 2px;
    }
</style>