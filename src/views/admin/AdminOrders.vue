<template>
  <div class="container">
    <div class="row py-3">
      <div class="col-12">
        <h2>訂單列表</h2>
        <table class="table table-hover mt-5">
          <thead>
            <tr>
              <th width="100">購買時間</th>
              <th width="100">Email</th>
              <th width="160">購買項目</th>
              <th width="100">應付金額</th>
              <th width="100">是否付款</th>
              <th width="160">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td width="100">{{ timeDate(order.create_at) }}</td>
              <td width="150">{{ order.user.email }}</td>
              <td width="120">
                <ul class="list-unstyled">
                  <li v-for="product in order.products" :key="product.id" class="text-success mb-2">{{ product.product.title }} 數量：{{ product.qty }}</li>
                </ul>
              </td>
              <td width="120">{{ order.total }}</td>
              <td width="100">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" :id="`checkPaid${order.id}`" v-model="order.is_paid"  @change="updateOrder(order)">
                  <label class="form-check-label" :for="`checkPaid${order.id}`">{{order.is_paid === true ? "已付款" : "未付款"}}</label>
                </div>
              </td>
              <td width="120">
                <button type="button" class="btn btn-outline-primary me-2" @click="OpenModal('edit', order)">
                  檢視
                </button>
                <button type="button" class="btn btn-outline-danger" @click="OpenModal('del', order)">
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationComponent :pages="pagination" @emit-pages="getProducts"></PaginationComponent>
      </div>
    </div>
  </div>
  <OrderModal ref="orderModal" :order="tempOrder" @update-paid="updateOrder"></OrderModal>
  <DelOrderModal :temp-order="tempOrder" @get-orders="getOrders" @close-modal="closeModal" ref="delOrderModal"></DelOrderModal>
</template>
<script>
import OrderModal from '@/components/OrderModal.vue';
import DelOrderModal from '@/components/DelOrderModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import dateMixin from '@/mixins/dateMixin.js'
const { VITE_API, VITE_PATH } = import.meta.env
export default{
  data() {
    return {
      orders:[],
      pagination:{},
      tempOrder:{}
    };
  },
  components:{
    OrderModal,
    DelOrderModal,
    PaginationComponent
  },
  mixins: [dateMixin],
  methods:{
    getOrders(page = 1) {
      this.$http
        .get(`${VITE_API}/api/${VITE_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          console.log(res.data);
          const { pagination, orders } = res.data;
          this.orders = orders;
          this.pagination = pagination
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    // 更新訂單
    updateOrder(order){
      this.$http
        .put(`${VITE_API}/api/${VITE_PATH}/admin/order/${order.id}`,{data:order})
        .then((res) => {
          alert(res.data.message);
          this.getOrders()
          this.closeModal('modal')
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    // 開啟modal
    OpenModal(effect, order) {
      const orderModal = this.$refs.orderModal
      const delOrderModal = this.$refs.delOrderModal
      if (effect === "edit") {
        this.tempOrder = { ...order };
        orderModal.openModal()
      } else if (effect === "del") {
        this.tempOrder = { ...order };
        delOrderModal.openModal()
      }
    },
    //關閉modal
    closeModal(modal) {
      const orderModal = this.$refs.orderModal
      const delOrderModal = this.$refs.delOrderModal
      if (modal === "modal") {
        orderModal.hideModal()
      } else if (modal === "delModal") {
        delOrderModal.hideModal()
      }
    },
  },
  mounted() {
    this.getOrders()
  },
}
</script>