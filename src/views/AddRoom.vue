<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data() {
        return {
            address: "",
            account: "",//從登入完的暫存抓
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
        }
    },
    computed: {
        ...mapState(dataStore, ['page','login'])
    },
    methods: {
        ...mapActions(dataStore, ['setPage']),
        addRoomToDB() {
            let testObj = {
                address: this.address,
                account: this.loginObj.ownerAccount,
                floor: this.floor,
                rId: this.rId,
                rentP: this.rentP,
                deposit: this.deposit,
                cutP: this.cutP,
                eletricP: this.eletricP,
                waterP: this.waterP,
                manageP: this.manageP,
                acreage: this.acreage,
                parking: this.parking,
                equip: this.equip,
            }
            fetch("http://localhost:8080/room/creatRoom1", {
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
    mounted() {
        this.setPage(4)
    }
}
</script>

<template>
    <div class="bigArea">
        <div class="title">
            <h1>新增房間資訊</h1>
        </div>
        <div class="inputArea">
            <span>住址&nbsp;:&nbsp;&nbsp;</span>
            <input class="address" type="text" v-model="this.address">

            <span>樓層&nbsp;:&nbsp;&nbsp;</span>
            <input class="floor" type="text" v-model="this.floor">

            <span>房號&nbsp;:&nbsp;&nbsp;</span>
            <input class="rId" type="text" v-model="this.rId">
            <br>
            <span>租金&nbsp;:&nbsp;&nbsp;</span>
            <input class="rentP" type="text" v-model="this.rentP">元/月

            <span>押金&nbsp;:&nbsp;&nbsp;</span>
            <input class="deposit" type="text" v-model="this.deposit">元

            <span>違約金&nbsp;:&nbsp;&nbsp;</span>
            <input class="cutP" type="text" v-model="this.cutP">元
            <br>
            <span>電費&nbsp;:&nbsp;&nbsp;</span>
            <input class="eletricP" type="text" v-model="this.eletricP">元/度

            <span>水費&nbsp;:&nbsp;&nbsp;</span>
            <input class="waterP" type="text" v-model="this.waterP">元/月

            <span>管理費&nbsp;:&nbsp;&nbsp;</span>
            <input class="manageP" type="text" v-model="this.manageP">
            <br>
            <span>坪數&nbsp;:&nbsp;&nbsp;</span>
            <input class="acreage" type="text" v-model="this.acreage">

            <span>車位&nbsp;:&nbsp;&nbsp;</span>
            <input class="parking" type="checkbox" v-model="this.parking">
        </div>
        <div class="roomDetailDiv">
            <span>物件備註&nbsp;:&nbsp;&nbsp;</span>
            <textarea class="equip" style="resize: none; width: 80%; height: 40%;" v-model="this.equip"></textarea>
        </div>
        <span>房東帳號</span>
        <input type="text" v-model="this.account">
        <button @click="addRoomToDB()">確定新增</button>
    </div>
</template>

<style scoped lang="scss">
.bigArea {
    width: 80%;
    padding: 1%;
    position: relative;
}

.address {
    width: 45%;
}

.roomDetailDiv {
    width: 80%;
    height: 60%;
    display: flex;
}
</style>