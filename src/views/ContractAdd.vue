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
    }
},
    computed: {
       //使用pinia中房間站存資訊
       ...mapState(dataStore, ['roomObj'])
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
        ...mapActions(dataStore,['setPage']),
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
            ai:this.ai,
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
            rOther: this.r_other,
           
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
                    <h4>出租人姓名:</h4> <input type="text" v-model="owner_name" class="input-box"  style="font-weight: bold; font-size: 20px;">
                    <br>
                    身分證字號: <input type="text" v-model="owner_identity" class="input-box">
                    <br>
                    戶籍地址(營業登記地址): <input type="text" v-model="owner_home_address" class="input-box">
                    <br>
                    通訊地址: <input type="text" v-model="owner_contact_address" class="input-box">
                    <br>
                    連絡電話: <input type="text" v-model="owner_phone" class="input-box">
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
                <h3>立約日期:</h3>
                <input type="date" id="sign_date" style="font-size: 22px;" min="1970-01-01" max="2050-12-31" v-model="sign_date"/>
            
                <div class="btn"> 
                
                    <send_btn class="space-between" @click="addContractToDB"/>
                </div>
            </div>
        </div>
    </div>
<!-- 
<div class="bigArea3">
        <h1>定型化契約條款</h1>

        <div class="lawcontent">
            <br>
        <p>
        第一條 使用租賃住宅之限制
        <br>
        本租賃住宅係供居住使用，承租人不得變更用途。
        承租人同意遵守公寓大廈規約或其他住戶應遵行事項，不得違法使
        用、存放有爆炸性或易燃性物品。
        承租人應經出租人同意始得將本租賃住宅之全部或一部分轉租、出
        借或以其他方式供他人使用，或將租賃權轉讓於他人。
        前項出租人同意轉租者，應出具同意書(如附件二)載明同意轉租之
        範圍、期間及得終止本契約之事由，供承租人轉租時向次承租人提示。
    </p>
    <p>
        第二條 修繕
        <br>
        租賃住宅或附屬設備損壞時，應由出租人負責修繕。但租賃雙方另
        有約定、習慣或其損壞係可歸責於承租人之事由者，不在此限。
        前項由出租人負責修繕者，承租人得定相當期限催告修繕，如出租
        人未於承租人所定相當期限內修繕時，承租人得自行修繕，並請求出租
        人償還其費用或於第三條約定之租金中扣除。
        出租人為修繕租賃住宅所為之必要行為，應於相當期間先期通知，
        承租人無正當理由不得拒絕。
        前項出租人於修繕期間，致租賃住宅全部或一部不能居住使用者，
        承租人得請求出租人扣除該期間全部或一部之租金。
        第九條 室內裝修
        承租人有室內裝修之需要，應經出租人同意並依相關法令規定辦
        理，且不得損害原有建築結構之安全。
        4
        承租人經出租人同意裝修者，其裝修增設部分若有損壞，由承租人
        負責修繕。
        第一項情形，承租人返還租賃住宅時，應□負責回復原狀□現況返
        還□其他 。
    </p>
    <p>
        第三條 出租人之義務及責任
        <br>
        出租人應出示有權出租本租賃住宅之證明文件及國民身分證或其
        他足資證明身分之文件，供承租人核對。
        出租人應以合於所約定居住使用之租賃住宅，交付承租人，並應於
        租賃期間保持其合於居住使用之狀態。
        出租人與承租人簽訂本契約前，租賃住宅有由承租人負責修繕之項
        目及範圍者，出租人應先向承租人說明並經承租人確認（如附件三），
        未經約明確認者，出租人應負責修繕，並提供有修繕必要時之聯絡方式。
    </p>
        第四條 承租人之義務及責任
        <br>
        承租人應於簽訂本契約時，出示國民身分證或其他足資證明身分之
        文件，供出租人核對。
        承租人應以善良管理人之注意，保管、使用租賃住宅。
        承租人違反前項義務，致租賃住宅毀損或滅失者，應負損害賠償責
        任。但依約定之方法或依租賃住宅之性質使用、收益，致有變更或毀損
        者，不在此限。
        前項承租人應賠償之金額，得由第四條第一項規定之押金中抵充，
        如有不足，並得向承租人請求給付不足之金額。
        承租人經出租人同意轉租者，與次承租人簽訂轉租契約時，應不得
        逾出租人同意轉租之範圍及期間，並應於簽訂轉租契約後三十日內，以
        書面將轉租範圍、期間、次承租人之姓名及通訊住址等相關資料通知出
        租人。
    <p>
        <br>
        第五條 租賃住宅部分滅失
        <br>
        租賃關係存續中，因不可歸責於承租人之事由，致租賃住宅之一部
        滅失者，承租人得按滅失之部分，請求減少租金。
    </p>
        </div>
</div> -->

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