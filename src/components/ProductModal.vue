<template>
  <!-- 新增編輯產品Modal -->
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            <span v-if="tempProduct.id">編輯產品</span>
            <span v-else>新增產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- modal-body -->
        <div class="modal-body">
          <form class="row g-3 mb-3">
            <div class="col-md-4">
              <label for="mainImage" class="form-label">主要圖片</label>
              <input type="text" class="form-control" id="mainImage" placeholder="請輸入圖片連結"
                v-model="tempProduct.imageUrl" />
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="圖片" />
              <!-- 多圖 -->
              <h3 class="mt-5">多圖新增</h3>
              <template v-for="(img, key) in tempProduct.imagesUrl" :key="key">
                <label for="imageUrl" class="form-label mt-3">圖片網址</label>
                <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]" />
                <img class="img-fluid" :src="img" alt="圖片" />
                <button type="button" class="btn btn-outline-danger w-100 mt-2" @click="removeImage(key)">
                  刪除
                </button>
              </template>
              <button type="button" class="btn btn-outline-primary w-100 mt-3" @click="addImage">
                新增圖片
              </button>
            </div>

            <div class="col-md-8">
              <div class="row">
                <div class="col-12 mb-3">
                  <label for="inputTitle" class="form-label">標題</label>
                  <input type="text" class="form-control" id="inputTitle" placeholder="請輸入標題"
                    v-model="tempProduct.title" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="inputCategory" class="form-label">分類</label>
                  <input type="text" class="form-control" id="inputCategory" placeholder="請輸入分類"
                    v-model="tempProduct.category" />
                </div>
                <div class="col-md-6">
                  <label for="inputUnit" class="form-label">單位</label>
                  <input type="text" class="form-control" id="inputUnit" placeholder="請輸入單位" v-model="tempProduct.unit" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="inputOriginPrice" class="form-label">原價</label>
                  <input type="number" min=0 class="form-control" id="inputOriginPrice" placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price" />
                </div>
                <div class="col-md-6">
                  <label for="inputPrice" class="form-label">售價</label>
                  <input type="number" min=0 class="form-control" id="inputPrice" placeholder="請輸入售價"
                    v-model.number="tempProduct.price" />
                </div>
                <hr class="mt-3" />
                <div class="col-12 mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea class="form-control" id="description" rows="3" placeholder="請輸入產品描述"
                    v-model="tempProduct.description"></textarea>
                </div>
                <div class="col-12 mb-3">
                  <label for="productContent" class="form-label">說明內容</label>
                  <textarea class="form-control" id="productContent" rows="3" placeholder="請輸入說明內容"
                    v-model="tempProduct.content"></textarea>
                </div>
                <div class="col-12 mb-3">
                  <input class="form-check-input" type="checkbox" id="isEnabled" v-model="tempProduct.is_enabled" />
                  <label class="form-check-label" for="isEnabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div class="text-success">
            <hr>
          </div>
          <ImgUpload></ImgUpload>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct(tempProduct.id ? 'edit' : 'new')">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ImgUpload from '@/components/ImgUpload.vue';
import modalMixin from '@/mixins/modalMixin.js'
const { VITE_API, VITE_PATH } = import.meta.env
export default {
  props: {
    product: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      tempProduct: {},
      modal: ''
    };
  },
  components: {
    ImgUpload
  },
  mixins: [modalMixin], //混合元件方法 mixins，modal開關元件
  watch: {
    product() {
      this.tempProduct = this.product;
    }
  },
  methods: {
    // 新增資料或更新
    updateProduct(effect) {
      let url = "";
      let type = "";
      if (effect === "new") {
        url = `${VITE_API}/api/${VITE_PATH}/admin/product`;
        type = "post";
      } else if (effect === "edit") {
        url = `${VITE_API}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
        type = "put";
      }
      this.$http[type](url, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          // this.getProducts();
          this.$emit("getProducts");
          this.$emit("closeModal", "modal");
          // productModal.hide();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },

    addImage() {
      this.tempProduct.imagesUrl
        ? this.tempProduct.imagesUrl.push("")
        : (this.tempProduct.imagesUrl = [""]);
    },
    removeImage(key) {
      this.tempProduct.imagesUrl.splice(key, 1);
    },
  }
};
</script>
