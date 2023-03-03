<template>
   <!-- 圖片上傳 -->
   <div class="container">
    <h4>圖片上傳</h4>
    <div class="mb-3">
      <input class="form-control" type="file" id="formFile" @change="imgUpload" :value="inputImg">
    </div>
    <div class="mb-5">
      <h6>圖片連結👇</h6>
      <textarea class="form-control" rows="3" v-model="imgUrl"></textarea>
    </div>
  </div>
</template>
<script>
const { VITE_API, VITE_PATH } = import.meta.env
export default{
  data() {
    return {
      imgUrl: "圖片連結",
      inputImg: "",
    }
  },
  methods: {
    imgUpload(e) {
      const file = e.target.files[0];
      // console.log(file);
      const formData = new FormData();
      formData.append("file-to-upload", file);  // name="file-to-upload"
      // 建立表單資料 new FormData()，用append新增資料欄位
      // console.log(formData.get('file-to-upload'));
      this.$http
        .post(`${VITE_API}/api/${VITE_PATH}/admin/upload`, formData)
        .then((res) => {
          // console.log(res.data);
          alert(`${res.data.success ? "圖片上傳成功" : "失敗"}`);
          this.imgUrl = res.data.imageUrl;
          this.inputImg = "";
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
  },
}
</script>