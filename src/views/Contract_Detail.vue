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
        ...mapState(dataStore, ['oneContractObj'])
    },
    components: {
        RouterLink 
    },
//    
}
</script>

<template>
    <div class="bigArea">
        <h1>與{{oneContractObj.tenantName}}契約書</h1>
        <br>
        <div class="roomInfo">
            <h2>租賃物件資訊</h2>
            <br>
            <div class="rent_time">
            <label for="start_time">租賃期間 自：{{ oneContractObj.startDate }}</label>
            
            <label for="end_time">到：{{ oneContractObj.endDate }}</label>
        
            </div>
            <br>
            租賃物件地址: {{ oneContractObj.address }}
            <br>
            樓層: {{ oneContractObj.floor }}
            <br>
            房號: {{ oneContractObj.roomId }}
            <br>
            租金/月: {{ oneContractObj.rentP}}
            <br>
            押金: {{ oneContractObj.deposit }}
            <br>
            管理費/月: {{}}
            <br>
            電費/度: {{}}
            <br>
            水費/月: {{  }}
            <br>
            面積: {{  }}
            <br>
            物件備註:{{ oneContractObj.equip }}
            <div class="input-wrapper">
          
            </div>
        </div>
        <br>
        <h2>立契約書人</h2>
        <div class="Info">
            <br>
            <h4>出租人姓名:{{}}</h4> 
            <br>
            身分證字號: {{oneContractObj.ownerIdentity}}
            <br>
            戶籍地址: {{  oneContractObj.ownerHomeAddress}}
            <br>
            通訊地址: {{  oneContractObj.ownerContactAddress}}
            <br>
            連絡電話: 
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
        <h3>其他備註(或個別磋商條款)</h3>
        <div class="input-wrapper">
           
        </div>
        <br>
        <h3>立約日期:{{ oneContractObj.signDate }}</h3>
       
    
        <div class="btn"> 
            <preview_btn class="space-between"/>
            <send_btn class="space-between" @click="addContractToDB"/>
        </div>
    </div>
</template>




<style scoped lang="scss">

.bigArea{
    margin-left: 25%
}
</style>

