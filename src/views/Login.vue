<script>
import { defineComponent } from 'vue';
import { useStore } from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";

export default defineComponent({
    data() {
        return {
        owner_account: "",
        owner_pwd: "",
        showPopup: false, // 控制彈窗顯示
        isLoginForm: true // 控制顯示登入表單還是註冊表單
        };
    },
    computed: {
        ...mapState(useStore, ['page', 'loginObj'])
    },
    methods: {
        ...mapActions(useStore, ['setPage', 'setLoginObj']),
        login() {
        const loginObj1 = {
            owner_account: this.owner_account,
            owner_pwd: this.owner_pwd
        };
        // 發送登入請求
        fetch("http://localhost:8080/rent/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(loginObj1)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setLoginObj(data);
            console.log('pinia裡的', this.loginObj);
            this.showPopup = false; // 登入成功後關閉彈窗
        });
        },
        customizeWindowEvent() {
        this.showPopup = true;
        },
        closePopup(e) {
        if (e.target.id === "window-container") {
            this.showPopup = false;
        }
        },
        toggleForm() {
        this.isLoginForm = !this.isLoginForm;
        }
    },
    mounted() {
        this.setPage(1);
        window.addEventListener('click', this.closePopup);
    },
    beforeDestroy() {
        window.removeEventListener('click', this.closePopup);
    }
    });
    </script>

    <template>
    <div id="window-container" v-if="showPopup">
        <div class="window-content">
        <!-- 表單 -->
        <div class="login-page">
            <div class="form">
            <form v-if="!isLoginForm" class="register-form">
                <h5>註冊會員</h5>
                <label>E-mail</label>
                <input type="text" placeholder="xxx@mail.com" />
                <label>連絡電話</label>
                <input type="tel" placeholder="09xx-xxx-xxx" />
                <label>密碼</label>
                <input type="password" placeholder="6-8位英數密碼" />
                <label>再次輸入密碼</label>
                <input type="password" placeholder="請再次輸入密碼" />
                <button>註冊</button>
                <p class="message"><a href="#" @click.prevent="toggleForm">登入</a></p>
            </form>
            <form v-else class="login-form">
                <h5>會員登入</h5>
                <input v-model="owner_account" type="text" placeholder="E-Mail / 電話" />
                <input v-model="owner_pwd" type="password" placeholder="密碼" />
                <button @click.prevent="login">登入</button>
                <p class="message">尚未加入會員? <a href="#" @click.prevent="toggleForm">註冊</a></p>
            </form>
            </div>
        </div>
        <!-- 表單結束 -->
        </div>
    </div>

    <button @click="customizeWindowEvent">Click Me</button>
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

    .window-content {
    background: white;
    width: 30%;
    border-radius: 20px;
    overflow: auto;
    }

    .login-page {
    width: 100%;
    padding: 8% 0;
    margin: auto;
    }

    .form {
    position: relative;
    z-index: 1;
    background: #FFFCF5;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }

    .form input {
    font-family: 'Noto Serif TC', serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 15px 0;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    }

    .form button {
    font-family: 'Noto Serif TC', serif;
    text-transform: uppercase;
    outline: 0;
    background: #445251;
    width: 100%;
    border: 0.3;
    padding: 15px;
    margin: 15px 0;
    color: #FFFFFF;
    font-size: 16px;
    transition: all 0.3s ease;
    cursor: pointer;
    }

    .form button:hover,
    .form button:active,
    .form button:focus {
    background: #4D5139;
    }

    .form .message a {
    color: #4D5139;
    text-decoration: none;
    font-size: 16px;
    }

    label {
    font-family: 'Noto Serif TC', serif;
    font-size: 16px;
    color: #4D5139;
    font-weight: normal;
    }

    .form h5 {
    font-weight: normal;
    color: #4D5139;
    text-decoration: underline;
    font-size: 20px;
    }

    body {
    font-family: 'Noto Serif TC', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
</style>
