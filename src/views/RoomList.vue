<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            obj: {
                address: "",
                roomId: "",
            },
            roomList:[],//儲存房間列表
            deleteCheckbox:[],
            roomImage:[
                {image:'public/FRentImageNC/0.jpg'},
                {image:'/FRentImageNC/0.jpg'}
            ],
    

            


        }
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj']),
        RouterLink 
    },
    methods: {
        ...mapActions(dataStore, ['setPage','setRoomObj','setLoginObj']),

        search() { //搜尋房間
            console.log(this.obj);
            fetch("http://localhost:8080/room/roomSearch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.obj)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    // 第二層:篩選出當前account的問卷
                    this.roomList = data.roomList.filter(item => item.account === this.loginObj.ownerAccount);
                
                })
        },
        //第三層:篩選取得特定房東的特定房間資訊
        getRoomInfo(index){
            this.selectIndex=index;
            console.log("選特定房東的特定房間資訊",this.roomList[index]);//印出來供看console
            this.setRoomObj(this.roomList[index]);
        
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
                    })
            };
            this.deleteCheckbox = [];
        },



    },
    mounted() {
        this.setPage(2),
        this.search()
        //this.getRoomInfo()

    }
}
</script>

<template>
    <div class="bigArea">

        <div class="search">
            地址<input type="text" class="searchInput1" title="依地址模糊搜尋" v-model="this.obj.address">
            房號<input type="text" class="searchInput2" title="依房號模糊搜尋" v-model="this.obj.roomId">
            <button class="searchButton bt" @click="search()">搜尋</button>
        </div>
        

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
                <td style="width: 4%;"><input type="checkbox"></td>
                <td style="width: 6%;">{{ index+1 }}</td>
                <td style="width: 17%;">圖片</td>
                <td style="width: 36%; text-align: left; padding-left: 1%;">{{ item.address }}</td>
                <td style="width: 7%;">{{ item.floor }}</td>
                <td style="width: 7%;">{{ item.roomId }}</td>
                <td style="width: 12%;">{{ item.rentP }}</td>
                <td style="width: 13%;">
                    <RouterLink to="/roomDetail" class="edit">編輯</RouterLink>  <br>
                    <button class="deleteButton" @click="deleteSelectedRoom()">刪除</button> <br>
                    <td><RouterLink to="/ContractAdd" @click="getRoomInfo(index)"> 新增租約</RouterLink></td>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped lang="scss">
.bigArea {
    width: 80%;
    padding: 1%;
    margin: 0 auto;
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
</style>