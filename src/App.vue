<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from"./components/Header.vue"


</script>

<template>
  <div class="header">
    <Header />
  </div>
<!-- <div class="Apptop">
  <topHeader />
</div> -->


  <RouterView />
</template>

<style scoped lang="scss">
.header {
  width: 16dvw;
  height: 100dvh;
}

//這邊可以讓topheader浮出來
.Apptop{
  width: 100dvw;
  height: 5%;
  background-color: rgb(231, 195, 161);
}

.login{
    width: 8%;
    height: 3%;
    font-size: larger;
    margin-left: 60%;
    
}
</style>
