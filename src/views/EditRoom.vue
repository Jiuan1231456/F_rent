<script>
import dataStore from "@/stores/dataStore";
import { mapState, mapActions } from "pinia";
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            imageFile: null,
            imageUrl: null,
        }
    },
    computed: {
        ...mapState(dataStore, ['page', 'loginObj', 'roomDetail'])
    },
    methods: {
        ...mapActions(dataStore, ['setPage']),

        update() {//更新房間資訊並跳回房間列表
            let newDate={
                address:this.roomDetail.address,
                rentP: this.roomDetail.rentP,
                deposit: this.roomDetail.deposit,
                cutP: this.roomDetail.cutP,
                eletricP: this.roomDetail.eletricP,
                waterP: this.roomDetail.waterP,
                manageP: this.roomDetail.manageP,
                acreage: this.roomDetail.acreage,
                parking: this.roomDetail.parking,
                equip: this.roomDetail.equip,
                rOther: this.roomDetail.rOther,
            }
            fetch("http://localhost:8080/room/updateRoom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newDate)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    console.log("更新完的結果", this.roomDetail)
                    if (data.code === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "更新成功!!",
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
        },

        // GPT===================================================

        previewImage(event) { //在选择图片时触发，调用 convertToBase64 方法将图片转换成 base64 编码。
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                this.imageFile = file;
                this.imageUrl = URL.createObjectURL(file);
                this.convertToBase64(file);
            } else {
                alert('請上傳一個有效的圖片文件');
                this.imageFile = null;
                this.imageUrl = null;
            }
        },
        convertToBase64(file) { //使用 FileReader 将图片文件转换成 base64 编码。
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.photo = reader.result.split(',')[1]; // 去掉 base64 前缀
            };
            reader.onerror = error => {
                console.error('Error: ', error);
            };
        },
        uploadImage() { //调用 addPhoto 方法将图片和地址上传到服务器。
            if (!this.imageFile) {
                alert('請選擇一張圖片');
                return;
            }

            this.addPhoto();
        },

        addPhoto() {
            let photoObj = {
                address: this.roomDetail.address,
                photo: this.photo,
            };
            fetch("http://localhost:8080/room/insertPhoto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(photoObj)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.code === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "上傳成功!!",
                            didClose: () => {
                                this.$router.push('/roomList');
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "發生錯誤",
                        });
                    }
                })

        }
    },
    mounted() {
        this.setPage(4)
    }
}
</script>

<template>
    <div class="bigArea">
        <h1>房間詳細資訊</h1>
        <h4>地址 : {{ this.roomDetail.address }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            樓層 :{{ this.roomDetail.floor }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            房號 : {{ this.roomDetail.roomId }}
        </h4>
        <h4>租金 : <input class="rentP inp" type="text" v-model="this.roomDetail.rentP"> 元/月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            押金 : <input class="deposit inp" type="text" v-model="this.roomDetail.deposit"> 元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            違約金 : <input class="cutP inp" type="text" v-model="this.roomDetail.cutP"> 元
        </h4>
        <h4>電費 : <input class="eletricP inp" type="text" v-model="this.roomDetail.eletricP"> 元/度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            水費 : <input class="waterP inp" type="text" v-model="this.roomDetail.waterP"> 元/月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            管理費 : <input class="manageP inp" type="text" v-model="this.roomDetail.manageP"> 元/月</h4>
        <h4>坪數 : <input class="acreage inp" type="text" v-model="this.roomDetail.acreage"> 坪</h4>
        <h4>車位 : <input class="parking inp" type="checkbox" v-model="this.roomDetail.parking"></h4>
        <div class="equipDiv">
            <span>物件備註&nbsp;:&nbsp;&nbsp;</span>
            <textarea class="equip inp" style="resize: none; width: 80%; height: 40%;" v-model="this.roomDetail.equip"></textarea>
        </div>
        <div class="rOtherDiv">
            <span>特色描述&nbsp;:&nbsp;&nbsp;</span>
            <textarea class="rOther inp" style="resize: none; width: 80%; height: 40%;" v-model="this.roomDetail.rOther"></textarea>
        </div>
        
        <div id="app">
            <form id="imageUploadForm" @submit.prevent="uploadImage">
                <input type="file" id="imageFile" name="imageFile" @change="previewImage" accept="image/*">
                <button type="submit">上傳圖片</button>
            </form>
            <div v-if="imageUrl">
                <h3>預覽圖片:</h3>
                <img :src="imageUrl" alt="Image Preview">
            </div>
        </div>

        <button @click="update()">儲存更新</button>
    </div>
</template>

<style scoped lang="scss">
.bigArea {
    width: 80%;
    margin: 0 auto;
}

.inp {
    padding-left: 5px;
    width: 18%;
}

.parking{
    width: 2%;
}

</style>