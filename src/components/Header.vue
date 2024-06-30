<script>
import { RouterLink, RouterView } from 'vue-router'
import dataStore from "../stores/dataStore";
import { mapState } from "pinia";
export default{
    // 在 template 當標籤使用的方法或是元件，import進來後要宣告在components:{}裡面
    components: {
        RouterLink,
    },
    computed: {
        ...mapState(dataStore,["page"])
    },
};
</script>

<template>
    <div class="headerArea">
        <RouterLink class="routerItem" :class="{'selectedPage': this.page === 1}" to="/roomdetail">房間資訊</RouterLink>
        <RouterLink class="routerItem" :class="{'selectedPage': this.page === 2}" to="/bill">帳單管理</RouterLink>
        <RouterLink class="routerItem" :class="{'selectedPage': this.page === 3}" to="/benefit">觀看收益</RouterLink>
    </div>
</template>

<style scoped lang="scss">
.headerArea{
    height: 100dvh;
    width: 100%;
    background-color: #FFC89A;
    padding-top: 5%;
.routerItem{
    color: black;
    background-color: #FFC89A;
    text-decoration: none;
    font-size: 22px;
    display: flex;
    letter-spacing: 8px;
    justify-content: center;
    padding: 5%;
    &:hover{
        cursor: pointer;
        background-color: #FF9D60;
        font-weight: 400;
        border-left: 16px solid #FFC89A;
        border-radius: 11% 0px 0px 11%;
        
    }
}
.selectedPage{
    background-color: #FAF0E9;
    border-radius: 11% 0px 0px 11%;
    border-left: 16px solid #FFC89A;
    // padding-left: 25px;
    font-weight: 500;
    &:hover{
        cursor: default;
        background-color: #FAF0E9;
        font-weight: 500;
    }
}
}
</style>