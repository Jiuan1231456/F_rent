<!-- src="print.js" --><script>
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
            owner_home_address: "", //從註冊資訊抓
            owner_contact_address: "", //從註冊資訊抓
            owner_phone: "",  //從註冊資訊抓
            start_date: "",
            end_date: "",
            c_other: "",
            sign_date: "",
            cut_reason: "",
            cut_date: "",
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
            r_other: ""
    }
},
    computed: {
        ...mapState(dataStore, ['page'])
    },
    created() {
        this.getRegisterData();
        this.getRoomData();
         // 從路由參數中獲取房間資訊
        this.roomInfo = this.$route.params.roomInfo;
    },
    mounted() {
        this.setPage(7);
    },
    methods: {
        ...mapActions(dataStore, ['setPage']),
        async getRegisterData() {
        try {
            const response = await fetch('http://localhost:8080/rent/account');
            const data = await response.json();
            // 假設 API 返回的資料是這樣的結構: { owner_name: '...', owner_phone: '...', owner_email: '...' }
            this.owner_name = data.owner_name;
            this.owner_phone = data.owner_phone;
            this.owner_email = data.owner_email;
        } catch (error) {
            console.error('Error fetching register data:', error);
        }
        },
        async getRoomData() {
        try {
            const response = await fetch('http://localhost:8080/room/creatRoom1');
            const data = await response.json();
            // 假設 API 返回的資料是這樣的結構: { r_id: '...', address: '...', rent_p: '...' }
            this.r_id = data.r_id;
            this.address = data.address;
            this.rent_p = data.rent_p;
        } catch (error) {
            console.error('Error fetching room data:', error);
        }
        },
        addContractToDB() {
        let testObj = {
            tenantIdentity: this.tenant_identity,  
            tenantName: this.tenant_name,
            tenantHomeAddress: this.tenant_home_address,
            tenantContactAddress: this.tenant_contact_address,
            tenantPhone: this.tenant_phone,
            tenantEmail: this.tenant_email,
            ownerName: this.owner_name, //從註冊資訊抓
            ownerIdentity: this.owner_identity, //從註冊資訊抓
            ownerHomeAddress: this.owner_home_address, //從註冊資訊抓
            ownerContactAddress: this.owner_contact_address, //從註冊資訊抓
            ownerPhone: this.owner_phone, //從註冊資訊抓
            startDate: this.start_date,
            endDate: this.end_date,
            cOther: this.c_other,
            signDate: this.sign_date,
            cutReason: this.cut_reason,
            cutDate: this.cut_date,
            //從房間抓
            address: this.address,
            floor: this.floor,
            roomId: this.r_id,
            rentP: this.rent_p,
            deposit: this.deposit,
            cutP: this.cut_p,
            eletricP: this.eletric_p,
            waterP: this.water_p,
            manageP: this.manage_p,
            acreage: this.acreage,
            parking: this.parking,
            equip: this.equip,
            signDate: this.sign_date,
            rOther: this.r_other
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
        }
    },
    components: {
        contractInput,
        preview_btn,
        send_btn,
    },
};
</script>

<template>
    <div class="bigArea">
        <h1>新增契約書</h1>
        <div class="roomInfo">
            <h2>租賃物件資訊</h2>
            <div class="rent_time">
            <label for="start_time">租賃期間 自：</label>
            <input type="date" id="start" style="font-size: 22px;" min="1970-01-01" max="2050-12-31" v-model="start_date"/>
            <label for="end_time">到：</label>
            <input type="date" id="end" style="font-size: 22px;" min="1970-01-01" max="2050-12-31" v-model="end_date" />
            </div>
            <br>
            租賃物件地址: <input type="text" v-model="address" class="input-box">
            <br>
            樓層: <input type="text" v-model="floor" class="input-box">
            <br>
            房號: <input type="text" v-model="r_id" class="input-box">
            <br>
            租金/月: <input type="text" v-model="rent_p" class="input-box">
            <br>
            押金: <input type="text" v-model="deposit" class="input-box">
            <br>
            管理費/月: <input type="text" v-model="manage_p" class="input-box">
            <br>
            電費/度: <input type="text" v-model="eletric_p" class="input-box">
            <br>
            水費/月: <input type="text" v-model="water_p" class="input-box">
            <br>
            面積: <input type="text" v-model="acreage" class="input-box">
            <br>
            物件備註:
            <div class="input-wrapper">
            <textarea class="input-box" type="textarea" placeholder="Enter your text" v-model="r_other"></textarea>
            <span class="underline"></span>
            </div>
        </div>
    
        <h2>立契約書人</h2>
        <div class="Info">
            出租人姓名: <input type="text" v-model="owner_name" class="input-box">
            <br>
            身分證字號: <input type="text" v-model="owner_identity" class="input-box">
            <br>
            戶籍地址(營業登記地址): <input type="text" v-model="owner_home_address" class="input-box">
            <br>
            通訊地址: <input type="text" v-model="owner_contact_address" class="input-box">
            <br>
            連絡電話: <input type="text" v-model="owner_phone" class="input-box">
            <br>
            承租人姓名: <input type="text" v-model="tenant_name" class="input-box">
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
    
        <h3>契約中止</h3>
        <div class="cut">
            <br>
            中止原因: <input type="text" v-model="cut_reason" class="input-box">
            <br>
            違約金: <input type="text" v-model="cut_p" class="input-box">
            <br>
            中止日期: <input type="text" v-model="cut_date" class="input-box">
        </div>
    
        <h3>其他備註(或個別磋商條款)</h3>
        <div class="input-wrapper">
            <textarea class="input-box" type="textarea" placeholder="Enter your text" v-model="c_other"></textarea>
            <span class="underline"></span>
        </div>
    
        <h3>立約日期:</h3>
        <input type="date" id="sign_date" style="font-size: 22px;" min="1970-01-01" max="2050-12-31" v-model="sign_date"/>
    
        <div class="btn"> 
            <preview_btn class="space-between"/>
            <send_btn class="space-between" @click="addContractToDB"/>
        </div>
    </div>
  </template>
  
  <style scoped lang="scss">
  .bigArea {
    width: 40%;
    margin-top: 3%;
    margin-left: 150px;
    font-size: 18px;
  
    .btn {
      margin-left: 22%;
      margin-bottom: 5%;
      display: flex;
      .space-between { 
        margin-right: 30%;
        margin-top: 5%;
      }
    }
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