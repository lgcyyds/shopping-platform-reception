<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 在search和register的时候隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //不放在TypeNav而放在这里，就不会每次出现TypeNav就发送一次请求
    this.$store.dispatch('categoryList');
  }
}
</script>

<style>
</style>
