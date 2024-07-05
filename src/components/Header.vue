<script>
import { RouterLink, RouterView } from "vue-router";
import dataStore from "../stores/dataStore";
import { mapState } from "pinia";
export default {
  // 在 template 當標籤使用的方法或是元件，import進來後要宣告在components:{}裡面
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(dataStore, ["page"]),
  },
  methods: {},
};
</script>

<template>
  <div class="headerArea">
    <RouterLink
      class="routerItem"
      :class="{ selectedPage: this.page === 1 }"
      to="/"
      >登入</RouterLink
    >
    <RouterLink
      class="routerItem"
      :class="{ selectedPage: this.page === 2 }"
      to="/roomdetail"
      >房間資訊</RouterLink
    >
    <RouterLink
      class="routerItem"
      :class="{ selectedPage: this.page === 3 }"
      to="/addroom"
      >新增房間</RouterLink
    >
    <RouterLink
      class="routerItem"
      :class="{ selectedPage: this.page === 6 }"
      to="/ContractList"
      >租約管理列表</RouterLink
    >
    <RouterLink
      class="routerItem"
      :class="{ selectedPage: this.page === 7 }"
      to="/contractAdd"
      >新增租約</RouterLink
    >
<!-- accordion 下拉式選單 from bootstrap套件 -->
<div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <!-- 下拉式選單的標題按鈕，按下去並不會開啟頁面，只會展開內部選項 -->
        <button  
          class="dropdownBtn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
          style="width: 100%; border:0px;border-left: 16px solid #ffc89a;"
        >
          帳單管理
        </button>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
        <!-- accordion-body 是下拉式選單的選項區，一個routerlink一個選項，按下去同時展開頁面 -->
          <div class="accordion-body">
            <RouterLink
              class="dropdownItem"
              :class="{ selectedPage: this.page === 11 }"
              to="/lookupBill"
              >帳單列表</RouterLink
            >
            <RouterLink
              class="dropdownItem"
              :class="{ selectedPage: this.page === 10 }"
              to="/bill"
              >帳單生成</RouterLink
            >
            </div>
          </div>
        </div>
      </div>


  
    <!-- <RouterLink
      class="routerItem"
      :class="{ selectedPage: this.page === 11 }"
      to="/benefit"
      >觀看收益</RouterLink
    > -->
   
  </div>
</template>

<style scoped lang="scss">
.headerArea {
  height: 100dvh;
  width: 16%;
  background-color: #ffc89a;
  padding-top: 5%;
  position: fixed;

  .routerItem {
    color: black;
    background-color: #ffc89a;
    text-decoration: none;
    font-size: 22px;
    display: flex;
    letter-spacing: 8px;
    justify-content: center;
    padding: 5%;
    &:hover {
      cursor: pointer;
      background-color: #ff9d60;
      font-weight: 400;
      border-left: 16px solid #ffc89a;
      border-radius: 11% 0px 0px 11%;
    }
  }
  .accordion-body {
    padding: 0;
    background-color: #ffc89a;
    // padding-left: 33px;
  }
  .accordion-item {
    border: 0px;
    background-color: #ffc89a;
  }
  .dropdownBtn {
    color: black;
    background-color: #ffc89a;
    text-decoration: none;
    font-size: 22px;
    display: flex;
    letter-spacing: 8px;
    justify-content: center;
    padding: 5%;
    &:hover {
      cursor: pointer;
      background-color: #ff9d60;
      font-weight: 400;
      border-left: 16px solid #ffc89a;
      border-radius: 11% 0px 0px 11%;
      padding-left: 10px;
      padding-bottom: 10px;
    }
    &:checked {
      background-color: #ff9d60;
    }
  }
  .dropdownBtn[aria-expanded="true"] { /* [aria-expanded="true"] => 列表展開 ; false : 列表縮起 */
    background-color: #f6b47d; /* 展開時的背景顏色 */
  }
  .dropdownItem {
    background-color: #f2dcca;
    font-size: 18px;
    justify-content: center;
    height: 45px;
    width: 100%;
    display: flex;
    text-decoration: none;
    letter-spacing: 8px;
    color: black;
    border-left: 16px solid #ffc89a;
    border-radius: 11% 0px 0px 11%;
    align-items: center;
    padding: 5%;
    &:hover {
      cursor: pointer;
      background-color: #ff9d60;
      font-weight: 400;
      border-right: 0px;
      border-left: 16px solid #ffc89a;
      border-radius: 11% 0px 0px 11%;
    }
  }
  .selectedPage {
    background-color: #faf0e9;
    border-radius: 11% 0px 0px 11%;
    border-left: 16px solid #ffc89a;
    // padding-left: 25px;
    font-weight: 500;
    &:hover {
      cursor: default;
      background-color: #faf0e9;
      font-weight: 500;
    }
  }
}
</style>
