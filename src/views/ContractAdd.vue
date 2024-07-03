<!-- src="print.js" -->
<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
//import print from 'print-js';

import contractInput from '../components/contractInput.vue';
import preview_btn from '../components/preview_btn.vue';
import send_btn from '../components/send_btn.vue';

export default {
    data(){
        return {
            tenant_identity:"",  
            tenant_name:"",
            tenant_home_address:"",
            tenant_contact_address:"",
            tenant_phone:"",
            tenant_email:"",
            owner_name:"",//從註冊資訊抓
            owner_identity:"", //從註冊資訊抓
            owner_home_address:"",//從註冊資訊抓
            owner_contact_address:"",//從註冊資訊抓
            owner_phone:"",//從註冊資訊抓
            start_date:"",
            end_date:"",
            c_other:"",
            sign_date:"",
            cut_reason:"",
            cut_date:"",
            //===================================================
             //房間資訊抓
            address:"",
            floor: "",
            r_id: "",
            rent_p: "",
            deposit: "",
            cut_p: "",
            eletric_p: "",
            water_p: "",
            manage_p: "",
            acreage: "",
            parking: false,
            equip: "",
            r_other:""

        }
    },
    computed: {
        ...mapState(dataStore, ['page'])
    },
    methods: {
        // test(paramFromSon){
        //     this.tenantName = paramFromSon;
        //     console.log(this.tenantName);
        // },
        ...mapActions(dataStore,['setPage']),
        addContractToDB(){
            // console.log(this.tenantName);
            // return;
            let testObj={
            tenantIdentity:this.tenantIdentity,  
            tenantName:this.tenantName,
            tenantHomeAddress:this.tenantHomeAddress,
            tenantContactAddress:this.tenantContactAddress,
            tenantPhone:this.tenantPhone,
            tenantEmail:this.tenantEmail,
            ownerName:this.ownerName,//從註冊資訊抓
            ownerIdentity:this.ownerIdentity, //從註冊資訊抓
            ownerHomeAddress:this.ownerHomeAddress,//從註冊資訊抓
            ownerContactAddress:this.ownerContactAddress,//從註冊資訊抓
            ownerPhone:this.ownerPhone,//從註冊資訊抓
            startDate:this.startDate,
            endDate:this.endDate,
            cOther:this.cOther,
            signDate:this.signDate,
            cutReason:this.cutReason,
            cutDate:this.cutDate,
            ///從房間抓
            address: this.address,
            floor: this.floor,
            roomId: this.roomId, //我的在java中的req檔是roomId，小徐的是rId，這邊先用小徐的
            rentP: this.rentP,
            deposit: this.deposit,
            cutP: this.cutP,
            eletricP: this.eletricP,
            waterP: this.waterP,
            manageP: this.manageP,
            acreage: this.acreage,
            parking: this.parking,
            equip: this.equip,
            signDate:this.signDate,
            rOther:this.r_other

            }
            fetch("http://localhost:8080/contract/createContract", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(testObj)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
            }
        },
    components:{
        contractInput,
        // dateInput,
        preview_btn,
        send_btn,
    },
    mounted(){
        this.setPage(7)
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
        <input type="date" id="start" style="font-size: 22px;" min="1970-01-01"max="2050-12-31" v-model="this.startDate"/>
        <label for="end_time">到：</label>
        <input type="date" id="end" style="font-size: 22px;" min="1970-01-01" max="2050-12-31" v-model="this.endDate" />


    </div>

    <br>
    租賃物件地址:<input type="text" v-model="this.address" class="input-box">
    
    <br>
    樓層:<input type="text" v-model="this.floor" class="input-box">
   
    <br>
    房號:<input type="text" v-model="this.roomId" class="input-box">

    <br>

    
    <br>租金/月: <input type="text" v-model="this.rentP" class="input-box">
    <br>押金: <input type="text" v-model="this.deposit" class="input-box">
    <br>管理費/月:<input type="text" v-model="this.manageP" class="input-box">
    <br>電費/度: <input type="text" v-model="this.eletricP" class="input-box">
    <br>水費/月:<input type="text" v-model="this.waterP" class="input-box">
    <br>面積:<input type="text" v-model="this.acreage" class="input-box">
    <br>物件備註:
    <div class="input-wrapper">
    <textarea class="input-box" type="textarea" placeholder="Enter your text" v-model="this.r_other"></textarea>
    <span class="underline"></span>
</div>
    

    </div>


    <h2><br>立契約書人</h2>
    <h3><br>
        出租人姓名: <input type="text" v-model="this.ownerName" class="input-box" >
       
    </h3>
    <div class="Info">
        身分證字號:<input type="text" v-model="this.ownerIdentitye" class="input-box">
        
        <br>
        戶籍地址(營業登記地址):<input type="text" v-model="this.ownerHomeAddress" class="input-box">
      
        <br>
        通訊地址:<input type="text" v-model="this.ownerContactAddress" class="input-box">
       
        <br>
        連絡電話:<input type="text" v-model="this.tenantName" class="input-box">
        
    
    <h3>
        <br>
        承租人姓名: 
        <input type="text" v-model="this.tenantName" class="input-box">
        <!-- <contractInput @sendRequest="test"/> -->
        <!-- 承租人姓名: <contractInput v-model="this.tenantName"/> -->
    </h3>

        身分證字號:<input type="text" v-model="this.tenantIdentity" class="input-box">
     
        <br>
        戶籍地址(營業登記地址):<input type="text" v-model="this.tenantHomeAddress" class="input-box">
 
        <br>
        通訊地址:<input type="text" v-model="this.tenantContactAddress " class="input-box">
       
        <br>
        email:<input type="text" v-model="this.tenantEmail" class="input-box">
     
        <br>
        連絡電話:<input type="text" v-model="this.tenantPhone" class="input-box">
        

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
        中止原因:<input type="text" v-model="this.cutReason" class="input-box">
        <br>
        違約金:<input type="text" v-model="this.cutP" class="input-box">
        <br>
        中止日期:<input type="text" v-model="this.cutDate" class="input-box">
    </div>
</p>
    <h3><br>其他備註(或個別磋商條款):</h3>
    <div class="input-wrapper">
    <textarea class="input-box" type="textarea" placeholder="Enter your text" v-model="cOther" ></textarea>
    <span class="underline"></span>
</div>
    <h3><br>立約日期:<input type="date" id="start" style="font-size: 22px;" min="1970-01-01"max="2050-12-31" v-model="this.signDate"/>
        </h3>

    <div class="btn"> 
        <preview_btn class="space-between"/>

        <send_btn class="space-between" @click="addContractToDB"/>
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
        display: flex;
        .space-between { 
        margin-right: 30%;
        margin-top: 5%;}
    }
}

.input-box {
    width: 600px;
    font-size: 20px;
    padding: 10px 0;
    border: none;
    border-bottom: 2px solid #ccc;
    color: #0f0f0f;
    width: 100%;
    background-color: transparent;
    transition: border-color 0.3s ease-in-out;
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
}



</style>