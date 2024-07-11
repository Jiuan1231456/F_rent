<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj', 'roomObj'])
    },
    methods: {
        ...mapActions(dataStore, ['setPage']),
    },
    mounted() {
        this.setPage(5)
    }
}
</script>

<template>
<div class="bigArea">
    <h1>房間詳細資訊</h1>
    <h4>地址 : {{roomObj.address}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        樓層 : {{this.roomObj.floor}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        房號 : {{this.roomObj.roomId}}</h4>
    <h4>租金 : {{this.roomObj.rentP}}元/月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        押金 : {{this.roomObj.deposit}}元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        違約金 : {{this.roomObj.cutP}}元</h4>
    <h4>電費 : {{this.roomObj.eletricP}}元/度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        水費 : {{this.roomObj.waterP}}元/月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        管理費 : {{this.roomObj.manageP}}元/月</h4>
    <h4>坪數 : {{this.roomObj.acreage}}坪</h4>
    <h4 v-if="this.roomObj.parking" >車位 : 有</h4>
    <h4 v-else>車位 : 無</h4>
    <h4>物件備註 : {{this.roomObj.equip}}</h4>
    <h4>特色描述 : {{this.roomObj.rOther}}</h4>
    <div v-if="this.roomObj.photo"> 
                        <img :src="'data:image/jpeg;base64,' + this.roomObj.photo" alt="Image">
                    </div>
    </div>
</template>

<style scoped lang="scss">
.bigArea{
width: 80%;
margin: 0 auto;
}
</style>