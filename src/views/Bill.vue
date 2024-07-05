<script>
import searchInput from "@/components/searchInput.vue";
import { RouterLink } from "vue-router";
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
export default {
  data() {
    return {};
  },
  components: {
    searchInput,
    RouterLink,
  },
  computed: {
    ...mapState(dataStore, ["page"]),
  },
  methods: {
    ...mapActions(dataStore, ["setPage"]),
    // bar() {
    //   window.addEventListener(scroll, () => {
    //     moveBar("#e74c3c");
    //   });
    //   // main code
    //   function moveBar(color = "#0984e3") {
    //     let bar = document.querySelector(".bar");
    //     let w = Math.ceil(
    //       (Math.round(window.scrollY) /
    //         (document.body.scrollHeight - window.innerHeight)) *
    //         100
    //     );
    //     bar.style.width = w + "%";
    //     bar.style.background = color;
    //   }
    // },
  },
  mounted() {
    this.setPage(10);
    // this.bar();
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
    <!-- <div class="bar"></div> -->
    <div class="topArea">
      <span class="billTitle">帳單生成</span>
      <!-- <div class="generate">生成帳單</div> -->
    </div>
    <div class="middleArea">
      <div class="tableTitle">當期帳單</div>
      <table class="lastMonth">
        <thead>
          <tr>
            <td scope="col" class="thead">承租人</td>
            <td scope="col" class="thead">地址</td>
            <td scope="col" class="thead">計費期間</td>
          </tr>
        </thead>
        <tbody>
          <tr class="content">
            <td>abc</td>
            <td>abc</td>
            <td>2024-07-01~2024-07-30</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bigArea {
  width: 80%;
  height: 150dvh;
  .billTitle {
    font-size: 2.3em;
    font-weight: 500;
    letter-spacing: 5px;
  }
  // .bar {
  //   position: fixed;
  //   top: 0;
  //   width: 0.5%;
  //   height: 4px;
  //   //  background-color: aqua;
  // }
  .topArea {
    display: flex;
    width: 93%;
    height: 8%;
    position: relative;
    .generate {
      border: none;
      background-color: #f54545;
      color: white;
      width: 10%;
      height: 60%;
      border-radius: 5px;
      font-size: 1.2em;
      padding-top: 5px;
      padding-left: 9px;
      position: absolute;
      top: 30%;
      right: 5%;
      &:hover {
        cursor: pointer;
        background-color: #ef9a95;
      }
    }
  }
  .middleArea {
    width: 93%;
    height: 50%;
    .tableTitle {
      margin: 3% auto;
      margin-bottom: 0;
      height: 9%;
      width: 80%;
      background-color: #ffc89a;
      box-shadow: 0px 1px 0px 0px #909090;
      font-size: 1.4em;
      padding-left: 15px;
      font-weight: 500;
    }
    .lastMonth {
      margin: 0 auto;
      margin-top: 5px;
      width: 80%;
      height: 50%;
      text-align: center;
      .thead {
        background-color: #e3e3e3b0;
        height: 33px;
      }
      td {
        background-color: rgb(255 253 253 / 47%);
        height: 33px;
        box-shadow: 0px 1px 0px 0px gray;
      }
    }
  }
}
</style>
