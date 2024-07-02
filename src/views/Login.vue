<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data(){
        return {
            owner_account:"",
            owner_pwd:""
        }
    },
    computed: {
        ...mapState(dataStore, ['page','loginObj'])
    },
    methods: {
        ...mapActions(dataStore ,['setPage','setLoginObj']),
        login(){
            let loginObj1 = {
                owner_account: this.owner_account,
                owner_pwd: this.owner_pwd,
      };
      // url
      fetch("http://localhost:8080/rent/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObj1),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        this.setLoginObj(data);
        console.log('pinia裡的',this.loginObj);
        });
        }
    },
    mounted(){
        this.setPage(1)
    }
}
</script>

<template>
    <div class="middleArea">
        <label for="account">帳號</label>
        <input type="text" id="account" v-model="this.owner_account">
        <label for="pwd">密碼</label>
        <input type="text" id="pwd" v-model="this.owner_pwd">
        <button type="submit" @click="login()">確認</button>
    </div>
    
</template>

<style scoped lang="scss">

</style>