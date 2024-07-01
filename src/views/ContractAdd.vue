<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";

import contractInput from '../components/contractInput.vue';
export default {
    data(){
        return {

        }
    },
    computed: {
        ...mapState(dataStore, ['page'])
    },
    methods: {
        ...mapActions(dataStore,['setPage'])
    },
    components:{
        contractInput
    },
    mounted(){
        this.setPage(4)
    }
}
</script>

<template>
<div class="bigArea">
    <h1>新增契約書</h1>
<p>
    <div class="roomInfo">
        <br>
    <h2>租賃標的</h2>

    門牌:
    <br>
    樓層:
    <br>
    房號:
    <br>
    車位:
    
    <h3><br>租賃期間: 自民國_____年___月___日起至民國_____年___月___日止</h3>
    <h3><br>租金/月: </h3>
    <h3><br>管理費/月: </h3>
    <h3><br>電費/度: </h3>
    <h3><br>水費/月: </h3>

    </div>


    <h2><br>立契約書人</h2>
    <h3><br>
        出租人姓名: <contractInput/>
    </h3>
    <div class="Info">
        身分證字號:<contractInput/>
        <br>
        戶籍地址(營業登記地址):<contractInput/>
        <br>
        通訊地址:<contractInput/>
        <br>
        連絡電話:<contractInput/>
       
    <h3>
        <br>
        承租人姓名: <contractInput/>
    </h3>

        身分證字號:<contractInput/>
        <br>
        戶籍地址(營業登記地址):<contractInput/>
        <br>
        通訊地址:<contractInput/>
        <br>
        連絡電話:<contractInput/>

    <h3><br>保證人：</h3>
        姓名： <contractInput/>
        <br>
        統一編號(身分證明文件編號)：<contractInput/>
        <br>
        戶籍地址：<contractInput/>
        <br>
        通訊地址：<contractInput/>
        <br>
        聯絡電話：<contractInput/>

    </div>
</p>
<h3><br>立約日期:民國_______年_____月_____日</h3>

</div>
</template>

<style scoped lang="scss">

.bigArea{
    margin-top:3% ;
    margin-left: 100px;
}
</style>