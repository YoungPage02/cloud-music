<template>
    <router-view/>
    <Footer></Footer>
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
</style>