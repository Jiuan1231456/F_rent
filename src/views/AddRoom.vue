<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import { RouterLink } from "vue-router";
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            address: "",
            account: "",//從登入完的pinia抓
            floor: "",
            rId: "",
            rentP: "",
            deposit: "",
            cutP: "",
            eletricP: "",
            waterP: "",
            manageP: "",
            acreage: "",
            parking: false,
            equip: "",
            rOther: "",
            photo: "",

            imageFile: null,
            imageUrl: null,

        }
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj'])
    },
    methods: {
        ...mapActions(dataStore, ['setPage']),

        handleFileUpload(event) {//處理文件上傳事件並將文件保存到 photo 屬性中 
            this.photo = event.target.files[0];
        },

        addRoomToDB() {//新增房間資訊到DB
            let formData = new FormData();
            formData.append('photo', this.photo);
            formData.append('address', this.address);
            formData.append('account', this.loginObj.ownerAccount); // pinia暫存的房東帳號
            formData.append('floor', this.floor);
            formData.append('rId', this.rId);
            formData.append('rentP', this.rentP);
            formData.append('deposit', this.deposit);
            formData.append('cutP', this.cutP);
            formData.append('eletricP', this.eletricP);
            formData.append('waterP', this.waterP);
            formData.append('manageP', this.manageP);
            formData.append('acreage', this.acreage);
            formData.append('parking', this.parking);
            formData.append('equip', this.equip);
            formData.append('rOther', this.rOther);

            fetch("http://localhost:8080/room/creatRoom", {
                method: "POST",
                credentials: 'include',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.code === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "新增成功!!",
                            didClose: () => {
                                this.$router.push('/roomList');
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "輸入內容有誤",
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: "error",
                        title: "上傳失敗",
                    });
                });
        },


    },
    mounted() {
        this.setPage(3);
        console.log(this.loginObj)
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="bigArea">
        <div class="title">
            <h1>新增房間資訊</h1>
        </div>
        <div class="create-room">
            <form @submit.prevent="addRoomToDB">
                <div>
                    <label for="address">地址:</label>
                    <input type="text" id="address" v-model="address">
                </div>
                <div>
                    <label for="floor">樓層:</label>
                    <input type="text" id="floor" v-model="floor">
                </div>
                <div>
                    <label for="rId">房號:</label>
                    <input type="text" id="rId" v-model="rId">
                </div>
                <div>
                    <label for="rentP">租金:</label>
                    <input type="text" id="rentP" v-model="rentP">元/月
                </div>
                <div>
                    <label for="deposit">押金:</label>
                    <input type="text" id="deposit" v-model="deposit">
                </div>
                <div>
                    <label for="cutP">違約金:</label>
                    <input type="text" id="cutP" v-model="cutP">
                </div>
                <div>
                    <label for="eletricP">電費:</label>
                    <input type="text" id="eletricP" v-model="eletricP">元/度
                </div>
                <div>
                    <label for="waterP">水費:</label>
                    <input type="text" id="waterP" v-model="waterP">元/月
                </div>
                <div>
                    <label for="manageP">管理費:</label>
                    <input type="text" id="manageP" v-model="manageP">元/月
                </div>
                <div>
                    <label for="acreage">坪數:</label>
                    <input type="text" id="acreage" v-model="acreage">坪
                </div>
                <div>
                    <label for="parking">車位:</label>
                    <input type="checkbox" id="parking" v-model="parking">
                </div>
                <div>
                    <label for="equip">物件備註:</label>
                    <textarea class="equip inp" id="equip" style="resize: none; width: 80%; height: 40%;" v-model="equip"></textarea>
                </div>
                <div>
                    <label for="rOther">屋況:</label>
                    <textarea class="rOther inp" id="rOther" style="resize: none; width: 80%; height: 40%;" v-model="rOther"></textarea>
                </div>
                <div>
                    <label for="photo">圖片:</label>
                    <input type="file" id="photo" @change="handleFileUpload">
                </div>
                <button type="submit">確定新增</button>
            </form>
        </div>
        
        
        


        <!-- <button @click="addRoomToDB()">確定新增</button> -->
    </div>
</template>

<style scoped lang="scss">
.bigArea {
    width: 80%;
    padding: 1%;
    position: relative;
}

.address {
    width: 45%;
}

.inp {
    padding-left: 5px;
}

.roomDetailDiv {
    width: 80%;
    height: 60%;
    display: flex;
}
</style>