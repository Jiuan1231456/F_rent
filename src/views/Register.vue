<!-- 房東註冊頁面(只有房東需要註冊) -->
<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data(){
        return {
            owner_account:"",
            owner_pwd:"",
            owner_identity:"",
            owner_name:"",
            owner_email:"",
            owner_phone:"",

            registerList:[],//存放註冊資訊
        }
    },
    computed: {
        //
        ...mapState(dataStore, ['registerObj'])
    },
    methods: {
        ...mapActions(dataStore,['setRegisterObj']),
        
        register(){
            let registerObj1 = {
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
    
    }
}
</script>

<template>

<div class="inputdiv">

<p>帳號:<input type="text"></p>
<p>密碼:<input type="text"></p>
<p>真實姓名:<input type="text"></p>
<p>身分證字號:<input type="text"></p>
<p>手機號:<input type="text"></p>
<p>電子郵件:<input type="text"></p>

</div>





</template>

<style scoped lang="scss">

</style>