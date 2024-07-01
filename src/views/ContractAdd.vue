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
        ...mapActions(dataStore,['setPage'])
    },
    mounted(){
        this.setPage(4)
    }
}
</script>

<template>
    <h2>這是新增租約頁面</h2>
    <p>{{ this.page }}</p>
</template>

<style scoped lang="scss">

</style>