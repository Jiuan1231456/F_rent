<script>
import dataStore from "@/stores/dataStore";
import { mapState } from "pinia";
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            cut_reason: "",
            cut_date: "",
            cutContractSearch: [], //存放搜尋到的特定契約，放更新完的契約
            cutDateContract: []//存放特定契約的中止日

        }
    },
    computed: {
        // 綁定 Pinia 狀態
        // 'oneContractObj' 在 pinia 檔裡的 state
        ...mapState(dataStore, ['oneContractObj', 'roomObj', 'registerObj'])
    },
    components: {
        RouterLink
    },
    methods() {

    }
    //    
}
</script>

<template>
    <div class="bigArea">
        <h1>與{{ oneContractObj.tenantName }}的契約書</h1>
        <br>
        <div class="roomInfo">
            <h2>租賃物件資訊</h2>
            <br>
            <div class="rent_time">
                <label for="start_time">租賃期間 自：{{ oneContractObj.startDate }}</label>

                <label for="end_time">到：{{ oneContractObj.endDate }}</label>

            </div>
            <br>
            租賃物件地址: {{ roomObj.address }}
            <br>
            樓層: {{ roomObj.floor }}
            <br>
            房號: {{ roomObj.roomId }}
            <br>
            租金/月: {{ roomObj.rentP }}
            <br>
            押金: {{ roomObj.deposit }}
            <br>
            管理費/月: {{ roomObj.manageP }}
            <br>
            電費/度: {{ roomObj.eletricP }}
            <br>
            水費/月: {{ roomObj.waterP }}
            <br>
            面積: {{ roomObj.acreage }}
            <br>
            設備:{{ roomObj.equip }}
            <br>
            物件備註:{{ roomObj.rOther }}
            <div class="input-wrapper">

            </div>
        </div>
        <br>
        <h2>立契約書人</h2>
        <div class="Info">
            <br>
            <h4>出租人姓名:{{ registerObj.ownerName }}</h4>
            <br>
            身分證字號: {{ registerObj.ownerIdentity }}
            <br>
            戶籍地址: {{ oneContractObj.ownerHomeAddress }}
            <br>
            通訊地址: {{ oneContractObj.ownerContactAddress }}
            <br>
            連絡電話: {{ registerObj.ownerPhone }}
            <br>
            <br>
            <h4>承租人姓名:{{ oneContractObj.tenantName }}</h4>
            <br>
            身分證字號: {{ oneContractObj.tenantIdentity }}
            <br>
            戶籍地址(營業登記地址): {{ oneContractObj.tenantHomeAddress }}
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
            中止原因: <textarea name="" id=""></textarea>
            <br>
            違約金: {{ roomObj.cutP }}
            <br>
            中止日期:
        </div>
        <br>
        <h3>其他備註(或個別磋商條款)</h3>
        <br>
        <textarea>{{ oneContractObj.cOther }}</textarea>
        <div class="input-wrapper">

        </div>
        <br>
        <h3>立約日期:{{ oneContractObj.signDate }}</h3>


        <div class="btn">
            <button type="submit">送出</button>
        </div>
    </div>
</template>




<style scoped lang="scss">
.bigArea {
    margin-top: 3%;
    margin-left: 10%
}
</style>