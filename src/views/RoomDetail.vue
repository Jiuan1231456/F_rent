<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState(dataStore, ['page'])
    },
    methods: {
        ...mapActions(dataStore, ['setPage'])
    },
    mounted() {
        this.setPage(4)
    }
}
</script>

<template>

</template>

<style scoped lang="scss">

</style>