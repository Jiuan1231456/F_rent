<script>
import { RouterLink } from "vue-router";
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
  data() {
    return {
      newBillSearch: [],
      // startdate:"",
    };
  },
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(dataStore, ["page", "loginObj"]),
    // filterNewBillSearch(){
    //     return this.newBillSearch.filter(item => item.billList.ownerName === this.loginObj.ownerName)
    // }
  },
  methods: {
    ...mapActions(dataStore, ["setPage", "setBillObj"]),
    search() {
      let empty = {};
      fetch("http://localhost:8080/bill/billSearch", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empty),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //   this.newBillSearch = data
          this.newBillSearch = data.billList.filter(
            (item) => item.ownerName === this.loginObj.ownerName
          );
          console.log("只有現在房東的", this.newBillSearch);
        });
    },
    bringToDetail(index) {
      this.selectedIndex = index;
      // console.log('選的帳單',this.newBillSearch[index]);
      this.setBillObj(this.newBillSearch[index]);
    },
    // generateBill(){
    //   const today = new Date();
    //   const todayStr = today.getFullYear() + '-';
    //   todayStr += today.getMonth() + '-';
    //   todayStr += today.getDate();
    //   // return todayStr;
    //   // console.log(todayStr);
    //   let generateBillObj = {
    //     startdate: todayStr,
    //     ownerAccount:

    //   };
    //   fetch("http://localhost:8080/bill/billSearch", {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(todayStr),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       //   this.newBillSearch = data
    //       this.newBillSearch = data.billList.filter(
    //         (item) => item.ownerName === this.loginObj.ownerName
    //       );
    //       console.log("只有現在房東的", this.newBillSearch);
    //     });
    // },
 
  },
  mounted() {
    this.setPage(11), this.search();
    // this.today(new Date())
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
      <input class="searchInput" type="text" />
      <button class="searchBtn">
        <i
          class="fa-solid fa-magnifying-glass"
          style="font-size: 23px; background-color: transparent"
        ></i>
      </button>
      <br />
      <label for="start" class="start"
        >契約起日&emsp;<input type="date" id="start"
      /></label>
      <label for="end" class="end"
        >契約迄日&emsp;<input type="date" id="start"
      /></label>
      <br />
      <span class="searchTitle" style="position: absolute; bottom: 16%"
        >分類</span
      >
      <!-- <button
        class="typeBtn"
        style="position: absolute; bottom: 6%; left: 12%; width: 10%"
      >
        承租人
      </button> -->
      <button
        class="typeBtn"
        style="position: absolute; bottom: 6%; left: 26%"
      >
        承租中
      </button>
      <button
        class="typeBtn"
        style="position: absolute; bottom: 6%; left: 42%"
      >
        契約已結束
      </button>
      <button class="generate" style="position: absolute;bottom: 6%;right: 10%;">
        <RouterLink to="/bill" style="background-color: transparent;text-decoration: none;color: white;">帳單生成</RouterLink></button>
    </div>
    <div class="listArea">
      <table class="contract">
        <thead>
          <th scope="col" class="thead">編號</th>
          <th scope="col" class="thead">承租人</th>
          <th scope="col" class="thead">地址</th>
          <th scope="col" class="thead">房號</th>
          <th scope="col" class="thead">計費起日</th>
          <th scope="col" class="thead">計費迄日</th>
        </thead>
        <tbody>
          <tr class="content" v-for="(item, index) in this.newBillSearch">
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
            <td>{{ item.periodStart }}</td>
            <td>{{ item.periodEnd }}</td>
          </tr>
        </tbody>
      </table>
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
  .searchInput {
    margin-bottom: 26px;
    margin-left: 54px;
    margin-right: 30px;
    width: 60%;
    border: 1.5px solid black;
    border-radius: 10px;
    height: 15%;
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
  width: 90%;
  height: 50dvh;
  .contract {
    width: 100%;
    height: 100%;
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
  }
  .content {
    text-align: center;
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
}
</style>
