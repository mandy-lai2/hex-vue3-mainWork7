<template>
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            訂單細節
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- modal-body -->
        <div class="modal-body">
          <div class="row g-3">
            <div class="col-12">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row" width="80">姓名</th>
                    <td>{{tempOrder.user?.name}}</td>
                  </tr>
                  <tr>
                    <th scope="row" width="80">Email</th>
                    <td>{{tempOrder.user?.email}}</td>
                  </tr>
                  <tr>
                    <th scope="row" width="80">電話</th>
                    <td>{{tempOrder.user?.tel}}</td>
                  </tr>
                  <tr>
                    <th scope="row" width="80">地址</th>
                    <td>{{tempOrder.user?.address}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>訂單細節</h3>
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row" width="80">訂單編號</th>
                  <td>{{tempOrder.id}}</td>
                </tr>
                <tr>
                  <th scope="row" width="80">下單時間</th>
                  <td>{{timeDate(tempOrder.create_at)}}</td>
                </tr>
                <tr>
                  <th scope="row" width="80">付款時間</th>
                  <td>{{timeDate(tempOrder.paid_date)}}</td>
                </tr>
                <tr>
                  <th scope="row" width="80">付款狀態</th>
                  <td>{{tempOrder.is_paid === true ? "已付款": "未付款"}}</td>
                </tr>
                <tr>
                  <th scope="row" width="80">總金額</th>
                  <td>{{tempOrder.total}}</td>
                </tr>
              </tbody>
            </table>
            <h3>選購商品</h3>
            <table class="table">
              <tbody>
                <tr v-for="product in tempOrder.products" :key="product.id">
                  <th scope="row">{{product.product.title}}</th>
                  <td>{{product.qty}} {{ product.product.unit }}</td>
                  <td>{{product.final_total}}</td>
                </tr>
                <tr>
                  <td>
                    <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="checkPaid" v-model="tempOrder.is_paid">
                  <label class="form-check-label" for="checkPaid">{{tempOrder.is_paid === true ? "已付款" : "未付款"}}</label>
                </div></td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('updatePaid', tempOrder)">
            確認修改
          </button> 
          <!-- 直接打emit到父層去做修改 -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin.js'
import dateMixin from '@/mixins/dateMixin.js'
// const { VITE_API, VITE_PATH } = import.meta.env
export default {
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      tempOrder: {},
      modal: ''
    };
  },
  watch:{
    order(){
      this.tempOrder = this.order;
      // console.log(this.tempOrder);
    }
  },
  mixins: [modalMixin,dateMixin], //混合元件方法 mixins

  methods: {
   
  }
};
</script>
