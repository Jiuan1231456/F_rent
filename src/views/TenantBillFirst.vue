<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import TenantContract from "../components/TenantContract.vue";
import TenantBill from "../components/TenantBill.vue";
import { RouterLink } from "vue-router";
export default {
  data() {
    return {
      changeShow: "A",
      showNextPage: false,
    };
  },
  components: {
    RouterLink,
    TenantContract,
    TenantBill,
  },
  computed: {
    ...mapState(dataStore, ["tenantData", "page"]),
  },
  methods: {
    ...mapActions(dataStore, ["setPage"]),
    changePage(page){ // 頁籤間切換頁面
      this.changeShow = page;
    },
    goToNextPage(show) {
      this.showNextPage = show;
    },
  },
  mounted() {
    this.setPage(12);
  },
};
</script>

<template>
  <div class="bigArea">
    <span class="title">XXX&nbsp;承租人，您好</span>
    <div class="titleBox">
      <label for="contract" class="cont label">
        <input
          class="titleInput"
          id="contract"
          type="radio"
          v-model="this.changeShow"
          value="A"
          name="questionaire"
          style="left: 24px"
        />
        <span class="contspan span" style="left: 339px">租約資訊</span>
      </label>
      <label for="bill" class="bill label">
        <input
          class="titleInput"
          id="bill"
          type="radio"
          v-model="this.changeShow"
          value="B"
          name="preview"
          style="left: 57px"
        />
        <span class="billspan span" style="left: 549px">帳單資訊</span>
      </label>
    </div>
    <!-- <div class="middleArea"> -->
        <TenantContract v-if="changeShow === 'A'" ></TenantContract>
        <TenantBill v-if="changeShow === 'B'" @next="changePage" :showNextPage="showNextPage" @goToNextPage="goToNextPage"></TenantBill>

    <!-- </div> -->
  </div>
</template>

<style scoped lang="scss">
.bigArea {
  width: 90vw;
  height: 100dvh;
  margin-left: 248px;
  color: black;
  margin-top: 50px;
  .title {
    font-size: 2.5em;
    margin-left: 35px;
  }
  .titleBox {
    margin: 0 auto;
    width: 76%;
    font-size: 1em;
    letter-spacing: 4px;
    margin-left: 53px;
    .label {
      display: contents;
      &:checked {
        font-weight: 600;
      }
      .span {
        position: absolute;
        background: transparent;
        z-index: 99;
        font-size: 1.7em;
        top: 27%;
        &:hover {
          cursor: pointer;
        }
        &:active {
          cursor: pointer;
        }
        &:checked {
          color: #ffffff;
        }
      }
      .titleInput {
        -webkit-appearance: none;
        background-color: rgb(240, 240, 240);
        color: white;
        margin-right: 3%;
        padding: 10px;
        height: 10dvh;
        width: 17%;
        top: 45px;
        position: relative;
        background-color: #ffc89a;
        border-radius: 10px;
        &:hover {
          cursor: pointer;
        }
        &:active {
          cursor: pointer;
        }
        &:checked {
          background-color: #ffffff;
        }
      }
    }
  }
}
</style>
