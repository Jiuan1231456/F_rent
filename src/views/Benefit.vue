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
        this.setPage(3)
    }
}
</script>

<template>
    <div class="middleArea">
        <h1>這是收益頁面</h1>
        <h3>{{ this.page }}</h3>
        <h6>測試用</h6>
    </div>
    
</template>

<style scoped lang="scss">

</style>