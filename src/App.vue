<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from"./components/Header.vue"
import topHeader from"./components/topHeader.vue"

</script>

<template>
  <div class="header">
    <Header />
  </div>
<div class="top">
  <!-- <topHeader /> -->
</div>


  <RouterView />
</template>

<style scoped lang="scss">
.header {
  width: 16dvw;
  height: 100dvh;
}

//這邊可以讓topheader浮出來
.top{
  
  z-index: -99;
}
</style>
