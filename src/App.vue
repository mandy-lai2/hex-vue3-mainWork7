<script>
import {RouterView } from 'vue-router'
// const { VITE_API, VITE_PATH } = import.meta.env
export default{
  components:{RouterView}
}
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style lang="scss" scoped>

</style>
