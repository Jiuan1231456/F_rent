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
      expandedIndex: null,
    };
  },
  props: ["showNextPage"],
  components: {
    electricModal,
  },
  computed: {
    ...mapState(dataStore, ["tenantData", "tenantContract"]),
  },
  methods: {
    showElectric() {
      // 繳費方式彈跳視窗的開關
      this.elecModal = !this.elecModal;
    },
    showBtnContent(content) {
      // 針對不同繳費方式顯示不同文字
      this.btnContent = content;
    },
    bill() {
      console.log(this.tenantData.billList);
      // for(let item in this.tenantData.billList){
      //   // console.log("比對的地址："+this.tenantData.billList[item].address+" vs "+ this.tenantContract.address);
      //   // console.log("單獨結果："+(this.tenantData.billList[item].address === this.tenantContract.address));
      //   // console.log("比對的名字："+this.tenantData.billList[item].tenantName+" vs "+ this.tenantContract.tenantName);
      //   // console.log("單獨結果："+(this.tenantData.billList[item].tenantName === this.tenantContract.tenantName));
      //   // console.log("比對結果："+((this.tenantData.billList[item].address === this.tenantContract.address) && (this.tenantData.billList[item].tenantName === this.tenantContract.tenantName)));
      //   if((this.tenantData.billList[item].address === this.tenantContract.address) && (this.tenantData.billList[item].tenantName === this.tenantContract.tenantName)){
      //     this.billList.push(this.tenantData.billList[item]);
      //     console.log("push"+this.tenantData.billList[item]);
      //   }
      // }
      // console.log("找出與選擇相對應的帳單",this.billList);
      // return;
      this.billList = this.tenantData.billList.filter(
        (item) =>
          item.address === this.tenantContract.address &&
          item.tenantName === this.tenantContract.tenantName
      );
      console.log("找出與選擇相對應的契約", this.billList);
    },
    toggleDetail(index) {
      console.log("選到的帳單", this.billList[index]);
      if (this.expandedIndex === index) {
        this.expandedIndex = null;
      } else {
        this.expandedIndex = index;
      }
    },
    showContract() {
      // 繳費方式彈跳視窗的開關
      this.contractModal = !this.contractModal;
    },
  },
  mounted() {
    this.bill();
    console.log("帳單頁面上的tenantData", this.tenantData);
    console.log("帳單頁面上的tenantData", this.tenantData.billList[0].address);
  },
};
</script>

<template>
  <div class="middleArea">
    <span class="title">我的帳單</span>
    <div class="contractInfo">
      <h4 style="background-color: transparent">租約資訊：</h4>
      &emsp;<span style="background-color: transparent"
        >出租人：{{ this.tenantContract.ownerName }}</span
      >&emsp;&emsp;&emsp;
      <span style="background-color: transparent"
        >租賃物件地址：{{ this.tenantContract.address }}</span
      >&emsp;&emsp;
      <span style="background-color: transparent"
        >租約期間：{{ this.tenantContract.startDate }}&emsp;至&emsp;{{
          this.tenantContract.endDate
        }}</span
      >
    </div>
    <table class="contract">
      <thead>
        <th scope="col" class="thead">編號</th>
        <th scope="col" class="thead">計費起日</th>
        <th scope="col" class="thead">計費迄日</th>
        <th scope="col" class="thead">該期帳單金額</th>
        <th scope="col" class="thead">查看詳情</th>
      </thead>
      <tbody>
        <template v-for="(item, index) in this.billList">
          <tr class="content">
            <td>{{ index + 1 }}</td>
            <td>{{ item.periodStart }}</td>
            <td>{{ item.periodEnd }}</td>
            <td>{{ item.totalOneP }}</td>
            <td>
              <button class="detailBtn" @click="toggleDetail(index)">
                <i class="fa-solid fa-file-lines" style="font-size: 1.2em"></i>
              </button>
            </td>
          </tr>
          <tr v-if="this.expandedIndex === index">
            <td :colspan="5">
              <div class="detailContent">
                <span>租金：{{ item.rentP }}</span
                ><br />
                <span>管理費：{{ item.manageOneP }}</span
                ><br />
                <span>水費：{{ item.waterOneP }}</span
                ><br />
                <span style="position: absolute; top: 20px; left: 351px"
                  >電費：每度電費：{{ item.eletricP }}<br />
                  用電量：{{ item.eletricV }}<br />
                  總電費：{{ item.eletricOneP }}</span
                >
                <span style="position: absolute; top: 65px; right: 231px"
                  >本期應繳總金額：{{ item.totalOneP }}</span
                >
                <button class="feeBtn" @click="this.showElectric()">
                  前往繳費
                </button>
                <electricModal
                  v-if="this.elecModal"
                  @alertModal="this.showElectric()"
                  style="z-index: 99"
                >
                  <template v-slot:header>
                    <div class="headerArea">
                      <p class="slotTitle">進行繳費</p>
                    </div>
                  </template>
                  <template v-slot:content>
                    <div class="contentArea">
                      <p class="feeWay">請選擇繳費方式：</p>
                      <button class="atm" @click="showBtnContent('content1')">
                        <div class="text" style="background-color: transparent">
                          匯款轉帳
                        </div>
                        <div style="background-color: transparent">
                          <i class="fa-regular fa-credit-card"></i>
                        </div>
                      </button>
                      <button class="cash" @click="showBtnContent('content2')">
                        <div style="background-color: transparent">
                          臨櫃繳費
                        </div>
                        <div style="background-color: transparent">
                          <i class="fa-solid fa-landmark"></i>
                        </div>
                      </button>
                      <div
                        class="feeContent"
                        style="
                          width: 557px;
                          margin-left: -6px;
                          margin-top: 21px;
                        "
                        v-if="btnContent === 'content1'"
                      >
                        本期應繳總金額：{{ item.totalOneP }}元
                        <br />請匯款或ATM轉帳至房東帳戶：銀行帳戶：(000)1111111111
                      </div>
                      <div
                        class="feeContent"
                        style="
                          width: 595px;
                          margin-left: -34px;
                          margin-top: 24px;
                        "
                        v-if="btnContent === 'content2'"
                      >
                        點擊「列印繳費單」後，請持繳費單前至超商或郵局臨櫃繳費
                        <button class="copyBill">列印繳費單</button>
                      </div>
                    </div>
                  </template>
                  <template v-slot:footer> </template>
                </electricModal>
              </div>
            </td>
          </tr>
        </template>
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
  .contractInfo {
    width: 88%;
    height: 16dvh;
    position: absolute;
    top: 49px;
    justify-content: space-evenly;
    left: -92px;
    letter-spacing: 1px;
    font-size: 1.2em;
    background: #dadadab3;
    border-radius: 10px;
    padding: 11px;
  }
  .detailContent {
    text-align: start;
    padding-left: 104px;
    position: relative;
    height: 18dvh;
    padding-top: 20px;
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
    right: 31px;
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
    &:active {
      transform: scale(0.95);
    }
  }
  .cash {
    background-color: #ee9b82;
    &:hover {
      background-color: #ed704a;
    }
    &:active {
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
  .copyBill {
    height: 34px;
    background: #a5552a;
    color: #fff6e6;
    margin-left: 211px;
    margin-top: 17px;
    &:hover {
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
  top: 173px;
  left: -3%;
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
.title {
  background-color: transparent;
  position: absolute;
  top: -16px;
  left: -99px;
  font-size: 2em;
  font-weight: 500;
}
.detailBtn {
  background-color: transparent;
  border: none;
  &:hover {
    color: #cc9a5c;
  }
}
.list {
  width: 60%;
  position: absolute;
  top: 100px;
  left: 100px;
  background: transparent;
}
.perData {
  border: none;
  width: 62%;
  height: 10dvh;
  letter-spacing: 1px;
  font-size: 1.3em;
}
</style>
