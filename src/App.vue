<template>
    <div class="app">
      <router-view/>
      <Footer v-show="$store.state.isFooter"></Footer>
    </div>
</template>

<script>
import Footer from '@/components/globle/Footer.vue'
export default {
  components: {
    Footer
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  width: 100%;
  height: 100%;
}
</style>