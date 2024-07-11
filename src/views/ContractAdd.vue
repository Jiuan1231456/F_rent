<!-- src="print.js" -->
<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";

import contractInput from '../components/contractInput.vue';
import preview_btn from '../components/preview_btn.vue';
import send_btn from '../components/send_btn.vue';

export default {
    data() {
        return {
            tenant_identity: "",  
            tenant_name: "",
            tenant_home_address: "",
            tenant_contact_address: "",
            tenant_phone: "",
            tenant_email: "",
            owner_name: "",  //從註冊資訊抓
            owner_identity: "", //從註冊資訊抓
            owner_home_address: "", 
            owner_contact_address: "", 
            owner_phone: "",  //從註冊資訊抓
            start_date: "",
            end_date: "",
            c_other: "",
            sign_date: "",
            cut_reason: "",
            cut_date: "",
            ai:"",
        // 房間資訊抓
            address: "",
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
            r_other: "",

            //////////////////
            loginObj: { // 添加 loginObj 並初始化為空物件
                ownerIdentity: ""
            },
            registerInfo:[]//存放找到的特定註冊資料
    }
},
    computed: {
       //使用pinia中房間站存資訊
       ...mapState(dataStore, ['roomObj','loginObj'])
    },
    created() {
        // this.getRegisterData();
        //this.getRoomData();
         // 從路由參數中獲取房間資訊
        this.roomInfo = this.$route.params.roomInfo;
    },
    mounted() {
       
    },
    methods: {
      
        ...mapActions(dataStore,['setPage','setLoginObj']),
        
        addContractToDB() {
        let testObj = {
            tenantIdentity: this.tenant_identity,  
            tenantName: this.tenant_name,
            tenantHomeAddress: this.tenant_home_address,
            tenantContactAddress: this.tenant_contact_address,
            tenantPhone: this.tenant_phone,
            tenantEmail: this.tenant_email,
            ownerName: this.loginObj.ownerName, //從註冊資訊抓
            ownerIdentity: this.loginObj.ownerIdentity, //從註冊資訊抓
            ownerHomeAddress: this.owner_home_address, 
            ownerContactAddress: this.owner_contact_address, 
            ownerPhone: this.loginObj.ownerPhone, //契約的表沒有這個欄位，要從註冊抓，但我建議再SQL新增這個欄位，因為房東可能想註冊的電話跟連絡他的電話不一樣
            startDate: this.start_date,
            endDate: this.end_date,
            cOther: this.c_other,
            signDate: this.sign_date,
            cutReason: this.cut_reason,
            cutDate: this.cut_date,
            ai:this.ai,
            //從房間抓
            address: this.roomObj.address,
            floor: this.roomObj.floor,
            roomId: this.roomObj.roomId,
            rentP: this.roomObj.rentP,
            deposit: this.roomObj.deposit,
            cutP: this.roomObj.cutP,
            eletricP: this.roomObj.eletricP,
            waterP: this.roomObj.waterP,
            manageP: this.roomObj.manageP,
            acreage: this.roomObj.acreage,
            parking: this.roomObj.parking,
            equip: this.roomObj.equip,
            rOther: this.roomObj.rOther,
        
        };
        fetch("http://localhost:8080/contract/createContract", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(testObj)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
        },
    //     //連接註冊資料庫資料
    //     findCutDate(){
    //   let empty = {};
    //   fetch("http://localhost:8080/rent/account", {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(empty),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       this.registerInfo = data.register.filter(
    //         (item) => (item.ownerName === this.register.ownerName) && (item.ownerIdentity === this.perRegister.ownerIdentity) && (item.ownerPhone === this.perRegister.ownerPhone)
    //       );
    //       console.log("篩出此筆租約與註冊相關資料",this.registerInfo[0]);
    //       this. 這邊要去pinia創造一個將註冊資訊存到契約的地方(this.registerInfo[0]);
    //     });
    // }
    },
    
    components:{
        contractInput,
        preview_btn,
        send_btn,
    },
};
</script>

<template>
    <div class="areaMom">
        <h1>新增契約書</h1>
        <div class="area">
            <div class="bigArea">
                
                <br>
                <div class="roomInfo">
                    <h2>租賃物件資訊</h2>
                    <br>
                    <div class="rent_time">
                    <label for="start_time">租賃期間 自：</label>
                    <input type="date" id="start" style="font-size: 22px;" min="1970-01-01" max="2050-12-31" v-model="start_date"/>
                    <label for="end_time">到：</label>
                    <input type="date" id="end" style="font-size: 22px;" min="1970-01-01" max="2050-12-31" v-model="end_date" />
                    </div>
                    <br>
                    租賃物件地址: <p>{{ roomObj.address }}</p>
                    <br>
                    樓層:<p>{{ roomObj.floor }}</p>
                    <br>
                    <!-- 這邊的rId是小徐的，創建完後才會變成我的roomId -->
                    房號:<p>{{ roomObj.roomId }}</p>
                    <br>
                    租金/月:<p>{{roomObj.rentP }} </p>
                    <br>
                    押金: <p>{{ roomObj.deposit }}</p>
                    <br>
                    管理費/月:<p>{{roomObj.manageP}}</p>
                    <br>
                    電費/度: <p>{{ roomObj.eletricP }}</p>
                    <br>
                    水費/月:<p>{{ roomObj.waterP }} </p>
                    <br>
                    面積: <p>{{ roomObj.acreage }}</p>
                    <br>
                    車位:<p>{{roomObj.parking}}</p>
                    <br>
                    設備:<p>{{ roomObj.equip }}</p>
                    <br>
                    物件備註:<p>{{ roomObj.rOther }}</p>
                    
                    </div>
                </div>

                <div class="line">
                
                </div>
            <div class="bigArea2">
                <h2>立契約書人</h2>
                <div class="Info">
                    <br>
                    <h4>出租人姓名:</h4> <p>{{loginObj.ownerName}}</p>
                    <br>
                    身分證字號: <p> {{loginObj.ownerIdentity}}</p>
                    <br>
                    戶籍地址(營業登記地址): <input type="text" v-model="owner_home_address" class="input-box">
                    <br>
                    通訊地址: <input type="text" v-model="owner_contact_address" class="input-box">
                    <br>
                    <!-- 這邊房東電話不建議寫死，因為註冊電話應該可以和連絡電話不一樣，，建議再器樂的SQL表另外新增owner_phone欄位而不是直接引用註冊的電話 -->
                    連絡電話:{{ loginObj.ownerPhone }}
                    <br>
                    <br>
                    <h4>承租人姓名:</h4> <input type="text" v-model="tenant_name" class="input-box" style="font-weight: bold; font-size: 20px;">
                    <br>
                    身分證字號: <input type="text" v-model="tenant_identity" class="input-box">
                    <br>
                    戶籍地址(營業登記地址): <input type="text" v-model="tenant_home_address" class="input-box">
                    <br>
                    通訊地址: <input type="text" v-model="tenant_contact_address" class="input-box">
                    <br>
                    email: <input type="text" v-model="tenant_email" class="input-box">
                    <br>
                    連絡電話: <input type="text" v-model="tenant_phone" class="input-box">
                </div>
                <br>
                <h3>契約中止</h3>
                <div class="cut">
                    <br>
                    中止原因: <input type="text" v-model="cut_reason" class="input-box">
                    <br>
                    違約金: <input type="text" v-model="cut_p" class="input-box">
                    <br>
                    中止日期: <input type="text" v-model="cut_date" class="input-box">
                </div>
                <br>
                <h3>其他備註(或個別磋商條款)</h3>
                <div class="input-wrapper">
                    <textarea class="input-box" type="textarea" placeholder="Enter your text" v-model="c_other"></textarea>
                    <span class="underline"></span>
                </div>
                <br>
                <h3>立約日期:  <input type="date" id="start" style="font-size: 22px;" min="1970-01-01" max="2050-12-31" v-model="sign_date"/></h3>

            
                <div class="btn"> 
                
                    <send_btn class="space-between" @click="addContractToDB"/>
                </div>
            </div>
        </div>
    </div>


</template>
  
  <style scoped lang="scss">

.areaMom{
    width: 100%;
        .area{
            width: 100%;
            display: flex;
            
            //物件資訊
            .bigArea {
                width: 40%;
                margin-top: 3%;
                margin-left: 15%;
                font-size: 22px;
            }
                
            
            //垂直分隔線
            .line{
                border-left: 2px dashed rgb(223, 189, 140);
                height:300%;
                margin-top: 8%;
                left: 55%;
                position: absolute;
            }
            // 立契約書人
            .bigArea2{
                width: 40%;
                margin-top: 2%;
                padding: 3%;
                font-size: 18px   
            }
        
    }
    
}

//送出預覽按鈕
.btn{
        margin-right: 0%;
        margin-bottom: 5%;
        display: flex;
        .space-between { 
        margin-right: 30%;
        margin-top: 5%;}
    }

  
  .input-box {
    width: 600px;
    font-size: 20px;
    padding: 10px 0;
    border: none;
    border-bottom: 2px solid #ccc;
    color: #0f0f0f;
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
  
    &:focus {
      border-color: #FF9D60;
      outline: none;
    }
  
    &:focus + .underline {
      transform: scaleX(1);
    }
  }
  </style>
  
<!-- PDF列印按鈕 -->
<!-- <button type="button" onclick="printJS('docs/printjs.pdf')">列印PDF</button> -->
<style scoped lang="scss">



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