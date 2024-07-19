<script>
import dataStore from "@/stores/dataStore";
import { mapState } from "pinia";
import { RouterLink } from 'vue-router';
import send_btn from '../components/send_btn.vue';

export default {
    data() {
        return {
         
            
        }
    },

    computed: {
        // 綁定 Pinia 狀態
        // 'oneContractObj' 在 pinia 檔裡的 state
        ...mapState(dataStore, ['oneContractObj','roomObj','loginObj'])
    },
    components: {
        RouterLink,
        send_btn,
    },
    created(){
        console.log(this.roomObj);
 
    },
    mounted(){
    
    },
    methods:{
        //將日期顯示為特定格式
        formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        },
    }
}
</script>

<template>
    <div class="bigArea">
        <!-- <h1>與{{oneContractObj.tenantName}}的租賃契約書</h1> -->

        <br>
        <h1>租賃契約書</h1>
        <div class="roomInfo">
            <h2>租賃物件資訊</h2>
            <br>
            <div class="rent_time">
            <label for="start_time">租賃期間 自：{{ oneContractObj.startDate }}</label>
            
            <label for="end_time">到：{{ oneContractObj.endDate }}</label>
        
            </div>
            <br>
            租賃物件地址: {{oneContractObj.address}}
            <br>
            樓層: {{ oneContractObj.floor }}
            <br>
            房號: {{ oneContractObj.roomId }}
            <br>
            租金/月: {{ oneContractObj.rentP}}
            <br>
            車位:{{oneContractObj.parking}}
            <br>
            押金: {{ oneContractObj.deposit }}
            <br>
            管理費/月: {{oneContractObj.manageP}}
            <br>
            電費/度: {{oneContractObj.eletricP}}
            <br>
            水費/月: {{ oneContractObj.waterP}}
            <br>
            面積: {{oneContractObj.acreage}}
            <br>
            設備:{{ roomObj[0].equip }}
            <br>
            物件備註:{{ oneContractObj.rCondition }}
            <div class="input-wrapper">
        
            </div>
        </div>
        <br>
        <h2>立契約書人</h2>
        <div class="info">
            <br>
            <h4>出租人姓名:{{loginObj.ownerName}}</h4> 
            <br>
            身分證字號: {{loginObj.ownerIdentity}}
            <br>
            戶籍地址: {{  oneContractObj.ownerHomeAddress}}
            <br>
            通訊地址: {{  oneContractObj.ownerContactAddress}}
            <br>
            連絡電話: {{ loginObj.ownerPhone}}
            <br>
            <br>
            <h4>承租人姓名:{{ oneContractObj.tenantName }}</h4> 
            <br>
            身分證字號: {{ oneContractObj.tenantIdentity}}
            <br>
            戶籍地址(營業登記地址): {{ oneContractObj.tenantHomeAddress}}
            <br>
            通訊地址: {{ oneContractObj.tenantContactAddress }}
            <br>
            email: {{ oneContractObj.tenantEmail }}
            <br>
            連絡電話: {{ oneContractObj.tenantPhone }}
        </div>
        <br>
        <h3>契約中止</h3>
        <div class="cut">
            <br>
            中止原因: {{oneContractObj.cutReason}}
            <br>
            違約金:  {{ oneContractObj.cutP }}
            <br>
            中止日期: {{ oneContractObj.cutDate }}
        </div>
        <br>
        <h3 class="other">其他備註(或個別磋商條款)</h3>
        <br>
            <textarea disabled>{{oneContractObj.cOther  }}</textarea>
        <br>
        <br>
        <h3 class="signdate">立約日期：{{ formatDate(oneContractObj.signDate) }}</h3>

        契約編號:{{oneContractObj.ai}}
    
    
        <!-- <div class="btn"> 
            <send_btn class="space-between" @click="sendCutContractToDB()"/> 
        </div> -->
    </div>
</template>




<style scoped lang="scss">

.bigArea{

    margin-top: 3%;
    padding: 3%;
    margin-bottom: 3%;
    margin-left: 30%;
    width: 55%;
    background-color: white;
    border: 1px solid rgba(12, 12, 12, 0.096);
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    .roomInfo{
        background-color: white;
    }
    .info{
        background-color: white;
    }
    .cut{
        background-color: white;
    }
}




.rent_time{
    background-color: white;
    label{
        background-color: white;
    }
}
h3{
    background-color: white;
    background-color: white;
    background-color: rgb(247, 203, 150);
    width: 23%;

    padding: 2%;
    // text-align: center;
    box-shadow: rgba(0, 0, 0, 0.15) 2.95px 2.95px 3.6px;

}
.other{
        
width: 55%;
    }
.signdate{
    width: 70%;
    background-color: white;
    box-shadow: none;
}


h4{
    background-color: white;
    
}
h2{
    background-color: white;
    background-color: rgb(247, 203, 150);
    width: 35%;
    padding: 1%;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.15) 2.95px 2.95px 3.6px;

}
.roomInfo{
        margin-top: 10%;
    }
h1{
    background-color: white;
    // width: 30%;
    // padding: 2%;
    border-style:inset;
    text-align: center;
    // position: absolute;
    border-radius: 0%;
    top:2%;
    left: 39%;
    margin: auto;
    // background-color: rgb(158, 112, 57);
    color: rgb(0, 0, 0);
}
</style>