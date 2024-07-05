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
    地址:<input type="text" v-model="this.address">
    <contractInput v-model:="this.address"/>
    <br>
    樓層:<input type="text" v-model="this.floor">
    <contractInput v-model="this.floor"/>
    <br>
    房號:<input type="text" v-model="this.roomId">
    <contractInput v-model="this.rId"/>
    <br>

    
    <br>租金/月: <input type="text" v-model="this.rentP"><contractInput v-model="this.rentP"/>
    <br>押金: <input type="text" v-model="this.deposit"><contractInput v-model="this.deposit"/>
    <br>管理費/月:<input type="text" v-model="this.manageP"><contractInput v-model="this.manageP"/> 
    <br>電費/度: <input type="text" v-model="this.eletricP"><contractInput  v-model="this.eletricP"/>
    <br>水費/月:<input type="text" v-model="this.waterP"><contractInput v-model="waterP"/> 
    <br>面積:<input type="text" v-model="this.acreage"><contractInput v-model="this.acreage"/>
    <br>物件備註:
    <div class="input-wrapper">
    <textarea class="input-box" type="textarea" placeholder="Enter your text" v-model="this.r_other"></textarea>
    <span class="underline"></span>
</div>
    

    </div>


    <h2><br>立契約書人</h2>
    <h3><br>
        出租人姓名: <input type="text" v-model="this.ownerName">
        <contractInput v-model="this.ownerName"/>
    </h3>
    <div class="Info">
        身分證字號:<input type="text" v-model="this.ownerIdentity">
        <contractInput v-model="this.ownerIdentity"/>
        <br>
        戶籍地址(營業登記地址):<input type="text" v-model="this.ownerHomeAddress">
        <contractInput v-model="this.ownerHomeAddress"/>
        <br>
        通訊地址:<input type="text" v-model="this.ownerContactAddress">
        <contractInput v-model="this.ownerContactAddress"/>
        <br>
        連絡電話:<input type="text" v-model="this.tenantName">
        <contractInput v-model="this.ownerPhone"/>
    
    <h3>
        <br>
        承租人姓名: 
        <input type="text" v-model="this.tenantName">
        <!-- <contractInput @sendRequest="test"/> -->
        <!-- 承租人姓名: <contractInput v-model="this.tenantName"/> -->
    </h3>

        身分證字號:<input type="text" v-model="this.tenantIdentity">
        <contractInput v-model="this.tenantIdentity"/>
        <br>
        戶籍地址(營業登記地址):<input type="text" v-model="this.tenantHomeAddress">
        <contractInput v-model="this.tenantHomeAddress"/>
        <br>
        通訊地址:<input type="text" v-model="this.tenantContactAddress ">
        <contractInput v-model="this.tenantContactAddress"/>
        <br>
        email:<input type="text" v-model="this.tenantEmail">
        <contractInput v-model="this.tenantEmail"/>
        <br>
        連絡電話:<input type="text" v-model="this.tenantPhone">
        <contractInput v-model="this.tenantPhone"/>

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
        中止原因:<contractInput  v-model="this.cutReason"/>
        <br>
        違約金:<contractInput v-model="this.cutP"/>
        <br>
        中止日期:<contractInput v-model="this.cutDate"/>
    </div>
</p>
    <h3><br>其他備註(或個別磋商條款):</h3>
    <div class="input-wrapper">
    <textarea class="input-box" type="textarea" placeholder="Enter your text" v-model="cOther"></textarea>
    <span class="underline"></span>
</div>
    <h3><br>立約日期:<input type="text" v-model="this.signDate">
        <contractInput v-model="this.signDate" /></h3>

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