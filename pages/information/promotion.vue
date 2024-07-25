<template>
    <h3>โปรโมชั่น</h3>
    <a-flex class="p-1">
        <a-col :span="12" :sm="8" :xl="6" class="m-1" v-for="v in promotion">
            <a-image
                :src="v.image"
            />
        </a-col>
    </a-flex>
</template>
<script setup lang="ts">
    import { getPromotionServices } from "~/services/promotion";
    import type  { Promotion } from "~/services/promotion";
    const promotion = ref<Promotion[]>([]);
    
    const getPromotion = async() =>{
        var data = await getPromotionServices();
        if(data.status = 'success'){
            promotion.value = data.data
        }else{

        }
    }

    onMounted(()=>{
        getPromotion();
    })

    definePageMeta({
        layout: 'information'
    })

</script>