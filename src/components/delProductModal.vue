<template>
  <!-- 刪除確認Modal -->
  <div class="modal fade" id="delCheckModal" tabindex="-1" aria-labelledby="delCheckModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="delCheckModalLabel">刪除產品</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <!-- modal-body -->
            <div class="modal-body">
              是否刪除
              <strong>{{tempProduct.title}}</strong> 商品(刪除後將無法恢復)
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="delProduct"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin.js'
const { VITE_API, VITE_PATH } = import.meta.env
export default {
  props: {
    tempProduct: {
      type: Object,
      default() { return {}; },
    },
  },
  mixins:[modalMixin], //混合元件方法 mixins，modal開關元件
  methods: {
    // 刪除商品
    delProduct() {
      this.$http
        .delete(
          `${VITE_API}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`
        )
        .then((res) => {
          // delCheckModal.hide();
          alert(res.data.message);
          this.$emit("getProducts");
          this.$emit("closeModal", "delModal");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};

</script>
