<!-- src="print.js" -->
<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
//import print from 'print-js';

import contractInput from '../components/contractInput.vue';
import dateInput from '../components/dateInput.vue';
import preview_btn from '../components/preview_btn.vue';
import send_btn from '../components/send_btn.vue';

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
        contractInput,
        dateInput,
        preview_btn,
        send_btn,
    },
    mounted(){
        this.setPage(4)
    }
}
</script >

<template>
<div class="bigArea">
    <h1>新增契約書</h1>
<p>
    <div class="roomInfo">
        <br>
    <h2>租賃物件資訊</h2>
    <br>
    <div class="rent_time">
        <label for="start_time">租賃期間 自：</label>
        <input type="date" id="start" style="font-size: 22px;" min="1970-01-01"max="2050-12-31" />
        <label for="end_time">到：</label>
        <input type="date" id="end" style="font-size: 22px;" min="1970-01-01" max="2050-12-31" />


    </div>

    <br>
    門牌:<contractInput/>
    <br>
    樓層:<contractInput/>
    <br>
    房號:<contractInput/>
    <br>

    
    <br>租金/月: <contractInput/>
    <br>押金: <contractInput/>
    <br>管理費/月:<contractInput/> 
    <br>電費/度: <contractInput/>
    <br>水費/月:<contractInput/> 
    <br>物件備註:
    <div class="input-wrapper">
    <textarea class="input-box" type="textarea" placeholder="Enter your text"></textarea>
    <span class="underline"></span>
</div>
    

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

    <!-- <h3><br>保證人： <contractInput/></h3>
        姓名： <contractInput/>
        <br>
        統一編號(身分證明文件編號)：<contractInput/>
        <br>
        戶籍地址：<contractInput/>
        <br>
        通訊地址：<contractInput/>
        <br>
        聯絡電話：<contractInput/> -->
        

    </div>
    <h3><br>契約中止: </h3>
    <div class="cut"><br>
        中止原因:<contractInput/>
        <br>
        違約金:<contractInput/>
        <br>
        中止日期:<contractInput/>
    </div>
</p>
    <h3><br>其他備註(或個別磋商條款):</h3>
    <div class="input-wrapper">
    <textarea class="input-box" type="textarea" placeholder="Enter your text"></textarea>
    <span class="underline"></span>
</div>
    <h3><br>立約日期:<contractInput/></h3>

    <div class="btn"> 
        <preview_btn class="space-between"/>
        <send_btn class="space-between"/>

</div>
</div>
</template>

<!-- PDF列印按鈕 -->
<!-- <button type="button" onclick="printJS('docs/printjs.pdf')">列印PDF</button> -->
<style scoped lang="scss">

.bigArea{
    width: 40%;
    margin-top:3% ;
    margin-left: 150px;
    font-size: 18px;

    .btn{
        margin-left: 22%;
        margin-bottom: 5%;
        .space-between { 
        margin-right: 30%;
        margin-top: 5%;}
    }
}

.input-wrapper {
    position: relative;
    width: 600px;
    margin: auto;
    }

    .input-box {
    font-size: 20px;
    padding: 10px 0;
    border: none;
    border-bottom: 2px solid #ccc;
    color: #201e1c;
    width: 100%;
    background-color: transparent;
    transition: border-color 0.3s ease-in-out;
    }

    .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #FF9D60;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
    }

    .input-box:focus {
    border-color: #FF9D60;
    outline: none;
    }

    .input-box:focus + .underline {
    transform: scaleX(1);
    }



</style>