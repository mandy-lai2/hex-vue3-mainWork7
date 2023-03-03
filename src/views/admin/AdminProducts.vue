<template>
  <div class="container">
    <div class="row py-3">
      <div class="col-12">
        <h2>產品列表</h2>
        <button type="button" class="btn btn-primary float-end" @click="OpenModal('new')">
          建立新的產品
        </button>
        <table class="table table-hover mt-5">
          <thead>
            <tr>
              <th width="100">分類</th>
              <th width="150">產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td width="100">{{ product.category }}</td>
              <td width="150">{{ product.title }}</td>
              <td width="120">{{ product.origin_price }}</td>
              <td width="120">{{ product.price }}</td>
              <td width="100">
                <span v-if="product.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td width="120">
                <button type="button" class="btn btn-outline-primary me-2" @click="OpenModal('edit', product)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger" @click="OpenModal('del', product)">
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <p>目前有 <span>{{ products.length }}</span> 項產品</p> -->
        <PaginationComponent :pages="pagination" @emit-pages="getProducts"></PaginationComponent>
      </div>

      <ProductModal :product="tempProduct" @get-products="getProducts" @close-modal="closeModal" ref="productModal"></ProductModal>
      <DelProductModal :temp-product="tempProduct" @get-products="getProducts" @close-modal="closeModal" ref="delProductModal"></DelProductModal>

    </div>
  </div>
 
</template>
<script>
import ProductModal from '@/components/ProductModal.vue';
import DelProductModal from '@/components/DelProductModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_API, VITE_PATH } = import.meta.env
export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
     
    };
  },
  components: {
    ProductModal,
    DelProductModal,
    PaginationComponent
  },
  methods: {
    getProducts(page = 1) {
      this.$http
        .get(`${VITE_API}/api/${VITE_PATH}/admin/products?page=${page}`)
        .then((res) => {
          // console.log(res.data);
          const { pagination, products } = res.data;
          this.products = products;
          this.pagination = pagination;
          // console.log(this.pagination);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    // 開啟modal
    OpenModal(effect, product) {
      const productMode = this.$refs.productModal
      const delProductModal = this.$refs.delProductModal
      if (effect === "new") {
        this.tempProduct = { imagesUrl: [] };
        productMode.openModal()
      } else if (effect === "edit") {
        this.tempProduct = { ...product };
        productMode.openModal()
      } else if (effect === "del") {
        this.tempProduct = { ...product };
        delProductModal.openModal()
      }
    },
    //關閉modal
    closeModal(modal) {
      const productMode = this.$refs.productModal
      const delProductModal = this.$refs.delProductModal
      if (modal === "modal") {
        productMode.hideModal()
      } else if (modal === "delModal") {
        delProductModal.hideModal()
      }
    },
  },
  mounted() {
    this.getProducts();
  },
}
</script>