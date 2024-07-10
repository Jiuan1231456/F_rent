<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import Login from "./Login.vue";

export default {
    data() {
        return {
        //在 data 方法中定義 showPopup 和 showForm 兩個狀態變量來控制顯示和隱藏。
        showPopup: false,
        showForm: false,
        };
    },
    methods: {
        //顯示彈跳視窗
        customizeWindowEvent() {
        this.showPopup = true;
        },
        //在點擊彈窗外部時關閉彈窗
        closePopup(event) {
        if (event.target.id === 'window-container') {
            this.showPopup = false;
        }
        },
        //點擊連結時切換表單的顯示和隱藏
        toggleForm() {
        this.showForm = !this.showForm;
        },
    },
    components:{
        Login
    }
};
</script>

<template>
<div class="top">

<Login/>
</div>

</template>

<style scoped lang="scss">

.top{
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