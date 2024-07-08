<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj', 'roomDetail'])
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
    <h4>地址 : {{this.roomDetail.address}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        樓層 : {{this.roomDetail.floor}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        房號 : {{this.roomDetail.roomId}}</h4>
    <h4>租金 : {{this.roomDetail.rentP}}元/月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        押金 : {{this.roomDetail.deposit}}元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        違約金 : {{this.roomDetail.cutP}}元</h4>
    <h4>電費 : {{this.roomDetail.eletricP}}元/度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        水費 : {{this.roomDetail.waterP}}元/月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        管理費 : {{this.roomDetail.manageP}}元/月</h4>
    <h4>坪數 : {{this.roomDetail.acreage}}坪</h4>
    <h4 v-if="this.roomDetail.parking" >車位 : 有</h4>
    <h4 v-else>車位 : 無</h4>
    <h4>物件備註 : {{this.roomDetail.equip}}</h4>
    <h4>特色描述 : {{this.roomDetail.rOther}}</h4>
    </div>
</template>

<style scoped lang="scss">
.bigArea{
width: 80%;
margin: 0 auto;
}
</style>