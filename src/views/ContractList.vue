<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import { RouterLink } from 'vue-router';

export default {
    data(){
        return {
            //儲存契約列表
            contractList: [],
            // 儲存搜尋對象過濾器
            contractFilters: {
                address: "",
                tenantName:"",
                startDate: "",
                endDate: ""
            },
            selectedContracts: [], // 新增選中(checkbox)的契約狀態,用於存儲選中的契約。
            statusFilter: "" ,// 新增狀態過濾器
            
        }
    },
    computed: {
        // 綁定 Pinia 狀態
        ...mapState(dataStore, ['loginObj','oneContractObj','roomObj'])
    },
    component:{
        RouterLink 
    },
    methods: {
    
        ...mapActions(dataStore, ['setOneContractObj','setRoomObj']),
        // 跳轉到新增契約頁面
        goToContractAdd() {
        // 使用 Vue Router 的方式進行跳轉
            this.$router.push({ name: 'contractAdd'}); 
        },
        //模糊搜尋過濾器
        search() {
        // 建立搜尋條件，依照地址、承租方姓名或租約日期進行搜尋
            let searchObj = {
                address: this.contractFilters.address,
                tenantName:this.contractFilters.tenantName,
                startDate: this.contractFilters.startDate,
                endDate: this.contractFilters.endDate,
            };
            console.log("Search Object:", searchObj);// 打印搜尋條件以供調試

            // 發送搜尋請求到後端
            fetch("http://localhost:8080/contract/contratSearch", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(searchObj)
            })
                .then(res => res.json())//將回應轉換為 JSON
                .then(data => {
                    console.log("所有契約(不分房東):", data);// 第一層:顯示所有契約(沒有包含特定房東)

                    // 第二層:篩選出當前身份證字號的契約問卷，即顯示特定房東的所有房間資訊
                    this.contractList = data.contractList.filter(item => item.ownerIdentity === this.loginObj.ownerIdentity);
                    console.log("只有當前房東的(篩選特定房東):", this.contractList);
                    // 計算總頁數
                    this.calculateTotalPages(this.contractList.length)
                })
                .catch(error => {
                console.error("Error fetching data:", error); //處理錯誤
            });
        },
        //搜尋房間

        searchRoom() { //搜尋房間
            console.log("input輸入的地址和房號",this.obj);
            fetch("http://localhost:8080/room/roomSearch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.obj)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("符合搜尋條件的結果",data)
                    // 篩選出當前account的問卷
                    this.roomList = data.roomList.filter(item => item.account === this.loginObj.ownerAccount);
                    console.log("篩選出當前登入者的所有房間",this.roomList)
                })
        },
// 計算總頁數
calculateTotalPages(totalItems) {
            const pageSize = 10; // 假設每頁顯示 10 筆資料
            const totalPages = Math.ceil(totalItems / pageSize);
            console.log("Total Pages:", totalPages); // 打印總頁數以供參考
        },
        // 設定契約狀態
        getContractStatus(contract) {//據當前日期和契約的開始及結束日期，判斷契約狀態。
            const now = new Date();
            const startDate = new Date(contract.startDate);
            const endDate = new Date(contract.endDate);
            if (now < startDate) {
                return "待生效";
            } else if (now >= startDate && now <= endDate) {
                return "出租中";
            } else if (now > endDate) {
                return "已結束";
            }
            return "空房"; // 假設沒有狀態時為空房
        },
        //篩選狀態
        filterByStatus(status) {
            // 根據選中的狀態過濾契約列表
            this.statusFilter = status; // 更新狀態過濾器
        },
        // 根據狀態過濾契約
        getFilteredContracts() {
            if (this.statusFilter === "") {
                return this.contractList;
            }
            return this.contractList.filter(contract => {
                const contractStatus = this.getContractStatus(contract);
                return contractStatus === this.statusFilter;
            });
        },
        // 顯示所有契約
        showAllContracts() {
            this.statusFilter = ""; // 清空狀態過濾器以顯示所有契約
        },

        //第三層:篩選特定房東的特定房間資訊
        selectRoomInfo(index){
            console.log("選特定房東的特定房間資訊",this.contractList[index]);//印出來供看console
            this.setOneContractObj(this.contractList[index]);
           
        },
        //找出該契約的房間資訊
        findRoomInfo() {
            //設定特定房間搜尋條件確保與所選契約的房間條件相符合
            let searchCriteria = {
                account: this.loginObj.ownerAccount,
                address: this.oneContractObj.address,
                roomId: this.oneContractObj.roomId,
                floor: this.oneContractObj.floor
            };

            fetch("http://localhost:8080/room/roomSearch", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(searchCriteria),
            })
            .then(res => res.json())
            .then(data => {
                this.roomInfoContract = data.roomList;
                console.log("特定房間資訊:",this.roomInfoContract)
                this.setRoomObj(this.roomInfoContract);
                console.log("pinia裡的roomObj",this.roomObj)
            });
        },
        // 計算總頁數
        calculateTotalPages(totalItems) {
            const pageSize = 10; // 假設每頁顯示 10 筆資料
            const totalPages = Math.ceil(totalItems / pageSize);
            console.log("Total Pages:", totalPages); // 打印總頁數以供參考
        },

    },
    created(){
        this.search(); // 組件創建時執行搜尋以獲取初始數據
    },   
    mounted(){
        console.log('此筆契約',this.oneContractObj);
    }
}
</script>

<template>
    <div class="manageArea">
    <!-- 搜尋欄 -->
    <div class="searchPlace">
        <div class="inputPlace">
            <span class="label">承租地址　：</span>
            <div class="InputContainer">
                <input placeholder="Search.." id="input" class="input" name="text" type="text" v-model="contractFilters.address">
            </div>
        </div>
        <div class="inputPlace">
            <span class="label">承租人姓名：</span>
            <div class="InputContainer">
                <input placeholder="Search.." id="input" class="input" name="text" type="text" v-model="contractFilters.tenantName">
            </div>
        </div>
        <!-- 選擇日期 -->
        <p class="datetime">
            <label for="start_time"  style="background-color:  #FFC89A;" >租約時間 從：</label>
            <input type="date" id="start" name="trip-start" min="1970-01-01" max="2050-12-31" style="font-size: 22px;">
            <label for="end_time" style="background-color:  #FFC89A;">到：</label>
            <input type="date" id="end" name="trip-end" min="1970-01-01" max="2050-12-31" style="font-size: 22px;">
            <button class="searchbtn" type="button" @click="search">搜尋</button>
        </p>
    </div>


        <!-- 狀態選擇按鈕 -->
        <div class="statusButtons">
            <button class="renting" @click="filterByStatus('出租中')" :class="{ active: statusFilter === '出租中' }">出租中</button>
            <button class="empty" @click="filterByStatus('空房')" :class="{ active: statusFilter === '空房' }">空房</button>
            <button class="goingtostart" @click="filterByStatus('待生效')" :class="{ active: statusFilter === '待生效' }">待生效</button>
            <button class="ended" @click="filterByStatus('已結束')" :class="{ active: statusFilter === '已結束' }">已結束</button>
            <!-- 顯示名下所有契約 -->
            <button class="all" @click="showAllContracts()" :class="{ active: statusFilter === '' }">顯示所有契約</button>
        </div>
 

    <!--租約列表 con=contract -->
    <div class="conlist">
        <table>
        <thead>
            <tr>
            
            <th>編號</th>
            <th>承租人</th>
            <th>狀態</th>
            <th>承租物件地址</th>
            <th>開始時間</th>
            <th>結束時間</th>
            <th>租金</th>
            <th>契約中止編輯</th>
            <th>查看詳情</th>
            </tr>
        </thead>
        <tbody>
            <!-- item 是在 v-for 循環中定義的一個臨時變量，用來表示 contractList 陣列中的每個元素 -->
            <!-- index 是每次迭代過程中的當前索引值。在這裡是指 contractList 陣列中每個元素的索引位置。 -->
            <tr v-for="(item, index) in getFilteredContracts()" :key="index">
                <!-- <td><input type="checkbox" v-model="selectedContracts" :value="item.ai"></td> -->
                <td>{{ item.roomId }}</td>
                <td>{{ item.tenantName }}</td>
                <td>{{  getContractStatus(item) }}</td>
                <td>{{ item.address }}</td>
                <!-- 這邊還要再寫另一個方法來獲取狀態 -->
                <td>{{ item.startDate }}</td>
                <td>{{ item.endDate }}</td>
                <td>{{ item.rentP }}</td>
                <td><RouterLink to="/Contract_Detail" @click="selectRoomInfo(index)"> 契約中止編輯</RouterLink></td>
                <td><RouterLink to="/Contract_Detail" @click="selectRoomInfo(index); $nextTick(findRoomInfo)"> 查看詳情</RouterLink></td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
</template>

    <style scoped lang="scss">
    *{margin-top: 5%;}
    .manageArea {
        width: 100dvw;
        height: 100dvh;
        border: 1em solid #9a685200;
        //border-style:  inset;
        margin-left: 25%;  // 移除 margin-left，並將 margin 設定為 auto
        padding-top: 0;  // 確保 padding-top 為 0
        background-color: #FAF0E9;
    //搜尋欄文字背景顏色
    .label{
        background-color: #FFC89A; ;
    }
    }
//搜尋
    .searchPlace {
        width: 66%;
        height: 35%;
        color: black;
        font-size: 22px;
        background-color: #FFC89A;
        border: 1em solid #fae1cd;
        text-align: left;
        margin-top: 5%;
        margin-left: 7%;
        padding: 3% 3% 5% 3%;}
    

    .inputPlace {
        display: flex; /* 使用 Flexbox 使元素並排 */
        align-items: center; /* 垂直居中對齊 */
        margin-top: -5%;
        margin-bottom: 2%; /* 可以根據需要調整間距 */
        background-color: #FFC89A;
    }
//搜尋欄
    .InputContainer {
        width: 600px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        // background: linear-gradient(to bottom, #FF9D60, rgb(255, 231, 231));
        border-radius: 30px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 2px 2px 2px rgba(163, 162, 162, 0.075);
        display: inline-block;
        vertical-align: middle; /* Optional: Align vertically */
        // flex: 1; /* 彈性增長，使 input 容器占據剩餘空間 */
    }

    .input {
        width: 600px;
        height: 40px;
        // caret-color: rgb(255, 81, 0);
        // background-color: rgb(255, 255, 255);
        border-radius: 30px;
        padding-left: 15px;
        letter-spacing: 0.8px;
        color: rgb(19, 19, 19);
        font-size: 22px;
    }

    .datetime {
        margin-top: 2%;
        background-color: #FFC89A;
    }

//搜尋按鈕
    .searchbtn {
        margin-left: 3%;
        width: 90px;
        height: 40px;
        color: white;
        font-size: 22px;
        border: 2px solid white;
        border-radius: 50px;
        background-color: #9A6852;
        transition: 0.2s;
    }

    .searchbtn:hover {
        color: #9A6852;
        background-color: #eed89a;
        transform: scale(1.1); /* 在hover時縮放按鈕 */
    }

    .searchbtn:active {
        color: #9A6852;
        font-size: 600;
        font-size: medium;
        transform: scale(0.95); /* 在active時縮小按鈕 */
    }
    
    .conlist {
        width: 135dvh;
        height: auto;
        margin-top: 1%;
        
        color: black;
        background-color: antiquewhite;
        border: none;
        text-align: center;
        overflow: hidden;
        border-radius: 0px 0px 0px 0px;
        box-shadow: 0 0 10px rgba(167, 147, 147, 0.541);
    }

    table {
        font-family: 'Oswald', sans-serif;
        border-collapse: collapse;
    }

    th {
        background-color: #FFC89A;
        color: #110f0f;
        width: 25vw;
        height: 70px;
        font-size: 22px;
    }

    td {
        background-color: #ffffff;
        width: 25vw;
        height: 50px;
        text-align: center;
    }

    tr {
        border-bottom: 1px solid #dddddd;
    }

    tr:last-of-type {
        border-bottom: 2px solid rgb(173, 102, 60);
    }

    tr:nth-of-type(even) td {
        background-color: #f3f3f3;
    }


  


//狀態按鈕
.statusButtons{
    width: 80dvw;
    display: flexbox;
    color: #110f0f;
    font-size: 18px;
    margin-top: 0;
 :active{
    font-size:20px;
    font-weight: 600;
 }

    .renting{
        margin-bottom: 26px;
        margin-left: 54px;
        width: 12%;
        height: 30px;
        border: 0px;
        background-color: #f9ddc6;
        border-radius: 20px;
        
        &:hover {
        background-color: #f0c49f;
        }
    }
    .empty{
        margin-bottom: 26px;
        margin-left: 54px;
        width: 12%;
        height: 30px;
      
        border: 0px;
        background-color: #fcc395;
        border-radius: 20px;
        &:hover {
        background-color: #f0c49f;
        }
    }
    .goingtostart{
        margin-bottom: 26px;
        margin-left: 54px;
        width: 12%;
        height: 30px;
       
        border: 0px;
        background-color: #f9ddc6;
        border-radius: 20px;
        &:hover {
        background-color: #f0c49f;
        }
    }
    .ended{
        margin-bottom: 26px;
        margin-left: 54px;
        width: 12%;
        height: 30px;
      
        border: 0px;
        background-color: #fcc395;
        border-radius: 20px;
        &:hover {
        background-color: #f0c49f;
        }
    }

    .all{
        margin-bottom: 26px;
        margin-left: 54px;
        width: 12%;
        height: 30px;
      
        border: 0px;
        background-color: #ebcbcb;
        border-radius: 20px;
        &:hover {
        background-color: #f0c49f;
        }
    }
}

</style>
  



