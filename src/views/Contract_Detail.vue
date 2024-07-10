<script>
import dataStore from "@/stores/dataStore";
import { mapState } from "pinia";
import { RouterLink } from 'vue-router';

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
        RouterLink 
    },
    created(){
        console.log(this.roomObj);
        this.pointRoom(roomObj.ownerIdentity,roomObj.ownerPhone)
    },
    mounted(){
       
    },
    methods:{
        ...mapActions(dataStore, ['pointRoom']),
    
    }
}
</script>

<template>
    <div class="bigArea">
        <!-- <h1>與{{oneContractObj.tenantName}}的租賃契約書</h1> -->

        <br>
        <h1>與{{oneContractObj.tenantName}}的租賃契約書</h1>
        <div class="roomInfo">
            <h2>租賃物件資訊</h2>
            <br>
            <div class="rent_time">
            <label for="start_time">租賃期間 自：{{ oneContractObj.startDate }}</label>
            
            <label for="end_time">到：{{ oneContractObj.endDate }}</label>
        
            </div>
            <br>
            租賃物件地址: {{roomObj.address}}
            <br>
            樓層: {{ roomObj.floor }}
            <br>
            房號: {{ roomObj.roomId }}
            <br>
            租金/月: {{ roomObj.rentP}}
            <br>
            押金: {{ roomObj.deposit }}
            <br>
            管理費/月: {{roomObj.manageP}}
            <br>
            電費/度: {{roomObj.eletricP}}
            <br>
            水費/月: {{ roomObj.waterP}}
            <br>
            面積: {{roomObj.acreage}}
            <br>
            設備:{{ roomObj.equip }}
            <br>
            物件備註:{{ roomObj.rOther }}
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
            中止原因: 
            <br>
            違約金: 
            <br>
            中止日期: 
        </div>
        <br>
        <h3 class="other">其他備註(或個別磋商條款)</h3>
        <br>
            <textarea>{{oneContractObj.cOther  }}</textarea>
        <br>
        <br>
        <h3 class="signdate">立約日期:{{ oneContractObj.signDate }}</h3>
       
    
        <div class="btn"> 
        
        </div>
    </div>
</template>




<style scoped lang="scss">
*{
margin-right: 0% ;
}
.bigArea{
   
    margin-top: 3%;
    padding: 3%;
    margin-bottom: 3%;
    margin-left: 10%;
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
    width: 25%;

    padding: 2%;
    // text-align: center;
    box-shadow: rgba(0, 0, 0, 0.15) 2.95px 2.95px 3.6px;

}
.other{
        
width: 43%;
    }
.signdate{
    width: 43%;
    background-color: white;
    box-shadow: none;
}


h4{
    background-color: white;
    
}
h2{
    background-color: white;
    background-color: rgb(247, 203, 150);
    width: 25%;
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

