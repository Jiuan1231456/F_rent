<script>
import { defineComponent } from "vue";
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import Swal from "sweetalert2";

export default defineComponent({
  data() {
    return {
      owner_account: "",
      owner_pwd: "",
      showPopup: false, // 控制彈窗顯示
      isLoginForm: true, // 控制顯示登入表單還是註冊表單
      owner_identity: "",
      owner_name: "",
      owner_email: "",
      owner_phone: "",
      account_bank: "",
      loggedIn: false, // 增加登入狀態的判斷
    };
  },
  computed: {
    ...mapState(dataStore, ["page", "loginObj", "registerObj"]),
  },
  methods: {
    ...mapActions(dataStore, ["setPage", "setLoginObj", "setRegisterObj"]),
    login() {
      const loginObj1 = {
        owner_account: this.owner_account,
        owner_pwd: this.owner_pwd,
      };
      // 發送登入請求
      fetch("http://localhost:8080/rent/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(loginObj1),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setLoginObj(data);
          console.log("pinia裡的", this.loginObj);
          if (data.code === 200) {
            Swal.fire({
              title: "登入成功!",
              text: "您現在已成功登入帳號",
              icon: "success",
            });
            this.showPopup = false; // 登入成功後關閉彈窗
            this.loggedIn = true; // 設置登入狀態為已登入
            sessionStorage.setItem("當前帳號", this.loginObj.ownerAccount); //將帳號放入session
          } else if (data.code === 400) {
            Swal.fire({
              icon: "error",
              title: "登入失敗",
              text: "帳號或密碼有問題，請重新輸入",
            });
          }
        })
        .catch((error) => {
          console.error("登入請求發生錯誤", error);
          Swal.fire({
            icon: "error",
            title: "登入失敗",
            text: "系統發生錯誤，請稍後再試",
          });
        });
    },
    register() {
      let registerObj1 = {
        owner_account: this.owner_account,
        owner_pwd: this.owner_pwd,
        owner_email: this.owner_email,
        owner_phone: this.owner_phone,
        owner_identity: this.owner_identity,
        owner_name: this.owner_name,
        account_bank: this.account_bank,
      };
      // 檢查所有字段是否都有值
      if (
        !this.owner_account ||
        !this.owner_pwd ||
        !this.owner_email ||
        !this.owner_phone ||
        !this.owner_identity ||
        !this.owner_name ||
        !this.account_bank
      ) {
        Swal.fire({
          icon: "error",
          title: "註冊失敗",
          text: "所有的資料都是必填",
        });
        return;
      }
      console.log("看送出的資料有沒有吃到:", registerObj1); // 印出來看有沒有吃到輸入資料

            // 發送註冊請求
            fetch("http://localhost:8080/rent/account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerObj1),
            })
            .then(res => {
                if (!res.ok) {
                    console.error('Response status:', res.status); // 增加這一行查看問題
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                this.setRegisterObj(data);
                console.log('pinia裡的', this.registerObj);
                if (data.code === 200) {
                    Swal.fire({
                        title: "註冊成功!",
                        text: "您的帳號已成功註冊",
                        icon: "success"
                    });
                    this.showPopup = false; // 註冊成功後關閉彈窗
                } else if (data.code === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "註冊失敗",
                        text: "發生錯誤，請稍後再試"
                    });
                }
            })
            .catch(error => {
                console.error('fetch有問題:', error);
                Swal.fire({
                    icon: "error",
                    title: "註冊失敗",
                    text: "系統發生錯誤，請稍後再試"
                });
            });
        },

    customizeWindowEvent() {
      this.showPopup = true;
    },
    closePopup(e) {
      // 只檢查點擊的目標是否包含 'close' 類別
      if (e.target.classList.contains("close")) {
        this.showPopup = false;
      }
    },
    //下面這個方法是點擊其他區域和叉叉按鈕就會關閉登入視窗的方法
    // closePopup(e) {
    //     // 檢查event是否存在
    //     if (!e || (e.target.id !== "window-container" && !e.target.classList.contains('close'))) {
    //         return;
    //     }
    //     this.showPopup = false;
    // },
    toggleForm() {
      this.isLoginForm = !this.isLoginForm;
    },
  },

  mounted() {
    this.setPage(1);
    this.loggedIn = sessionStorage.getItem("當前帳號") ? true : false;
    console.log("Hii");
    console.log(sessionStorage.getItem("當前帳號"));
    console.log(this.loggedIn);
    window.addEventListener("click", this.closePopup);
  },
  beforeUnmount() {
    console.log("BBBB");
    console.log(sessionStorage.getItem("當前帳號"));
    console.log(this.loggedIn);
    // 移除全局點擊事件監聽器
    window.removeEventListener("click", this.closePopup);
  },
});
</script>

<template>
    <div id="window-container" v-if="showPopup">
        <div class="triangle"></div>
        <!-- 表單 -->
      
        <div class="form">
            <form v-if="!isLoginForm" class="register-form">
                <h5>註冊會員</h5>
                <label>帳號</label>
                <input v-model="owner_account" type="text" placeholder="3-10位英數混合帳號" />
                <label>真實姓名</label>
                <input v-model="owner_name" type="text" placeholder="朴敘俊" />
                <label>身分證字號</label>
                <input v-model="owner_identity" type="text" placeholder="A111111111" />
                <label>E-mail</label>
                <input v-model="owner_email" type="email" placeholder="xxx@mail.com" />
                <label>連絡電話</label>
                <input v-model="owner_phone" type="tel" placeholder="09xx-xxx-xxx" />
                <label>密碼</label>
                <input v-model="owner_pwd" type="text" placeholder="6-10位英數密碼" />
                <label>銀行帳戶</label>
                <input v-model="account_bank" type="text"  placeholder="(行號)10碼數字，要加()" />
                <button type="button" @click="register">註冊確認</button>
                <p class="message"><a href="#" @click.prevent="toggleForm">登入</a></p>
            </form>
            <form v-else class="login-form">
                <h5>會員登入</h5>
                <input v-model="owner_account" type="text" placeholder="帳號/電話" />
                <input v-model="owner_pwd" type="password" placeholder="密碼" />
                <button @click.prevent="login">登入</button>
                <p class="message">尚未加入會員? <a href="#" @click.prevent="toggleForm">註冊</a></p>
            </form>
        </div>
    </div>
    <!-- 表單結束 -->
   
    <button class="login"@click="customizeWindowEvent">登入/註冊</button>
</template>

<style scoped>
#window-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    }


    p{padding-bottom: 1rem;}

   

.form {
    position: relative;
    z-index: 1;
    background: #e9dfc8;
    max-width: 360px;
    margin: 0 auto 0px;
    padding: 40px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }

.form input {
    font-family: 'Noto Serif TC', serif;
    outline: 0;
    background: #bdb499;
    width: 100%;
    border: 0;
    margin: 15px 0;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
}

.form button {
  font-family: "Noto Serif TC", serif;
  text-transform: uppercase;
  outline: 0;
  background: #4d4129;
  width: 100%;
  border: 0.3;
  padding: 15px;
  margin: 15px 0;
  color: #ffffff;
  font-size: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.form button:hover,
.form button:active,
.form button:focus {
  background: #4d5139;
}

.form .message a {
  color: #4d5139;
  text-decoration: none;
  font-size: 16px;
}

label {
  font-family: "Noto Serif TC", serif;
  font-size: 16px;
  color: #887a53;
  font-weight: normal;
}

    .form h5 {
    font-weight: normal;
    color: #4D5139;
    text-decoration: underline;
    font-size: 20px;
    padding-top: 5%;
    font-weight: 800;
}
   

body {
    font-family: 'Noto Serif TC', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.login{
    position: absolute;
    right: 5%;
    border: none;
    background-color: transparent;
    color: #433a2f;
    font-weight: 500;
    &:hover{
        color: #a08b71;
    }
}

.message{
    text-decoration:none;
    color: inherit;
}

.loggedin-buttons {
  position: absolute;
  right: 5%;
  border: none;
  padding-top: 0.5%;
  background-color: transparent;
  color: #433a2f;
  font-weight: 500;
  justify-content: space-around;
  display: flex;
  &:hover {
    color: #a08b71;
  }
  p {
    position: relative;
    right: 150px;
    background-color: rgba(255, 166, 0, 0);
  }
  .editaccount {
    position: fixed;
    position: relative;
    right: 60px;
    background-color: rgba(0, 0, 0, 0);
    color: #433a2f;
  }
}
</style>
