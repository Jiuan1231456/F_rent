<script>
import searchInput from "@/components/searchInput.vue";
import { RouterLink } from "vue-router";
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import electricModal from "@/components/electricModal.vue";
export default {
  data() {
    return {
      elecModal: false,
      changeIf: "no",
      newBillSearch: [],
      newnewBillSearch: [],
      cutDateBill:[]
      cutDateBill: [],
    };
  },
  components: {
@@ -30,11 +30,18 @@ export default {
    ]),
  },
  methods: {
    ...mapActions(dataStore, ["setPage", "setPerBill","setFinalBill","setBillToContract"]),
    ...mapActions(dataStore, [
      "setPage",
      "setPerBill",
      "setFinalBill",
      "setBillToContract",
    ]),
    showElectric() {
      // 更新帳單資料的彈跳視窗的開關
      this.elecModal = !this.elecModal;
    },
    search() {  // 篩出房東和截止日前的帳單
    search() {
      // 篩出房東和截止日前的帳單
      let empty = {};
      // 讓當天日期變成post欄位stardate的值
      let today = new Date();
@@ -64,19 +71,24 @@ export default {
            (item) => item.paymentDate > todayStr
          );
          console.log("未截止", this.newnewBillSearch);
          this.newnewBillSearch.sort((a, b) => {
        return new Date(a.paymentDate) - new Date(b.paymentDate);
      });
        });
    },
    bringToEdit(index) { // 將選擇的帳單帶到輸入用電量的視窗
    bringToEdit(index) {
      // 將選擇的帳單帶到輸入用電量的視窗
      // this.newnewBillSearch[index];
      this.setPerBill(this.newnewBillSearch[index]);
      console.log("選的帳單", this.perBill);
      this.perBill.eletricV = "";
    },
    updateElectricV(){  // 更新用電量
    updateElectricV() {
      // 更新用電量
      let electricObj = {
        ai:this.perBill.ai,
        eletricV:this.perBill.eletricV
      }
        ai: this.perBill.ai,
        eletricV: this.perBill.eletricV,
      };
      fetch("http://localhost:8080/bill/updateBill", {
        method: "post",
        headers: {
@@ -88,10 +100,11 @@ export default {
        .then((data) => {
          console.log("更新完用電量的", data);
          this.setFinalBill(data.billList[0]);
          console.log("pinia裡的finalBill",this.finalBill);
          console.log("pinia裡的finalBill", this.finalBill);
        });
    },
    findCutDate(){
    findCutDate() {
      // // 篩出對應帳單的契約 => 先抓到全部租約，再一層一層篩
      let empty = {};
      fetch("http://localhost:8080/contract/contratSearch", {
        method: "post",
@@ -104,17 +117,24 @@ export default {
        .then((data) => {
          console.log(data);
          this.cutDateBill = data.contractList.filter(
            (item) => (item.ownerName === this.loginObj.ownerName) && (item.tenantIdentity === this.perBill.tenantIdentity) && (item.address === this.perBill.address)
            (item) =>
              item.ownerName === this.loginObj.ownerName &&
              item.tenantIdentity === this.perBill.tenantIdentity &&
              item.address === this.perBill.address
          );
          console.log("篩出此筆帳單的租約",this.cutDateBill);
          console.log("篩出此筆帳單的租約", this.cutDateBill);
          this.setBillToContract(this.cutDateBill);
        });
    }
    },
    sortByPaymentDate() {
      this.newnewBillSearch.sort((a, b) => {
        return new Date(a.paymentDate) - new Date(b.paymentDate);
      });
    },
  },
  mounted() {
    this.setPage(10);
    this.search();
    
  },
};
</script>
@@ -145,7 +165,9 @@ export default {
            <td scope="col" class="thead">承租人</td>
            <td scope="col" class="thead">地址</td>
            <td scope="col" class="thead">計費期間</td>
            <td scope="col" class="thead">繳費期限</td>
            <td scope="col" class="thead">
              繳費期限
            </td>
            <td scope="col" class="thead">選擇此筆</td>
          </tr>
        </thead>
@@ -162,7 +184,6 @@ export default {
                @click="
                  this.showElectric();
                  this.bringToEdit(index);
                  
                "
              >
                選擇
@@ -205,7 +226,18 @@ export default {
        </template>
        <template v-slot:footer>
          <div class="footerArea">
            <RouterLink to="/billFinalDetail"><button type="submit" class="submit" @click="this.updateElectricV();this.findCutDate();">提交</button></RouterLink>
            <RouterLink to="/billFinalDetail"
              ><button
                type="submit"
                class="submit"
                @click="
                  this.updateElectricV();
                  this.findCutDate();
                "
              >
                提交
              </button></RouterLink
            >
          </div>
        </template>
      </electricModal>
  45 changes: 17 additions & 28 deletions45  
src/views/BillList.vue
Copied!
Original file line number	Diff line number	Diff line change
@@ -33,21 +33,18 @@ export default {
  },
  computed: {
    ...mapState(dataStore, ["page", "loginObj", "monthBill", "billObj"]),
    totalpages() {
      // 計算搜尋結果總頁數
    totalpages() {  // 計算搜尋結果總頁數
      return Math.ceil(this.newnewBillSearch.length / this.itemsPerPage);
    },
    calData() {
    calData() {  // 資料分頁
      console.log("開始要算分頁的資料", this.newnewBillSearch);
      // 資料分頁
      // 起始索引位置 : 當前頁數1，共 10筆，因此當頁資料起始位置為0，第一頁的資料為0-10筆
      const startPage = (this.currentPage - 1) * this.itemsPerPage;
      const endPage = startPage + this.itemsPerPage;
      // slice : 從 newBillSearch 中提取從 startPage 到 endPage 的數據，但不包含 endPage
      return this.newnewBillSearch.slice(startPage, endPage);
    },
    calPages() {
      // 動態生成頁碼
    calPages() { // 動態生成頁碼
      let pages = []; // 將全部頁碼變成一個陣列
      const total = this.totalpages;
      // 從 1 遍歷到總頁數，生成對應的頁碼
@@ -60,7 +57,7 @@ export default {
  },
  methods: {
    ...mapActions(dataStore, ["setPage", "setBillObj", "setMonthBill"]),
    search() {
    search() {  // 帳單列表搜索
      let searchObj = {
        address: this.billFilters.address,
        tenantName: this.billFilters.tenantName,
@@ -88,7 +85,7 @@ export default {
          console.log("全部房東的", data);
          //   this.newBillSearch = data
          this.newBillSearch = data.billList.filter(
            (item) => item.ownerName === this.loginObj.ownerName
            (item) => (item.ownerName === this.loginObj.ownerName)
          );
          console.log("只有現在房東的", this.newBillSearch);
          this.newnewBillSearch = this.newBillSearch.filter(
@@ -98,14 +95,12 @@ export default {
          this.cacheNewnewBillSearch = this.newnewBillSearch;
        });
    },
    bringToDetail(index) {
      // 偵測到選的帳單並存到pinia
    bringToDetail(index) { // 偵測到選的帳單並存到pinia
      this.setBillObj(this.newnewBillSearch[index]);
      console.log('選的帳單',this.newBillSearch[index]);
      index = "";
    },
    generateBill() {
      // 帳單生成
    generateBill() { // 帳單生成
      // 讓當天日期變成post欄位stardate的值
      let today = new Date();
      let month = today.getMonth() + 1;
@@ -135,37 +130,31 @@ export default {
          console.log("pinia裡的當期帳單", this.monthBill);
        });
    },
    nextPage() {
      // 分頁功能：下一頁
    nextPage() { // 分頁功能：下一頁
      // 如果當前頁數比總頁數小，當前頁數 + 1 (翻到下一頁)
      if (this.currentPage < this.totalpages) {
        this.currentPage++;
      }
    },
    prevPage() {
      // 分頁功能：上一頁
    prevPage() { // 分頁功能：上一頁
      // 如果當前頁數不是1，當前頁數 - 1 (翻到前一頁)
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    changePage(page) {
      // 分頁功能：跳轉到指定頁
    changePage(page) { // 分頁功能：跳轉到指定頁
      this.currentPage = page;
    },
    handleFocus(input) {
      // 偵測輸入框被選到
    handleFocus(input) { // 偵測輸入框被選到
      this[`input${input}`].isFocused = true;
    },
    handleBlur(input) {
      // 偵測輸入框沒被選到
    handleBlur(input) { // 偵測輸入框沒被選到
      this[`input${input}`].isFocused = false;
    },
    checkContentAdd(input) {
      // 偵測地址輸入框有無填東西
    checkContentAdd(input) { // 偵測地址輸入框有無填東西(地址搜尋框)
      this[`input${input}`].hasContent = this.billFilters.address.length > 0;
    },
    checkContentName(input) {
    checkContentName(input) { // 偵測地址輸入框有無填東西(承租人搜尋框)
      this[`input${input}`].hasContent = this.billFilters.tenantName.length > 0;
    },
    tenantStatus(start, end) {  // 區分承租中和契約結束的狀態
@@ -180,13 +169,13 @@ export default {
        return "承租中"
      }
    },
    filterTenanting(){
    filterTenanting(){  // 篩出承租中的所有帳單
      this.newnewBillSearch = this.cacheNewnewBillSearch.filter(item => this.tenantStatus(item.startDate,item.endDate) === "承租中");
    },
    filterEnded(){
    filterEnded(){ // 篩出契約結束的所有帳單
      this.newnewBillSearch = this.cacheNewnewBillSearch.filter(item => this.tenantStatus(item.startDate,item.endDate) === "契約已結束");
    },
    filterAll(){
    filterAll(){  // 篩出全部帳單
      this.newnewBillSearch = this.cacheNewnewBillSearch;
    }
  },
  created() {},
  mounted() {
    this.setPage(11);
    this.search();
  },
};
</script>
<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <div class="bigArea">
    <!-- <span class="billTitle">帳單列表</span> -->
    <div class="searchArea">
      <span class="searchTitle">搜尋</span>
      <label
        for="tenantName"
        class="subTitleColor"
        style="top: 1px; left: 167px"
        :class="{ active: inputname.isFocused || inputname.hasContent }"
        >依承租人
      </label>
      <!-- <span name="tenantName" class="subTitle" style="top: 1px;left: 167px;">依承租人</span> -->
      <input
        class="searchInput"
        id="tenantName"
        type="text"
        v-model="this.billFilters.tenantName"
        :class="{ active: inputname.isFocused || inputname.hasContent }"
        @focus="handleFocus('name')"
        @blur="handleBlur('name')"
        @input="checkContentName('name')"
      /><br />
      <label
        for="address"
        class="subTitleColor"
        style="top: 1px; left: 395px"
        :class="{ active: inputaddress.isFocused || inputaddress.hasContent }"
        >依地址</label
      >
      <!-- <span class="subTitle" name="address" style="top: 1px;left: 395px;">依地址</span> -->
      <input
        class="searchInput"
        type="text"
        id="address"
        :class="{ active: inputaddress.isFocused || inputaddress.hasContent }"
        @focus="handleFocus('address')"
        @blur="handleBlur('address')"
        @input="checkContentAdd('address')"
        v-model="this.billFilters.address"
        style="position: absolute; top: 28px; left: 339px; width: 350px"
      />
      <button class="searchBtn" @click="this.search()">
        <i
          class="fa-solid fa-magnifying-glass"
          style="font-size: 23px; background-color: transparent"
        ></i>
      </button>
      <br />
      <label for="start" class="start"
        >契約起日&emsp;<input
          type="date"
          id="start"
          v-model="this.billFilters.periodStart"
      /></label>
      <span style="position: absolute; top: 97px; left: 385px">到</span>
      <label for="end" class="end"
        >契約迄日&emsp;<input
          type="date"
          id="start"
          v-model="this.billFilters.periodEnd"
      /></label>
      <br />
      <span class="searchTitle" style="position: absolute; bottom: 16%"
        >承租狀態</span
      >
      <button class="typeBtn" @click="filterAll()" style="position: absolute; bottom: 6%; left: 16%">
        全部
      </button>
      <button class="typeBtn" @click="filterTenanting()" style="position: absolute; bottom: 6%; left: 32%">
        承租中
      </button>
      <button class="typeBtn" @click="filterEnded()" style="position: absolute; bottom: 6%; left: 48%">
        契約已結束
      </button>
      <button
        class="generate"
        style="position: absolute; bottom: 6%; right: 0%"
        @click="this.generateBill(new Date())"
      >
        <RouterLink
          to="/generatebill"
          style="
            background-color: transparent;
            text-decoration: none;
            color: white;
          "
          >帳單生成</RouterLink
        >
      </button>
    </div>
    <div class="listArea">
      <table class="contract">
        <thead>
          <th scope="col" class="thead">編號</th>
          <th scope="col" class="thead">承租人</th>
          <th scope="col" class="thead">地址</th>
          <th scope="col" class="thead">房號</th>
          <th scope="col" class="thead">承租狀態</th>
          <th scope="col" class="thead">計費起日</th>
          <th scope="col" class="thead">計費迄日</th>
        </thead>
        <tbody>
          <tr class="content" v-for="(item, index) in this.calData">
            <td>{{ index + 1 }}</td>
            <td>
              <RouterLink
                to="/BillDetail"
                class="tenantName"
                @click="this.bringToDetail(index)"
                >{{ item.tenantName }}</RouterLink
              >
            </td>
            <td>{{ item.address }}</td>
            <td>{{ item.roomId }}</td>
            <td>{{ this.tenantStatus(item.startDate,item.endDate)}}</td>
            <td>{{ item.periodStart }}</td>
            <td>{{ item.periodEnd }}</td>
          </tr>
        </tbody>
      </table>
      <div class="changePage">
        <!-- 上一頁和下一頁按鈕： :disabled 表示在當前頁數 === 特定位置時禁用(不能按) -->
        <button
          class="prevpage page"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          <
        </button>
        <button
          v-for="page in calPages"
          :key="page"
          class="otherPages page"
          @click="this.changePage(page)"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
        <button
          class="nextpage page"
          @click="nextPage"
          :disabled="currentPage === totalpages"
        >
          >
        </button>
        <!-- <div class="totalPage">總頁數: {{totalpages}}</div> -->
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bigArea {
  width: 80%;
  height: 100%;
  .billTitle {
    font-size: 2.3em;
    font-weight: 500;
    letter-spacing: 5px;
  }
}
.searchArea {
  width: 90%;
  height: 42dvh;
  margin: 2% 0%;
  border-radius: 24px;
  padding: 2%;
  padding-bottom: 0;
  padding-left: 5%;
  background: transparent;
  margin-bottom: 1%;
  position: relative;
  .fa-solid {
    &:hover {
      color: #dabe9e;
    }
  }
  .start {
    position: absolute;
    top: 41%;
    left: 18%;
  }
  .end {
    position: absolute;
    top: 41%;
    right: 29%;
  }
  .searchTitle {
    font-size: 1.7em;
    background-color: transparent;
  }
  // .subTitleColor{
  //   position: absolute;
  //   color: #c4c4c4;
  //   &:focus{
  //     color: #000000;
  //   }
  // }
  .subTitleColor {
    position: absolute;
    color: #c4c4c4;
  }
  .subTitleColor.active {
    color: #000000;
  }
  .subTitle {
    position: absolute;
    background-color: transparent;
  }
  .searchInput {
    margin-bottom: 26px;
    margin-left: 54px;
    margin-right: 30px;
    padding-left: 10px;
    width: 200px;
    border: 1.5px solid #c4c4c4;
    border-radius: 10px;
    height: 32px;
    outline: none;
    // &:focus{
    //   border-color: black;
    // }
  }
  .searchInput.active {
    border-color: black;
  }
  .typeBtn {
    margin-bottom: 26px;
    margin-left: 54px;
    width: 12%;
    height: 14%;
    color: rgb(255 99 1);
    border: 0px;
    background-color: #f9ddc6;
    border-radius: 20px;
    &:hover {
      background-color: #f0c49f;
    }
  }
  .searchBtn {
    border: 0px;
    background-color: transparent;
    position: absolute;
    top: 100px;
    right: 142px;
  }
  .generate {
    border: none;
    background-color: #f54545;
    color: white;
    width: 10%;
    height: 18%;
    border-radius: 5px;
    font-size: 1.2em;
    position: absolute;
    // top: 30%;
    // right: 5%;
    &:hover {
      cursor: pointer;
      background-color: #ef9a95;
    }
  }
}
.listArea {
  width: 94%;
  height: 100dvh;
  .contract {
    width: 100%;
    // height: 100%;
    border-collapse: collapse;
    background-color: #cdc6a5;
    text-align: center;
  }
  .tenantName {
    background-color: transparent;
    text-decoration: none;
  }
  .thead {
    background-color: #ff9b5cc2;
    border: white;
    padding: 1%;
    height: 47px;
  }
  .content {
    text-align: center;
    height: 50px;
  }
  //   tr{
  //     display: block;
  //     float: left;
  //   }
  td {
    background-color: #f9ddc6;
    padding: 5px;
    // display: block;
  }
  //   th{
  //     display: block;
  //   }
  tr:nth-of-type(odd) td {
    background-color: #ebebeb9e;
  }
  .changePage {
    width: 73%;
    margin: 15px auto;
    display: flex;
    justify-content: space-evenly;
    padding: 7px 0;
  }
  button.page {
    border: none;
    border-radius: 50px;
    width: 30px;
    height: 30px;
    font-weight: 700;
    color: #5d411c;
  }
  .nextpage,
  .prevpage {
    background: #fec799;
    &:hover {
      background-color: #f9ddc6;
    }
  }
  .otherPages {
    background-color: #f9ddc6;
    &:hover {
      background: #fec799;
    }
  }
  button:disabled {
    cursor: not-allowed;
    color: #a2a1a1;
    background-color: #e1e1e1d3;
  }
}
</style>