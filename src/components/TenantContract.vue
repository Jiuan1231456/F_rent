<script>
import { RouterLink } from "vue-router";
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import contractModal from "./contractModal.vue";
export default {
  data() {
    return {
      contractList: [],
      billList: [],
      contractModal: false,
    };
  },
  props: ["showNextPage"],
  components: {
    RouterLink,
    contractModal,
  },
  computed: {
    ...mapState(dataStore, ["tenantData", "tenantContract"]),
  },
  methods: {
    ...mapActions(dataStore, ["setTenantContract"]),
    test() {
      console.log("租約頁面上的tenantData",this.tenantData);
      console.log("租約頁面上的tenantData",this.tenantData.billList[0].address);
      this.contractList = this.tenantData.contractList;
      this.billList = this.tenantData.billList;
    },
    bringToDetail(index) {
      // 偵測到選的帳單並存到pinia
      this.setTenantContract(this.contractList[index]);
      console.log("選的契約", this.tenantContract);
      index = "";
    },
    showContract() {
      // 繳費方式彈跳視窗的開關
      this.contractModal = !this.contractModal;
    },
    //將日期顯示為特定格式
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    goToPre() {
      this.$emit("next", "B");
    },
  },
  mounted() {
    this.test();
  },
};
</script>

<template>
  <!-- <div class="middleArea"> -->
  <div class="contractArea" v-if="!showNextPage">
    <span class="title">您的所有租約</span>
    <div class="line"></div>
    <div class="btnArea" v-for="(item, index) in this.contractList">
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#collapseExample' + index"
        aria-expanded="false"
        :aria-controls="'collapseExample' + index"
      >
        <span>出租人：{{ item.ownerName }}</span
        ><br />
        <span>承租物件地址：<br />{{ item.address }}</span
        ><br />
      </button>

      <div class="collapse" :id="'collapseExample' + index">
        <div class="card card-body">
          <span
            >契約期間：{{ item.startDate }} &emsp;至 &emsp;{{
              item.endDate
            }}</span
          >
          <span>租金：{{ item.rentP }}</span>
          <button
            class="detail"
            @click="
              // showContract();
              this.bringToDetail(index);
              $emit('goToNextPage', true);
            "
          >
            查看詳情
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="contractDetail" v-else>
    <h1>與{{ this.tenantContract.tenantName }}的租賃契約書</h1>
    <div class="roomInfo">
      <h2>租賃物件資訊</h2>
      <br />
      <div class="rent_time">
        <label for="start_time"
          >租賃期間 自：{{ this.tenantContract.startDate }}</label
        >

        <label for="end_time">到：{{ this.tenantContract.endDate }}</label>
      </div>
      <br />
      租賃物件地址: {{ this.tenantContract.address }}
      <br />
      樓層: {{ this.tenantContract.floor }}
      <br />
      房號: {{ this.tenantContract.roomId }}
      <br />
      租金/月: {{ this.tenantContract.rentP }}
      <br />
      押金: {{ this.tenantContract.deposit }}
      <br />
      管理費/月: {{ this.tenantContract.manageP }}
      <br />
      電費/度: {{ this.tenantContract.eletricP }}
      <br />
      水費/月: {{ this.tenantContract.waterP }}
      <br />
      面積: {{ this.tenantContract.acreage }}
      <br />
      設備:{{ this.tenantContract.equip }}
      <br />
      物件備註:{{ this.tenantContract.rOther }}
    </div>
    <br />
    <h2>立契約書人</h2>
    <div class="info">
      <br />
      <h4>出租人姓名:{{ this.tenantContract.ownerName }}</h4>
      <br />
      身分證字號: {{ this.tenantContract.ownerIdentity }}
      <br />
      戶籍地址: {{ this.tenantContract.ownerHomeAddress }}
      <br />
      通訊地址: {{ this.tenantContract.ownerContactAddress }}
      <br />
      連絡電話: {{ this.tenantContract.ownerPhone }}
      <br />
      <br />
      <h4>承租人姓名:{{ this.tenantContract.tenantName }}</h4>
      <br />
      身分證字號: {{ this.tenantContract.tenantIdentity }}
      <br />
      戶籍地址(營業登記地址): {{ this.tenantContract.tenantHomeAddress }}
      <br />
      通訊地址: {{ this.tenantContract.tenantContactAddress }}
      <br />
      email: {{ this.tenantContract.tenantEmail }}
      <br />
      連絡電話: {{ this.tenantContract.tenantPhone }}
    </div>
    <br />
    <h3>契約中止</h3>
    <div class="cut">
      <br />
      中止原因: {{ this.tenantContract.cutReason }}
      <br />
      違約金: {{ this.tenantContract.cutP }}
      <br />
      中止日期: {{ this.tenantContract.cutDate }}
    </div>
    <br />
    <h3 class="other">其他備註(或個別磋商條款)</h3>
    <br />
    <textarea>{{ this.tenantContract.cOther }}</textarea>
    <br />
    <br />
    <h3 class="signdate">
      立約日期：{{ formatDate(this.tenantContract.signDate) }}
    </h3>

    <button @click="this.goToPre()">查看帳單</button>
  </div>
  <!-- <contractModal v-if="this.contractModal" @alertModal="this.showContract()">
    <template v-slot:header>
      <div class="headerArea">
        <span style="font-size: 0.8em; margin-left: 20px">與{{ this.tenantContract.ownerName}}契約書</span>
      </div>
    </template>
    <template v-slot:content>
      <div class="contentArea">
      <div class="roomInfo">
        <span>地址：{{this.tenantContract.address}}</span><br>
        <span>樓層：{{this.tenantContract.floor}}</span><br>
        <span>房號：{{this.tenantContract.roomId}}</span><br>
        <span>租金：{{this.tenantContract.rentP}}&nbsp;元</span><br>
        <span>水費：{{this.tenantContract.waterP}}&nbsp;元</span> <br>
        <span> 管理費：{{this.tenantContract.manageP}}&nbsp;元</span> <br>
        <span>電費：{{this.tenantContract.eletricP}}&nbsp;元&nbsp;/&nbsp;度</span><br>
        <span v-if="this.tenantContract.parking" >車位 : 有</span>
        <span v-else>車位 : 無</span><br>
        <span>屋況：{{this.tenantContract.rCondition}}</span>
      </div>
      <div class="line1"></div>
      <div class="contractDetail">
        <span>出租人：</span>
      </div>
    </div>
    </template>
    <template v-slot:footer></template>
  </contractModal> -->
</template>

<style scoped lang="scss">
span {
  background-color: transparent;
}
.box {
  width: 30%;
  height: 20%;
  border-radius: 16px;
  background-color: bisque;
  // margin-top: 51px;
}
.title {
  background-color: transparent;
  font-size: 2em;
  position: absolute;
  top: 23%;
  left: 10%;
}
.contractArea {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 102px;
  width: 100%;
  justify-content: space-around;
  margin-left: -31%;
}
.btn-primary {
  background-color: #ffc89a;
  width: 337px;
  height: 120px;
  font-size: 1.2em;
  border: none;
  color: #743216;
  text-align-last: start;
  &:hover,
  &:focus {
    background-color: #ff9d60;
    color: white;
  }
}
.card-body {
  background-color: #ffebda;
  position: relative;
  height: 95px;
}
.detail {
  border: none;
  width: 85px;
  height: 34px;
  background: burlywood;
  left: 10;
  margin-right: 7px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  &:hover {
    background: rgb(230, 210, 184);
  }
}
.line {
  width: 90%;
  border-top: 1px solid black;
  position: absolute;
  top: 234px;
  left: 73px;
}
.headerArea {
  width: 100%;
  height: 50px;
  background-color: #ffb67b;
}
.roomInfo {
  width: 50%;
  font-size: 0.7em;
  margin-left: 49px;
  margin-top: 23px;
  letter-spacing: 1px;
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    margin-bottom: -28px;
  }
}
.line1 {
  height: 400px;
  border-left: 1px solid black;
  width: 4px;
  margin-top: 44px;
  margin-left: -52px;
}

.contentArea {
  display: flex;
}
</style>
