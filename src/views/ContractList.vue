<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data(){
        return {

        }
    },
    computed: {
        ...mapState(dataStore, ['page'])
    },
    methods: {
        ...mapActions(dataStore,['returnPage','setPage']),
        goToContractAdd() {
            // 使用 Vue Router 的方式進行跳轉
            this.$router.push({ name: 'contractAdd'}); // 假設路由設定中有名為 Back1 的路由
        },
    },
    mounted(){
        this.setPage(3)
    }
}
</script>

<template>
    <div class="manageArea">
    <!-- 搜尋欄 -->
    <div class="searchPlace">
        <div class="inputPlace">
        <span class="label">承租地址　：</span>
        <div class="InputContainer">
            <input placeholder="Search.." id="input" class="input" name="text" type="text">
        </div>
        </div>
        <div class="inputPlace">
        <span class="label">承租人姓名：</span>
        <div class="InputContainer">
            <input placeholder="Search.." id="input" class="input" name="text" type="text">
        </div>
        </div>
        <!-- 選擇日期 -->
        <p class="datetime">
        <label for="start_time"  style="background-color:  #FFC89A;" >租約時間 從：</label>
        <input type="date" id="start" name="trip-start" min="1970-01-01" max="2050-12-31" style="font-size: 22px;">
        <label for="end_time" style="background-color:  #FFC89A;">到：</label>
        <input type="date" id="end" name="trip-end" min="1970-01-01" max="2050-12-31" style="font-size: 22px;">
        <button class="searchbtn" type="button">搜尋</button>
        </p>
    </div>

    <div class="container">
        <!-- 新增/刪除租約 -->
        <i class="fa-solid fa-trash-can"></i>
        <i class="fa-solid fa-circle-plus" @click="goToContractAdd()"></i>

        <!-- 狀態選擇清單 -->
        <div class="statusList">
        <select style="font-size: 22px;">
            <option value="" disabled selected>房屋使用狀態篩選</option>
            <option value="">出租中</option>
            <option value="">空房</option>
            <option value="">待生效</option>
            <option value="">已結束</option>
        </select>
        </div>
    </div>

    <!--租約列表 con=contract -->
    <div class="conlist">
        <table>
        <thead>
            <tr>
            <th>選取</th>
            <th>編號</th>
            <th>承租人</th>
            <th>狀態</th>
            <th>承租物件地址</th>
            <th>開始時間</th>
            <th>結束時間</th>
            <th>租金</th>
            <th>查看詳情</th>
            </tr>
        </thead>
        <tbody>
            <!-- 之後用v-for綁tr-->
            <tr class="title">
            <!-- 這邊之後用item一個個去綁 -->

            <td>{{  }}</td>
            <td>{{  }}</td>
            <td>{{  }}</td>
            <td>{{  }}</td>
            <td>{{  }}</td>
            <td>{{  }}</td>
            <td>{{  }}</td>
            <td>{{  }}</td>

            <td><button class="edit">查看</button></td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
</template>

    <style scoped lang="scss">
    .manageArea {
        width: 100dvw;
        height: auto;
        border: 1em solid #9a685200;
        //border-style:  inset;
        margin-left: 10%;  // 移除 margin-left，並將 margin 設定為 auto
        padding-top: 0;  // 確保 padding-top 為 0
        background-color: #FAF0E9;
    //搜尋欄文字背景顏色
    .label{
        background-color: #FFC89A; ;
    }
    }
//搜尋
    .searchPlace {
        width: 40dvw;
        height: 20dvh;
        color: black;
        font-size: 22px;
        background-color: #FFC89A;
        border: 1em solid #fae1cd;
        text-align: left;
        margin-top: 5%;
        margin-left: 17%;
        padding: 3% 3% 5% 3%;
    }

    .inputPlace {
        display: flex; /* 使用 Flexbox 使元素並排 */
        align-items: center; /* 垂直居中對齊 */
        margin-bottom: 10px; /* 可以根據需要調整間距 */
        background-color: #FFC89A;
    }

    .InputContainer {
        width: 620px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to bottom, #FF9D60, rgb(255, 231, 231));
        border-radius: 30px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 2px 2px 10px rgba(163, 162, 162, 0.075);
        display: inline-block;
        vertical-align: middle; /* Optional: Align vertically */
        // flex: 1; /* 彈性增長，使 input 容器占據剩餘空間 */
    }

    .input {
        width: 600px;
        height: 40px;
        caret-color: rgb(255, 81, 0);
        background-color: rgb(255, 255, 255);
        border-radius: 30px;
        padding-left: 15px;
        letter-spacing: 0.8px;
        color: rgb(19, 19, 19);
        font-size: 22px;
    }

    .datetime {
        margin-top: 20px;
        background-color: #FFC89A;
    }
//搜尋按鈕
    .searchbtn {
        margin-left: 3%;
        width: 90px;
        height: 40px;
        color: white;
        font-size: 22px;
        border: 2px solid white;
        border-radius: 50px;
        background-color: #9A6852;
        transition: 0.2s;
    }

    .searchbtn:hover {
        color: #9A6852;
        background-color: #eed89a;
        transform: scale(1.1); /* 在hover時縮放按鈕 */
    }

    .searchbtn:active {
        color: #9A6852;
        font-size: 600;
        font-size: medium;
        transform: scale(0.95); /* 在active時縮小按鈕 */
    }

    .conlist {
        width: 95%;
        height: auto;
        margin-top: 1%;
        color: black;
        background-color: antiquewhite;
        border: none;
        text-align: center;
        overflow: hidden;
        border-radius: 0px 0px 0px 0px;
        box-shadow: 0 0 10px rgba(167, 147, 147, 0.541);
    }

    table {
        font-family: 'Oswald', sans-serif;
        border-collapse: collapse;
    }

    th {
        background-color: #FFC89A;
        color: #110f0f;
        width: 25vw;
        height: 70px;
        font-size: 22px;
    }

    td {
        background-color: #ffffff;
        width: 25vw;
        height: 50px;
        text-align: center;
    }

    tr {
        border-bottom: 1px solid #dddddd;
    }

    tr:last-of-type {
        border-bottom: 2px solid rgb(173, 102, 60);
    }

    tr:nth-of-type(even) td {
        background-color: #f3f3f3;
    }

    .container {
        display: flex;
        margin-top: 1%;
    }

    .fa-trash-can {
        font-size: 2.2em;
        margin-right: 2%;
        margin-top: 3%;
    }

    .fa-circle-plus {
        font-size: 2.2em;
        margin-right: 2%;
        margin-top: 3%;
    }

    .statusList {
        font-size: 22px;
        margin-left: 72.5%;
        margin-top: 3%;
    }

    .statusList option {
        font-size: 22px;
    }
    
</style>
  



