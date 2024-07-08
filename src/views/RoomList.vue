<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data() {
        return {
            obj: {
                address: "",
                roomId: "",
            },
            roomList: [],
            deleteCheckbox: [],
            roomImage: [],
        }
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj', 'roomDetail'])
    },
    methods: {
        ...mapActions(dataStore, ['setPage','setRoomD']),

        search() { //搜尋房間
            console.log("input輸入的地址和房號",this.obj);
            fetch("http://localhost:8080/room/roomSearch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.obj)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("符合搜尋條件的結果",data)
                    // 篩選出當前account的問卷
                    this.roomList = data.roomList.filter(item => item.account === this.loginObj.ownerAccount);
                    console.log("篩選出當前登入者的所有房間",this.roomList)
                })
        },

        deleteSelectedRoom() {  //從DB中刪除勾選的房間
            let deleteObj = {
                addressList: this.deleteCheckbox,
            };
            console.log(deleteObj)
            if (this.deleteCheckbox.length > 0) {
                this.roomList = this.roomList.filter(
                    (item) => !this.deleteCheckbox.includes(item.id)
                )

                fetch("http://localhost:8080/room/deleteRoom", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(deleteObj)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        this.search()
                    })
            };
            this.deleteCheckbox = [];
        },

        browse(index) { //瀏覽詳細資訊、編輯先抓資料
            this.setRoomD(this.roomList[index]);
            console.log("pinia的setRoomD",this.roomDetail)
        },

    },

    created() {
        this.search()
    },
    mounted() {
        this.setPage(2)
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="bigArea">

        <div class="search" id="searchId">
            地址<input type="text" class="searchInput1" title="依地址模糊搜尋" v-model="this.obj.address">
            房號<input type="text" class="searchInput2" title="依房號模糊搜尋" v-model="this.obj.roomId">
            <button class="searchButton bt" @click="search()">搜尋</button>
        </div>

        <button class="deleteButton" @click="deleteSelectedRoom()">刪除</button>
        <button class="addButton"><RouterLink to="/addRoom">新增</RouterLink></button>

        <table class="roomList">
            <tr>
                <th style="width: 4%;"></th>
                <th style="width: 6%;">項次</th>
                <th style="width: 17%;">圖片</th>
                <th style="width: 36%;">地址</th>
                <th style="width: 7%;">樓層</th>
                <th style="width: 7%;">房號</th>
                <th style="width: 12%;">租金</th>
                <th style="width: 13%;">管理</th>
            </tr>

            <tr v-for="(item, index) in this.roomList" :key="index">
                <td style="width: 4%;"><input type="checkbox" v-model="deleteCheckbox" :value="item.address"></td>
                <td style="width: 6%;">{{ index + 1 }}</td>
                <td style="width: 17%;">圖片</td>
                <td style="width: 36%; text-align: left; padding-left: 1%;"> <RouterLink to="/roomDetail" @click="this.browse(index)"> {{ item.address }} </RouterLink> </td>
                <td style="width: 7%;">{{ item.floor }}</td>
                <td style="width: 7%;">{{ item.roomId }}</td>
                <td style="width: 12%;">{{ item.rentP }}</td>
                <td style="width: 13%;">
                    <RouterLink to="/editRoom" class="edit" @click="this.browse(index)">編輯</RouterLink> <br>
                    <br>
                    <RouterLink to="/contractAdd" class="contractAdd">新增契約</RouterLink>
                    
                </td>
            </tr>
        </table>
        <a href="#searchId"><i class="fa-regular fa-circle-up"></i></a>
    </div>
</template>

<style scoped lang="scss">
.bigArea {
    width: 80%;
    padding: 1%;
    margin: 0 auto;
    position: relative;
}

.roomList {
    width: 75dvw;
    margin: auto;
    border-collapse: collapse; //table合併邊框

    th {
        font-size: 20px;
        background: rgb(254, 175, 126);
        // border: solid 1px rgb(0, 0, 0);
        color: rgb(0, 0, 0);
        text-align: center;
    }

    td {
        height: 140px;
        font-size: 17px;
        text-align: center;
        border: solid 1px rgb(209, 209, 209);
        padding: 4px 0;
    }
}

.fa-circle-up{
    position: absolute;
    font-size: 30px;
    right: -13px;
    bottom: 15px;
}
</style>