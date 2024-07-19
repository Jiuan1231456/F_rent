<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from"./components/Header.vue"


</script>

<template>
  <div class="header">

    <Header  />
  </div>
<div class="top">

</div> 


  <RouterView />
</template>

<style scoped lang="scss">

.header {
  width: 23dvw;
  height: 100dvh;
  z-index: 2;
  background-color: transparent;
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
    z-index: 1;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> aca9b7ef24b6d20c4d947f3164c8d848240eb57e
