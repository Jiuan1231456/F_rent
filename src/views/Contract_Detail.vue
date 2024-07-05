<script>
import dataStore from "@/stores/dataStore";
import { mapState } from "pinia";
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            // 儲存契約列表
            contractList: [],
            // 儲存搜尋對象過濾器
            contractFilters: {
                address: "",
                tenantName: "",
                startDate: "",
                endDate: ""
            },
            selectedContracts: [], // 新增選中的契約狀態，用於存儲選中的契約
            loginObj: { // 添加 loginObj 並初始化為空物件
                ownerIdentity: ""
            },
            selectedContract: null // 用於存儲選中的契約詳情
        }
    },
    computed: {
        // 綁定 Pinia 狀態
        // 'oneContractObj' 在 pinia 檔裡的 state
        ...mapState(dataStore, ['oneContractObj'])
    },
    components: {
        RouterLink 
    },
    methods: {
        // 模糊搜尋過濾器
        search() {
            // 建立搜尋條件，依照地址、承租方姓名或租約日期進行搜尋
            let searchObj = {
                address: this.contractFilters.address,
                tenantName: this.contractFilters.tenantName,
                startDate: this.contractFilters.startDate,
                endDate: this.contractFilters.endDate,
            };
            console.log("Search Object:", searchObj); // 打印搜尋條件以供調試

            // 發送搜尋請求到後端
            fetch("http://localhost:8080/contract/contratSearch", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(searchObj)
            })
            .then(res => res.json()) // 將回應轉換為 JSON
            .then(data => {
                console.log("所有契約(不分房東):", data); // 第一層:顯示所有契約(沒有包含特定房東)

                // 第二層:篩選出當前身份證字號的契約，即顯示特定房東的所有房間資訊
                this.contractList = data.contractList.filter(item => item.ownerIdentity === this.loginObj.ownerIdentity);
                console.log("只有當前房東的(篩選特定房東):", this.contractList);

                // 計算總頁數
                this.calculateTotalPages(this.contractList.length);
            })
            .catch(error => {
                console.error("Error fetching data:", error); // 處理錯誤
            });
        },
        // 第三層:篩選特定房東的特定房間資訊
        selectRoomInfo(index) {
            this.selectIndex = index;
            console.log("選特定房東的特定房間資訊", this.contractList[index]);
        },
        // 計算總頁數
        calculateTotalPages(totalItems) {
            const pageSize = 10; // 假設每頁顯示 10 筆資料
            const totalPages = Math.ceil(totalItems / pageSize);
            console.log("Total Pages:", totalPages); // 打印總頁數以供調試
        },
    },
    created() {
        this.selectedContract = this.$route.params.contract; // 從路由參數中獲取選中的契約資料
        console.log("選中的契約詳情:", this.selectedContract);
    },
    mounted() {}
}
</script>

<template>
    <div class="contract-details">
        <h1>契約詳情</h1>
        <div v-if="selectedContract">
            <p>承租人姓名: {{ selectedContract.tenantName }}</p>
            <p>租約地址: {{ selectedContract.address }}</p>
            <p>租約開始時間: {{ selectedContract.startDate }}</p>
            <p>租約結束時間: {{ selectedContract.endDate }}</p>
            <p>租金: {{ selectedContract.rentP }}</p>
            <!-- 顯示更多契約詳情 -->
        </div>
        <div v-else>
            <p>未選擇任何契約</p>
        </div>
    </div>
</template>




<style scoped lang="scss">
.bigArea {
    margin-left: 20%;
    width: 60%;
    margin: auto;
    font-size: 18px;
}

.contractList ul {
    list-style-type: none;
    padding: 0;
}

.contractList li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.contractList button {
    margin-left: 10px;
}
</style>

