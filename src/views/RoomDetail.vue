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
        this.setPage(1)
    }
}
</script>

<template>
    <div class="bigArea">
        <table class="roomList">
            <tr>
                <th style="width: 4%;">項次</th>
                <th style="width: 7%;">地址</th>
                <th style="width: 35%;">樓層</th>
                <th style="width: 11%;">房號</th>
                <th style="width: 16%;">租金</th>
                <th style="width: 16%;">結束時間</th>
                <th style="width: 11%;">結果</th>
            </tr>

            <tr>
                <td style="width: 4%;"></td>
                <td style="width: 7%;">編號</td>
                <td style="width: 35%;">名稱</td>
                <td style="width: 11%;">狀態</td>
                <td style="width: 16%;">開始時間</td>
                <td style="width: 16%;">結束時間</td>
                <td style="width: 11%;">結果</td>
            </tr>
        </table>
    </div>
</template>

<style scoped lang="scss">
.bigArea{
    width: 80%;
    padding: 1%;
}
</style>