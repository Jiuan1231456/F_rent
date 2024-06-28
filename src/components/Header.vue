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
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </div>
</template>

<style scoped lang="scss">

</style>