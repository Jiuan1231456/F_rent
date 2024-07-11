<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            obj: {//搜尋用
                address: "",
                roomId: "",
            },
            roomList: [],
            deleteCheckbox: [],//刪除用
        }
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj', ])
    },
    methods: {
        ...mapActions(dataStore, ['setPage', 'setRoomObj','setLoginObj']),

        search() { //搜尋房間
            console.log("input輸入的地址和房號", this.obj);
            fetch("http://localhost:8080/room/roomSearch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.obj)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("搜尋結果(包含其他人)", data)
                    // 篩選出當前account的問卷
                    this.roomList = data.roomList.filter(item => item.account === this.loginObj.ownerAccount);
                    console.log("篩選出當前登入者的所有房間", this.roomList)
                })
        },

        //第三層:篩選取得特定房東的特定房間資訊
        getRoomInfo(index){
            console.log("選特定房東的特定房間資訊",this.roomList[index]);//印出來供看console
            this.setRoomObj(this.roomList[index]);
        
        },

        deleteSelectedRoom() {  //從DB中刪除勾選的房間
            let deleteObj = {
                addressList: this.deleteCheckbox,
            };
            console.log("所有勾選的房間", deleteObj)
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
                        console.log("刪除後的新資料", data)
                        if (data.code === 200) {
                            Swal.fire({
                                icon: "success",
                                title: "刪除成功!!",
                                didClose: () => {
                                    this.$router.push('/roomList');
                                    this.search();//重新搜尋 顯示出最新的資料
                                }
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "發生錯誤",
                            });
                        }

                    })
            };
            this.deleteCheckbox = [];//刪完要清空這個欲刪除的陣列
        },

        browse(index) { //跳轉到Detail和Edit前，先抓取點選的該筆資料暫存到pinia
            this.setRoomObj(this.roomList[index]);
            console.log("pinia的setRoomObj", this.roomObj)
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="bigArea">

        <div class="search" id="searchId">
            <label>地址&nbsp;&nbsp;:&nbsp;&nbsp;</label>
            <input type="text" class="searchInput1" title="依地址模糊搜尋" v-model="this.obj.address">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>房號&nbsp;&nbsp;:&nbsp;&nbsp;</label>
            <input type="text" class="searchInput2" title="依房號模糊搜尋" v-model="this.obj.roomId">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button class="searchButton bt" @click="search()">搜尋</button>
        </div>
        <div class="aAndD">
            <button class="deleteButton bt" @click="deleteSelectedRoom()">刪除</button>
            <RouterLink to="/addRoom" class="rLStyle">
                <button class="addButton bt">新增</button>
            </RouterLink>
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
                <td style="width: 4%;"><input type="checkbox" v-model="deleteCheckbox" :value="item.address"></td>
                <td style="width: 6%;">{{ index + 1 }}</td>
                <td style="width: 17%; padding: 4px;;">
                    <!-- 使用 img 标签显示图片，src 属性绑定 base64 编码的图片数据，格式为 data:image/jpeg;base64, + item.photo -->
                    <div v-if="item.photo"> 
                        <img :src="'data:image/jpeg;base64,' + item.photo" alt="Image">
                    </div>
                </td>
                <td style="width: 36%; text-align: left; padding-left: 1%;">
                    <RouterLink to="/roomDetail" @click="this.browse(index)"> {{ item.address }} </RouterLink>
                </td>
                <td style="width: 7%;">{{ item.floor }}</td>
                <td style="width: 7%;">{{ item.roomId }}</td>
                <td style="width: 12%;">{{ item.rentP }}</td>
                <td style="width: 13%;">
                    <RouterLink to="/editRoom" class="edit" @click="this.browse(index)">編輯</RouterLink> <br>
                    <br>
                    <RouterLink to="/contractAdd" class="contractAdd" @click="getRoomInfo(index)">新增契約</RouterLink>
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

.search {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    width: 100%;
    margin: 15px 0;

    .searchInput1 {
        width: 40%;
        border-radius: 5px; //四個角的弧度
    }

    .searchInput2 {
        width: 20%;
        border-radius: 5px; //四個角的弧度
    }

    .searchButton {
        width: 65px;
        height: 30px;
        background-color: rgb(255 141 61);
        color: white;
        border-radius: 5px; //四個角的弧度
        border: none;
        cursor: pointer;
    }
}

.aAndD {
    width: 15%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 1%;

    .deleteButton {
        width: 65px;
        height: 30px;
        background-color: rgb(255, 123, 53);
        color: white;
        border-radius: 5px; //四個角的弧度
        border: none;
        cursor: pointer;
    }

    .addButton {
        width: 65px;
        height: 30px;
        background-color: rgb(255 141 61);
        color: white;
        border-radius: 5px; //四個角的弧度
        border: none;
        cursor: pointer;

        .rLStyle {
            text-decoration: none;
        }
    }
}

.bt:active {
    transform: scale(0.95);
}

.roomList {
    width: 100%;
    margin: auto;
    border-collapse: collapse; //table合併邊框

    th {
        font-size: 20px;
        background: rgb(254, 175, 126);
        border: solid 1px rgb(209, 209, 209);
        color: rgb(0, 0, 0);
        text-align: center;
    }

    td {
        height: 140px;
        font-size: 20px;
        text-align: center;
        border: solid 1px rgb(209, 209, 209);
        padding: 4px 0;
    }
}

.fa-circle-up {
    position: absolute;
    font-size: 30px;
    right: -22px;
    bottom: 15px;
}

img{
    width: 200px;
    height: 150px;
}
</style>