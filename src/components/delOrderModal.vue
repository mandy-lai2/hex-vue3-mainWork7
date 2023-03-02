<template>
  <!-- 刪除確認Modal -->
  <div class="modal fade" id="delCheckModal" tabindex="-1" aria-labelledby="delCheckModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="delCheckModalLabel">刪除訂單</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <!-- modal-body -->
            <div class="modal-body">
              是否刪除 訂單(刪除後將無法恢復)
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
                @click="delOrder"
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
    tempOrder: {
      type: Object,
    },
  },
  watch:{
    tempOrder(){
      console.log(this.tempOrder.id);
    }
  },
  mixins:[modalMixin], //混合元件方法 mixins，modal開關元件
  methods: {
    // 刪除商品
    delOrder() {
      this.$http
        .delete(
          `${VITE_API}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`
        )
        .then((res) => {
          alert(res.data.message);
          this.$emit("getOrders");
          this.$emit("closeModal", "delModal");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};

</script>
