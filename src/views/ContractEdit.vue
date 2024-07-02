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

    門牌:<contractInput/>
    <br>
    樓層:<contractInput/>
    <br>
    房號:<contractInput/>
    <br>
    車位:<contractInput/>
    
    <h3><br>租賃期間: 自_____起至_____止</h3>
    <h3><br>租金/月: <contractInput/></h3>
    <h3><br>押金: <contractInput/></h3>
    <h3><br>管理費/月:<contractInput/> </h3>
    <h3><br>電費/度: <contractInput/></h3>
    <h3><br>水費/月:<contractInput/> </h3>

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

    </div>

    <div class="cut">
        中止原因:<contractInput/>
        <br>
        違約金:<contractInput/>
        <br>
        中止日期:<contractInput/>

    </div>
</p>
<h3><br>立約日期:_____________________</h3>

</div>
</template>

<style scoped lang="scss">

.bigArea{
    margin-top:3% ;
    margin-left: 100px;
}


.InputContainer {
        width: 620px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to bottom, #FF9D60, rgb(255, 231, 231));
        border-radius: 30px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 2px 2px 10px rgba(163, 162, 162, 0.075);
        display: inline-block;
        vertical-align: middle; /* Optional: Align vertically */
        // flex: 1; /* 彈性增長，使 input 容器占據剩餘空間 */
    }

    .input {
        width: 600px;
        height: 40px;
        caret-color: rgb(255, 81, 0);
        background-color: rgb(255, 255, 255);
        border-radius: 30px;
        padding-left: 15px;
        letter-spacing: 0.8px;
        color: rgb(19, 19, 19);
        font-size: 22px;
    }

</style>