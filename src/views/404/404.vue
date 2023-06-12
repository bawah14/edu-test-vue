<template>
  <div class="not-found">
    <div class="not-found-container">
      <pageNotFound />
      <div class="not-found-button">
        <router-link to="/">Kembali</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    pageNotFound: () => import(/* webpackChunkName: "illustration" */ '@/components/Illustration/404')
  }
}
</script>
<style lang="scss" scoped>
.not-found {
  background-color: #fff;
  width: 100%;
  height: 100%;
  max-width: 500px;
  text-align: center;
  color: #fff;
  padding: 60px 20px;
  border-bottom: 1px solid #fff;
  margin: 0 auto;
  &-container {
    text-align: center;
  }
  &-message {
    font-size: 28px;
    margin-top: 30px;
  }
  &-button {
    margin-top: 20px;
    a {
      display: inline-block;
      color: #fff;
      background-color: #ffa801;
      border: none;
      outline: none;
      font-size: 16px;
      font-weight: bold;
      padding: 8px 40px;
      border-radius: 3px;
    }
  }
}
</style>
