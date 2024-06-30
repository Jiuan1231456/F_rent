<script>
import { RouterLink, RouterView } from 'vue-router'
export default{
    // 在 template 當標籤使用的方法或是元件，import進來後要宣告在components:{}裡面
    components:{
        RouterLink
    }
}
</script>

<template>
    <div class="headerArea">
        <RouterLink class="routerItem" to="/bill">帳單管理</RouterLink>
        <RouterLink class="routerItem" to="/benefit">觀看收益</RouterLink>
    </div>
</template>

<style scoped lang="scss">
.headerArea{
    height: 100dvh;
    width: 15%;
    background-color: #FFC89A;
    padding-top: 5%;
.routerItem{
    color: black;
    background-color: #FFC89A;
    text-decoration: none;
    font-size: 1.2em;
    display: flex;
    letter-spacing: 8px;
    justify-content: center;
    padding: 5%;
    &:hover{
        cursor: pointer;
        background-color: #FF9D60;
        font-weight: 400;
    }
}
}
</style>