<script>
import { vModelCheckbox } from "vue";
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from 'pinia'  //mapState導入變數 ,mapActions導入方法


export default {
    data(){
        return {

        }
    },
    computed: {
        ...mapState(dataStore, ['page'])
    },
    methods: {
        ...mapActions(dataStore,['setPage'])
    },
    mounted(){
        this.setPage(3)
    }


}
</script>

<template>


<div class="manageArea">
    <h2>這是租約管理列表頁面</h2>
    <p>{{ this.page }}</p>
    <div class="searchPlace">
            <label>承租地址：<input class="srColumn" type="text" value="" v-model="quizFilters.name"></label>
            <label>承租人姓名：<input class="srColumn" type="text" value="" v-model="quizFilters.name"></label>
            <label for="start_time">租約時間 從：</label>
            <input type="date" id="start" name="trip-start" value="" v-model="quizFilters.startDate" min="1970-01-01"
                max="2050-12-31" />
            <label for="end_time">到：</label>
            <input type="date" id="start" name="trip-start" v-model="quizFilters.endDate" value=""
                min="1970-01-01" max="2050-12-31" />
            <button class="searchbtn" type="button" @click="search()">搜尋</button>
    </div>
    <!-- con=contract -->
    <div class="conlist">
        <table>
            <thead>
                <tr>
                    <th>選取</th>
                    <th>編號</th>
                    <th>承租人</th>
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
                    
                
                    <td><button class="edit">查看</button></td>
                </tr>
            </tbody>
        </table>
    </div>
        
</div>


</template>

<style scoped lang="scss">


.manageArea{
    width: 100dvw;
    height: auto;
    border: 1em solid  #9a685200;
    //border-style:  inset;
    margin-left: 10%;  // 移除 margin-left，並將 margin 設定為 auto
    padding-top: 0;  // 確保 padding-top 為 0
    background-color: #FAF0E9;
}

.searchPlace {
    width: auto;
    height: 20dvh;
    color: black;
    //border: 3px solid rgba(190, 188, 42, 0.822);
    text-align: left;
    margin: auto;
    padding: 5% 0 0 20%;

    .srColumn {
        width: 30dvw;
    }

    .qrsrtime {
        margin-top: 20px;
    }

    .searchbtn {
        margin-left: 3%;
        width: 90px;
        height: 40px;
        color: white;
        border: 2px solid white;
        border-radius: 50px;
        background-color: #9A6852;
        transition: 0.2s;
       
        
        }
        .searchbtn:hover {
            color:#9A6852;
            background-color: #eed89a;
            transform: scale(1.1); /* 在hover時縮放按鈕 */

        }

        .searchbtn:active {
            color: #9A6852;
            font-size: 600;
            font-size: medium;
            transform: scale(0.95); /* 在active時縮小按鈕 */
            

    }
}


.conlist {
    width: 100%;
    height: auto;
    // margin-left: 25%;
    color: black;
    background-color: antiquewhite;
    border: none;
    text-align: center;
    overflow: hidden;
    border-radius: 0px 0px 0px 0px;
    box-shadow: 0 0 10px rgba(167, 147, 147, 0.541);


    table {
    font-family: 'Oswald', sans-serif;
    //collapse 會使儲存格邊框不出現。
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

    //nth-of-type(even) 建立灰色背景，建立交錯的效果
    tr:nth-of-type(even) td {
        background-color: #f3f3f3;

    }

}







</style>




