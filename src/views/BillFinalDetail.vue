<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import emailjs from "emailjs-com";
import JSZip from "jszip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import axios from "axios"; // 用於加載模板文件
import { PDFDocument } from "pdf-lib";

export default {
  data() {
    return {
      ownerName: "",
      tenantName: "",
    };
  },
  computed: {
    ...mapState(dataStore, ["finalBill", "billToContract", "loginObj"]),
  },
  methods: {
    ...mapActions(dataStore, ["setBillToContract"]),
    sendEmail() {  // 寄信功能
      var templateParams = {
        tenantName: this.finalBill.tenantName,
        periodStart: this.finalBill.periodStart,
        periodEnd: this.finalBill.periodEnd,
        paymentDate: this.finalBill.paymentDate,
        ownerName: this.finalBill.ownerName,
        tenantEmail: this.billToContract.tenantEmail,
        ownerEmail: this.loginObj.ownerEmail,
      };
      emailjs.send("service_azp4v8s", "template_h9952ii", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    },
    async loadTemplate() {  // 提供一個列印的模板
      try {
        const response = await axios.get("/test.docx", {
          responseType: "arraybuffer",
        });
        return response.data;
      } catch (error) {
        // console.error('Error loading template:', error);
        throw error;
      }
    },
    async print() {  // 列印功能
      // try{
      const templateArrayBuffer = await this.loadTemplate();
      // console.log('Template loaded successfully');

      // 創建一個空的 Word 文檔
      const zip = new JSZip(templateArrayBuffer);
      const doc = new Docxtemplater().loadZip(zip);
      // console.log('Template unzipped and loaded into Docxtemplater');

      // 設置文檔內容
      doc.setData({
        ownerName: this.finalBill.ownerName,
        tenantName: this.finalBill.tenantName,
      });
      console.log("Data set for the template");

      try {
        // 渲染文檔
        doc.render();
      } catch (error) {
        console.error(error);
        throw error;
      }

      // 生成 Word 文檔並保存
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(out, "test1.docx");
      // ========================================================================= 以下是生成pdf
      // console.log('Buffer generated successfully');
      // 將Docx文檔轉換為PDF
      //   const pdfDoc = await PDFDocument.load(buffer);
      //   // console.log('PDF document loaded successfully from buffer');

      //    // 添加內容到PDF文件，這裡可以自定義添加內容的方式
      //    const page = pdfDoc.addPage();
      //     page.drawText('Hello, World!', { x: 50, y: 50 });
      //     // console.log('Text added to the PDF');

      //     // 將PDF保存為Blob並下載
      //     const pdfBytes = await pdfDoc.save();
      //     console.log('PDF document saved successfully');
      //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      //     saveAs(blob, 'output.pdf'); // 下載文件，文件名為'output.pdf'
      //     console.log('PDF downloaded successfully');
      // } catch(error){
      //   console.log('pdf生成失敗',error);
      //   throw error;
    },
  },
  mounted() {
    emailjs.init("l4QPcOaCIqMDx_T_L");
  },
};
</script>

<template>
  <div class="bigArea">
    <div class="title">
      <span class="billTitle">帳單明細</span>
      <span class="period" style="left: 32%"
        >計費期間：{{ this.finalBill.periodStart }} ~
        {{ this.finalBill.periodEnd }}</span
      >
      <span class="period" style="left: 66%"
        >繳費截止日：{{ this.finalBill.paymentDate }}</span
      >
    </div>
    <div class="tenantArea">
      <span class="personal" style="top: 10%; left: 5%; font-weight: 500"
        >承租人資訊</span
      >
      <span class="personal" style="top: 35%; left: 7%"
        >姓名：{{ this.finalBill.tenantName }}</span
      >
      <!-- <span class="personal" style="top: 35%;left: 28%;">電話：{{ this.billObj. }}</span> -->
      <span class="personal" style="top: 35%; right: 31%"
        >身分證字號：{{ this.finalBill.tenantIdentity }}</span
      >
      <span class="personal" style="bottom: 18%; left: 7%"
        >租賃物件地址：{{ this.finalBill.address }}</span
      >
    </div>
    <div class="detailArea">
      <table class="detail">
        <thead>
          <tr style="border: none">
            <th scope="col" class="thead" style="width: 17%">項目</th>
            <th scope="col" class="thead">費用計算</th>
            <th scope="col" class="thead">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr class="content">
            <td scope="row">租金</td>
            <td style="text-align: justify; padding-left: 76px">
              依租賃契約規定辦理
            </td>
            <td>{{ this.finalBill.rentP }}</td>
          </tr>
          <tr class="content">
            <td scope="row">管理費</td>
            <td style="text-align: justify; padding-left: 76px">
              依租賃契約規定辦理
            </td>
            <td>{{ this.finalBill.manageOneP }}</td>
          </tr>
          <tr class="content">
            <td scope="row">水費</td>
            <td style="text-align: justify; padding-left: 76px">
              依租賃契約規定辦理
            </td>
            <td>{{ this.finalBill.waterOneP }}</td>
          </tr>
          <tr class="content" style="padding-left: 76px">
            <td scope="row">電費</td>
            <td style="text-align: justify; padding-left: 76px">
              每度電費：{{ this.finalBill.eletricP }} 元/度 <br />
              用電量：{{ this.finalBill.eletricV }} 度 <br />
              總電費 = 每度電費 x 用電量 <br />
              &emsp;&emsp;&emsp;&nbsp;= {{ this.finalBill.eletricP }} x
              {{ this.finalBill.eletricV }} <br />
              &emsp;&emsp;&emsp;&nbsp;= {{ this.finalBill.eletricOneP }}
            </td>
            <td>{{ this.finalBill.eletricOneP }}</td>
          </tr>
          <tr class="content" style="border-bottom: 2px solid black">
            <td scope="row">違約金</td>
            <td style="text-align: justify; padding-left: 76px">
              依租賃契約規定辦理
            </td>
            <td v-if="this.finalBill.cutP === 0">無</td>
            <td v-else>
              {{ this.finalBill.cutP }}，違約日期：{{
                this.billToContract[0].cutDate
              }}，違約理由：{{ this.billToContract[0].cutReason }}
            </td>
          </tr>
          <tr class="content">
            <td>應繳總金額</td>
            <td></td>
            <td>{{ this.finalBill.totalOneP }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="back">
      <RouterLink
        to="/generatebill"
        style="
          text-decoration: none;
          background-color: transparent;
          color: white;
        "
        >返回列表</RouterLink
      >
    </button>
    <button class="email inform" style="right: 13%" @click="sendEmail()">
      寄信通知
    </button>
    <button class="copy inform" style="right: 25%" @click="print()">
      列印帳單
    </button>
  </div>
</template>

<style scoped lang="scss">
.bigArea {
  width: 80%;
  height: 100%;
  margin-bottom: 53px;
  position: relative;
  .back {
    position: absolute;
    bottom: -3%;
    right: 37%;
    border: none;
    background-color: #f0974f;
    width: 8%;
    height: 5%;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background-color: #f0c49f;
    }
  }
  .inform {
    position: absolute;
    bottom: -3%;
    border: none;
    color: white;
    width: 8%;
    height: 5%;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  .email {
    background-color: #f54545;
    &:hover {
      background-color: #ef9a95;
    }
  }
  .copy {
    background-color: #8da8d3;
    &:hover {
      background-color: #bfc9d9;
    }
  }
}
.title {
  width: 95%;
  height: 64px;
  margin: 3% 0;
  display: flex;
  position: relative;
  margin-bottom: 1%;
  .billTitle {
    font-size: 2.3em;
    font-weight: 500;
    letter-spacing: 5px;
  }
  .period {
    position: absolute;
    top: 50%;
    background-color: transparent;
    letter-spacing: 1px;
  }

  .searchItem {
    margin: 16px auto;
    border: 2px solid;
    border-radius: 23px;
    height: 40px;
  }
}
.tenantArea {
  display: flex;
  width: 91%;
  height: 139px;
  background-color: #e5e3e39c;
  border-radius: 33px;
  position: relative;
  .personal {
    background-color: transparent;
    position: absolute;
  }
}
.detailArea {
  margin-left: -4%;
}
table {
  caption-side: bottom;
  border-collapse: collapse;
  width: 88%;
  height: 67dvh;
  margin: 5% 4%;
  border-bottom: 2px solid black;
}
tr {
  height: 40px;
  font-size: 1.2em;
  border-bottom: 1px solid black;
}
td {
  padding: 15px;
}
.thead {
  background-color: #ffc89a;
  font-weight: 500;
  text-align: center;
  width: 25%;
}
tbody {
  text-align: center;
}
</style>
