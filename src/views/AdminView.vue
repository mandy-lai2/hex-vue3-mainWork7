<template>
<nav class="navbar navbar-expand-lg bg-light mb-4">
  <div class="container">
    <div class="navbar-brand fw-bold text-success" >有機下蛋 後台</div>  
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex-lg justify-content-center" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/admin/products" class="nav-link">產品管理</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/admin/orders" class="nav-link">訂單管理</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/admin/coupons" class="nav-link">優惠券管理</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/admin/news" class="nav-link">最新消息管理</RouterLink>
        </li>
      </ul>
      <button type="button" class="btn btn-secondary ms-auto" @click.prevent="logout">登出</button>
    </div>
   
  </div>
</nav>

<div class="container">
  <RouterView></RouterView>
</div>
<div class="container">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <span class="mb-3 mb-md-0 text-muted">&copy; 2023 有機下蛋 Inc.</span>
    </div>
  </footer>
</div>
</template>
<script>
const { VITE_API } = import.meta.env
export default {
  data () {
    return {}
  },
  methods: {
    checkUser () {
      this.$http
        .post(`${VITE_API}/api/user/check`)
        .then(() => {
          // console.log(res.data)
        })
        .catch((error) => {
          if (!error.response.data.success) {
            this.$router.push('/')
          }
        })
    },
    logout () {
      document.cookie = `userToken=; expires=${new Date()};`
      this.$router.push('/')
    }
  },
  created () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = token
    this.checkUser()
  }
}
</script>