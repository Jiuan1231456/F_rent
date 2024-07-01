<script>
import { vModelCheckbox } from "vue";
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from 'pinia'  //mapState導入變數 ,mapActions導入方法

import { RouterLink } from "vue-router";
import Header from "../components/Header.vue";

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
    <h2>這是租約管理列表頁面</h2>
    <p>{{ this.page }}</p>
<!-- con=contract -->
<div class="conlist">
    <table>
        <tr>
            <th>選取</th>
            <th>編號</th>
            <th>承租人</th>
            <th>承租物件地址</th>
            <th>開始時間</th>
            <th>結束時間</th>
            <th>租金</th>
            <th>查看</th>
        </tr>
    <!-- 之後用v-for綁tr-->
        <tr class="title">
            <!-- 這邊之後用item一個個去綁 -->
            <td><input type="checkbox"  @change="event => updateSelectedQuizzes(event, item.id)">刪除問卷</td>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{getStatus(item)}}</td>
            <td>{{ item.startDate }}</td>
            <td>{{ item.endDate }}</td>
            <td><button class="edit">編輯</button></td>
        </tr>
    </table>
</div>
        



</template>

<style scoped lang="scss">
*{
margin-left: 400px;

}




.conlist {
    width: 100%;
    height: auto;
    color: black;
    background-color: antiquewhite;
    border: none;
    text-align: center;
    overflow: hidden;
    border-radius: 0px 0px 0px 0px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
    // margin-top: 

}

table {
    font-family: 'Oswald', sans-serif;
    //collapse 會使儲存格邊框不出現。
    border-collapse: collapse;

}

th {
    background-color: rgb(212, 152, 95);
    color: #ffffff;
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





</style>




