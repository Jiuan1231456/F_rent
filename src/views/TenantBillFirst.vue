<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default{
    data(){

    },
    components:{
        
    },
    computed:{
        ...mapState(dataStore, ["tenantData","page"]),
    },
    methods:{
        ...mapActions(dataStore, ["setPage",]),
    },
    mounted(){
        this.setPage(12);
    }
}
</script>

<template>

</template>

<style scoped lang="scss">

</style>