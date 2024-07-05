<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data() {
        return {
            address: "",
            account: "",//從登入完的pinia抓
            floor: "",
            rId: "",
            rentP: "",
            deposit: "",
            cutP: "",
            eletricP: "",
            waterP: "",
            manageP: "",
            acreage: "",
            parking: false,
            equip: "",
            rOther: "",

        }
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj'])
    },
    methods: {
        ...mapActions(dataStore, ['setPage']),
        addRoomToDB() {
            let testObj = {
                address: this.address,
                account: this.loginObj.ownerAccount, //pinia暫存的房東帳號
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
                rOther: this.rOther,
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
        this.setPage(3);
        console.log(this.loginObj)
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="bigArea">
        <div class="title">
            <h1>新增房間資訊</h1>
        </div>
        <div class="inputArea">
            <span>住址&nbsp;:&nbsp;&nbsp;</span>
            <input class="address inp" type="text" v-model="this.address">

            <span>樓層&nbsp;:&nbsp;&nbsp;</span>
            <input class="floor inp" type="text" v-model="this.floor">樓

            <span>房號&nbsp;:&nbsp;&nbsp;</span>
            <input class="rId inp" type="text" v-model="this.rId">
            <br>
            <span>租金&nbsp;:&nbsp;&nbsp;</span>
            <input class="rentP inp" type="text" v-model="this.rentP">元/月

            <span>押金&nbsp;:&nbsp;&nbsp;</span>
            <input class="deposit inp" type="text" v-model="this.deposit">元

            <span>違約金&nbsp;:&nbsp;&nbsp;</span>
            <input class="cutP inp" type="text" v-model="this.cutP">元
            <br>
            <span>電費&nbsp;:&nbsp;&nbsp;</span>
            <input class="eletricP inp" type="text" v-model="this.eletricP">元/度

            <span>水費&nbsp;:&nbsp;&nbsp;</span>
            <input class="waterP inp" type="text" v-model="this.waterP">元/月

            <span>管理費&nbsp;:&nbsp;&nbsp;</span>
            <input class="manageP inp" type="text" v-model="this.manageP">
            <br>
            <span>坪數&nbsp;:&nbsp;&nbsp;</span>
            <input class="acreage inp" type="text" v-model="this.acreage">

            <span>車位&nbsp;:&nbsp;&nbsp;</span>
            <input class="parking inp" type="checkbox" v-model="this.parking">
        </div>
        <div class="equipDiv">
            <span>物件備註&nbsp;:&nbsp;&nbsp;</span>
            <textarea class="equip inp" style="resize: none; width: 80%; height: 40%;" v-model="this.equip"></textarea>
        </div>
        <div class="rOtherDiv">
            <span>特色說明&nbsp;:&nbsp;&nbsp;</span>
            <textarea class="rOther inp" style="resize: none; width: 80%; height: 40%;" v-model="this.rOther"></textarea>
        </div>
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

.inp{
    padding-left: 5px;
}

.roomDetailDiv {
    width: 80%;
    height: 60%;
    display: flex;
}
</style>