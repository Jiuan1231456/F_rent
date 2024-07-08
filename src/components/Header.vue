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
    :class="{ selectedPage: this.page === 100 }" 
    to="/Register"
    >註冊
  </RouterLink>

    <RouterLink 
    class="routerItem" 
    :class="{ selectedPage: this.page === 2 }" 
    to="/roomlist"
    >房間列表
  </RouterLink>
  
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
    <!-- <RouterLink
      class="routerItem"
      :class="{ selectedPage: this.page === 8 }"
      to="/ContractPreview"
      >預覽租約</RouterLink
    > -->
    <RouterLink
      class="routerItem"
      
      to="/Contract_Detail"
      >租約詳情/契約中止編輯</RouterLink
    >
    <RouterLink
      class="routerItem"
      
      to="/Cutcontract_Edit"
      >租約中止編輯</RouterLink
    >
   
    <RouterLink
      class="routerItem"
      :class="{ selectedPage: this.page === 10 }"
      to="/bill"
      >帳單管理</RouterLink
    >
    <RouterLink
      class="routerItem"
      :class="{ selectedPage: this.page === 11 }"
      to="/benefit"
      >觀看收益</RouterLink
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
  </div>
</template>

<style scoped lang="scss">
.headerArea {
  height: 100dvh;
  width: 350px;
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
  .dropdownBtn[aria-expanded="true"] {
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
