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
        ...mapActions(dataStore ,['setPage'])
    },
    mounted(){
        this.setPage(13)
    }
}
</script>

<template>
    <div class="middleArea">
        <h1 style="margin-bottom: 30px;">XXX 房東，您好</h1>
        <div class="deadlineBox mainBox">
        <span class="title">即將到期</span>
            <div class="box1 box" style="left: 138px;">租約</div>
            <div class="box1 box" style="right: -10px;">帳單</div>
        </div>
        <div class="roomBox mainBox">
        <span class="title">房間狀態</span>
            <div class="box2 box" style="left: 138px;">總數</div>
            <div class="box2 box"  style="left: 463px;">出租中</div>
            <div class="box2 box" style="right: -10px;">空房</div>
        </div>
        <div class="electricBox mainBox">
        <span class="title">用電狀態</span>
            <div class="box3 box">上期用電量最大</div>
            <div class="box3 box">上期與本期用電量相差最大</div>
        </div>
    </div>
    
</template>

<style scoped lang="scss">
.middleArea{
    margin-left: 20%;
    margin-top: 3%;
    width: 100%;
    height: 100dvh;
}
.title{
    font-size: 2em;
    font-weight: 500;
    margin-top: 1%;
    writing-mode: vertical-rl;
    position: absolute;
    left: 40px;
}
.mainBox{
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    width: 80%;
    height: 23%;
    position: relative;
}
.box{
    border: none;
    border-radius: 10px;
    background-color: #f9ddc6;
}
.box1{
    width: 30%;
    height: 63%;
    top: 17px;
    position: absolute;
}
.box2{
    width: 13%;
    height: 63%;
    position: absolute;
    top: 27px;
}
</style>