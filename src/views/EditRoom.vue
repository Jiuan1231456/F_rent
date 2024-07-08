<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj', 'roomDetail'])
    },
    methods: {
        ...mapActions(dataStore, ['setPage']),

        update() {//更新房間資訊並跳回房間列表
            let newDate={
                address:this.roomDetail.address,
                rentP: this.roomDetail.rentP,
                deposit: this.roomDetail.deposit,
                cutP: this.roomDetail.cutP,
                eletricP: this.roomDetail.eletricP,
                waterP: this.roomDetail.waterP,
                manageP: this.roomDetail.manageP,
                acreage: this.roomDetail.acreage,
                parking: this.roomDetail.parking,
                equip: this.roomDetail.equip,
                rOther: this.roomDetail.rOther,
            }
            fetch("http://localhost:8080/room/updateRoom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newDate)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("更新完的結果", this.roomDetail)
                    // 篩選出當前account的問卷
                    // this.roomList = data.roomList.filter(item => item.account === this.loginObj.ownerAccount);
                })
        },
    },
    mounted() {
        this.setPage(4)
    }
}
</script>

<template>
    <div class="bigArea">
        <h1>房間詳細資訊</h1>
        <h4>地址 : {{ this.roomDetail.address }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            樓層 :{{ this.roomDetail.floor }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            房號 : {{ this.roomDetail.roomId }}
        </h4>
        <h4>租金 : <input class="rentP inp" type="text" v-model="this.roomDetail.rentP"> 元/月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            押金 : <input class="deposit inp" type="text" v-model="this.roomDetail.deposit"> 元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            違約金 : <input class="cutP inp" type="text" v-model="this.roomDetail.cutP"> 元
        </h4>
        <h4>電費 : <input class="eletricP inp" type="text" v-model="this.roomDetail.eletricP"> 元/度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            水費 : <input class="waterP inp" type="text" v-model="this.roomDetail.waterP"> 元/月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            管理費 : <input class="manageP inp" type="text" v-model="this.roomDetail.manageP"> 元/月</h4>
        <h4>坪數 : <input class="acreage inp" type="text" v-model="this.roomDetail.acreage"> 坪</h4>
        <h4>車位 : <input class="parking inp" type="checkbox" v-model="this.roomDetail.parking"></h4>
        <div class="equipDiv">
            <span>物件備註&nbsp;:&nbsp;&nbsp;</span>
            <textarea class="equip inp" style="resize: none; width: 80%; height: 40%;" v-model="this.roomDetail.equip"></textarea>
        </div>
        <div class="rOtherDiv">
            <span>特色描述&nbsp;:&nbsp;&nbsp;</span>
            <textarea class="rOther inp" style="resize: none; width: 80%; height: 40%;" v-model="this.roomDetail.rOther"></textarea>
        </div>
        <button @click="update()">儲存更新</button>
    </div>
</template>

<style scoped lang="scss">
.bigArea {
    width: 80%;
    margin: 0 auto;
}

.inp {
    padding-left: 5px;
    width: 18%;
}

.parking{
    width: 2%;
}

</style>