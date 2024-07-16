<script>
import electricModal from "@/components/electricModal.vue";
export default {
  data() {
    return {
      elecModal: false,
      btnContent: "",
    };
  },
  props: ['showNextPage'],
  components: {
    electricModal,
  },
  methods: {
    showElectric() {// 繳費方式彈跳視窗的開關
      this.elecModal = !this.elecModal;
    },
    showBtnContent(content) {// 針對不同繳費方式顯示不同文字
      this.btnContent = content;
    },
  },
};
</script>

<template>
  <div class="middleArea" v-if="!showNextPage">
    <div class="totalBox">
      <div class="total totalMoney" style="width: 30%">
        <span style="font-size: 1.5em; top: 21px; left: 107px"
          >本期應繳總金額</span
        >
        <span style="font-size: 3em; top: 64px; left: 130px">10000</span>
      </div>
      <div class="total totalElectric" style="width: 50%">
        <span style="top: 21px; left: 51%; font-size: 1.5em"> 本期用電量</span>
        <span style="top: 32px; right: 219px; font-size: 1.7em"
          >50 &nbsp;度</span
        >
        <span style="top: 100px; left: 55%; font-size: 1.2em"
          >與上期相差：</span
        >
        <span style="bottom: 32px; right: 205px; font-size: 1.2em"
          >50 &nbsp;度</span
        >
        <span style="right: 129px; bottom: 30px; font-size: 1.3em"
          ><i
            class="fa-solid fa-caret-up"
            style="color: red; background-color: transparent"
          ></i
        ></span>
        <span style="right: 129px; bottom: 30px; font-size: 1.3em"
          ><i
            class="fa-solid fa-caret-down"
            style="color: green; background-color: transparent"
          ></i
        ></span>
      </div>
    </div>
    <div class="bill">
      <span>本期帳單明細</span>
      <span style="left: 253px">計費期間：2024-01-01~2024-12-31</span>
      <button class="toHistory" @click="$emit('goToNextPage',true)">查看歷史帳單⇀</button>
      <div class="line" style="top: 45px"></div>
      <div class="rent detail" style="top: 59px">
        租金&emsp;&emsp;&emsp;&emsp;&emsp;rentP
      </div>
      <div class="manage detail" style="top: 120px">
        管理費&emsp;&emsp;&emsp;&emsp;manageP
      </div>
      <div class="water detail" style="top: 180px">
        水費&emsp;&emsp;&emsp;&emsp;&emsp;waterP
      </div>
      <div class="electric detail" style="top: 243px">
        電費&emsp;&emsp;&emsp;&emsp;&emsp;electricOneP
      </div>
      <div
        class="computeElectric detail"
        style="top: 232px; left: 380px; font-size: 1.1em; color: gray"
      >
        計算公式：本期用電量 X 一度電費 {} 元<br />本期電費=50度 X 5元 = 2500元
      </div>
      <div class="line" style="top: 318px"></div>
      <div class="total detail" style="top: 335px">
        總金額&emsp;&emsp;&emsp;&emsp;&emsp;totalP
      </div>
    </div>
    <button class="feeBtn" @click="this.showElectric()">前往繳費</button>
    <electricModal v-if="this.elecModal" @alertModal="this.showElectric()">
      <template v-slot:header>
        <div class="headerArea">
          <p class="slotTitle">進行繳費</p>
        </div>
      </template>
      <template v-slot:content>
        <div class="contentArea">
          <p class="feeWay">請選擇繳費方式：</p>
          <button class="atm" @click="showBtnContent('content1')">
            <div class="text" style="background-color: transparent;">匯款轉帳</div>
            <div style="background-color: transparent;"><i class="fa-regular fa-credit-card"></i></div>
          </button>
          <button class="cash" @click="showBtnContent('content2')">
            <div style="background-color: transparent;">臨櫃繳費</div><div style="background-color: transparent;"><i class="fa-solid fa-landmark"></i></div>
          </button>
          <div class="feeContent" style="width:557px;margin-left: -6px;margin-top: 21px;" v-if="btnContent === 'content1'">
            本期應繳總金額：10000元 <br />請匯款或ATM轉帳至房東帳戶：銀行帳戶：(000)1111111111
          </div>
          <div
            class="feeContent"
            style="width: 595px; margin-left: -34px; margin-top: 24px"
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
  <div class="middleArea" v-else>
    <span class="title">我的帳單</span>
    <!-- <table class="contract">
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
    </table> -->
   <div class="list">
    <div class="listHeader"><span>計費起日&emsp;~&emsp;計費迄日</span><br>&emsp;&emsp;<span>$10000</span></div>
    <button class="perData"><span>2024-01-01&emsp;~&emsp;2024-01-31</span><br>&emsp;&emsp;<span>$10000</span></button>
   </div>
   
    <button @click="$emit('goToNextPage',false)">返回前頁</button>
  </div>
</template>

<style scoped lang="scss">
.middleArea {
  width: 93%;
  height: 112dvh;
  background-color: white;
  z-index: 1;
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
    top: 28px;
    left: 40px;
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
