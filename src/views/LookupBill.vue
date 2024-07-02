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
        ...mapActions(dataStore,['setPage'])
    },
    mounted(){
        this.setPage(4)
    }
}
</script>

<template>
    <div class="searchArea">
        <span class="searchTitle">分類</span>
        <div class="btnArea">
        <button class="searchItem">依地址樓層房號</button>
        <button class="searchItem">依房客姓名</button>
        <button class="searchItem">依計費期間</button>
    </div>
    </div>
    <!-- <h2>這是帳單查詢頁面</h2>
     <p>{{ this.page }}</p> -->
</template>

<style scoped lang="scss">
.searchArea{
    width: 75%;
    height: 64px;
    border: 1px solid black;
    margin: 3% auto;
    margin-left: 58px;
    display: flex;
    // position: relative;
    .searchTitle{
    font-size: 2em;
    font-weight: 500;
    letter-spacing: 5px;
}
.btnArea{
    width: 88%;
    height: 100%;
    border: 1px solid red;
    margin-left: 41px;
}
.searchItem{
    margin: 16px auto;
    border: 2px solid #FF9D60;
    border-radius: 23px;
    height: 40px;
}

}


</style>