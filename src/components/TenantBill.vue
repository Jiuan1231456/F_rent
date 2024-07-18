<script>
import electricModal from "@/components/electricModal.vue";
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
  data() {
    return {
      elecModal: false,
      btnContent: "",
      billList: [],
    };
  },
  props: ['showNextPage'],
  components: {
    electricModal,
  },
  computed:{
    ...mapState(dataStore, ["tenantData", "tenantContract"]),
  },
  methods: {
    showElectric() {// 繳費方式彈跳視窗的開關
      this.elecModal = !this.elecModal;
    },
    showBtnContent(content) {// 針對不同繳費方式顯示不同文字
      this.btnContent = content;
    },
    bill(){
      this.billList = this.tenantData.billList.filter((item) => {
        item.address = this.tenantContract.address && item.tenantName == this.tenantContract.tenantName
      });
      console.log("找出與選擇相對應的契約",this.billList);
    },
   
  },
  mounted(){
      this.bill();
      console.log("帳單頁面上的tenantData",this.tenantData)
    }

};
</script>

<template>
    
  <div class="middleArea" >
    <span class="title">我的帳單</span>
    <table class="contract">
      <thead>
          <th scope="col" class="thead">編號</th>
          <th scope="col" class="thead">計費起日</th>
          <th scope="col" class="thead">計費迄日</th>
          <th scope="col" class="thead">該期帳單金額</th>
          <th scope="col" class="thead">查看詳情</th>
        </thead>
        <tbody>
          <tr class="content">
            <td>1</td>
            <td>2024-01-01</td>
            <td>2024-12-31</td>
            <td>10,000</td>
            <td><button class="detailBtn"><i class="fa-solid fa-file-lines" style="font-size: 1.2em;"></i></button></td>
          </tr>
          <tr class="content">
              <button>
            <td>1</td>
            <td>2024-01-01</td>
            <td>2024-12-31</td>
            <td>10,000</td>
            <td><button class="detailBtn"><i class="fa-solid fa-file-lines" style="font-size: 1.2em;"></i></button></td>
          </button>
          </tr>
        </tbody>
    </table>
  </div>

   
    <!-- <button @click="$emit('goToNextPage',false)">返回前頁</button> -->
</template>

<style scoped lang="scss">
.middleArea {
  // width: 93%;
  // height: 112dvh;
  // background-color: white;
  z-index: -99;
  position: relative;
  top: 31px;
  left: 31px;
  .totalBox {
    width: 90%;
    height: 26%;
    // border: 1px solid black;
    background-color: transparent;
    margin: 0px 52px;
    position: absolute;
    top: 47px;
    display: flex;
    justify-content: space-around;
    .total {
      height: 100%;
      background-color: #ffe6d1;
      border-radius: 10px;
    }
    span {
      background: transparent;
      font-weight: 500;
      position: absolute;
    }
  }

  .bill {
    width: 80%;
    height: 57%;
    margin: 0 auto;
    position: absolute;
    bottom: 45px;
    left: 100px;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    span {
      background-color: transparent;
      font-size: 1.4em;
      position: absolute;
    }
    .toHistory {
      background: transparent;
      border: none;
      color: #786043;
      font-size: 1.4em;
      right: 10px;
      position: absolute;
      &:hover {
        color: #cc9a5c;
      }
    }
    .detail {
      background-color: transparent;
      font-size: 1.3em;
      position: absolute;
    }
    .line {
      width: 100%;
      height: 1px;
      border-bottom: 1px solid black;
      position: absolute;
    }
  }
  .feeBtn {
    position: absolute;
    bottom: 31px;
    right: 96px;
    width: 100px;
    height: 40px;
    background: #91aacc;
    border: none;
    border-radius: 7px;
    color: white;
    font-size: 1.1em;
    &:hover {
      background: #55585e;
    }
  }
}
.headerArea {
  background-color: #ffc89a;
  width: 100%;
  height: 50px;
  position: relative;
  .slotTitle {
    margin: auto 0;
    font-size: 0.6em;
    background-color: transparent;
    padding-left: 10px;
    padding-top: 7px;
    color: #7a451d;
    font-weight: 500;
  }
}
.contentArea {
  margin: 0 auto;
  margin: 27px auto;
  width: 58%;
  margin-left: 148px;
  .atm {
    margin-right: 112px;
    margin-left: 48px;
    background-color: #ee9b82;
    &:hover {
      background-color: #ed704a;
    }
    &:active{
      transform: scale(0.95);
    }
  }
  .cash {
    background-color: #ee9b82;
    &:hover {
      background-color: #ed704a;
    }
    &:active{
      transform: scale(0.95);
    }
  }
  .feeWay {
    margin-top: 0;
    margin-bottom: 1rem;
    margin-left: 102px;
    letter-spacing: 2px;
  }
  button {
    border: none;
    border-radius: 14px;
    color: #5d675b;
    width: 148px;
    height: 113px;
    font-size: 0.8em;
  }
  i {
    background-color: transparent;
  }
  .feeContent {
    font-size: 0.6em;
    background: transparent;
  }
  .copyBill{
    height: 34px;
    background: #a5552a;
    color: #fff6e6;
    margin-left: 211px;
    margin-top: 17px;
    &:hover{
      background-color: #c18b6e;
    }
  }
}
.contract {
    width: 80%;
    border-collapse: collapse;
    background-color: #cdc6a5;
    text-align: center;
    position: absolute;
    top: 17%;
    left: 10%;
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
  td {
    background-color: #f9ddc6;
    padding: 5px;
  }
  tr:nth-of-type(odd) td {
    background-color: #ebebeb9e;
  }
  .title{
    background-color: transparent;
    position: absolute;
    top: -16px;
    left: -99px;
    font-size: 2em;
    font-weight: 500;
  }
  .detailBtn{
    background-color: transparent;
    border: none;
    &:hover{
      color: #cc9a5c;
    }
  }
  .list{
    width: 60%;
    position: absolute;
    top: 100px;
    left: 100px;
    background: transparent;
  }
  .perData{
    border: none;
    width: 62%;
    height: 10dvh;
    letter-spacing: 1px;
    font-size: 1.3em;
  }
</style>
