<template>
  <div class="swiperTop">
    <van-swipe :autoplay="9000" lazy-render>
    <van-swipe-item v-for="image in swiperData.images" :key="image">
      <img :src="image.pic" />
    </van-swipe-item>
  </van-swipe>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive,onMounted } from 'vue'
import { getBanner } from '@/request/api/home.js'
export default {
  setup() {
    const swiperData = reactive({
      images: []
    })
    /* const images = [
      'https://img2.baidu.com/it/u=2022396157,1891106383&fm=253&fmt=auto&app=138&f=JPEG?w=892&h=500',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F84bf9eb0a9ae1d303696d523b1cf1062ab0ea1ab.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656064032&t=0d11de18ac180d9e7559ed2911e74414',
    ]; */
    onMounted(async () => {
      /* axios.get('http://localhost:3000/banner?type=2').then((res) => {
        console.log(res);
        swiperData.images = res.data.banners
        console.log(swiperData.images);
      }) */
      let res = await getBanner()
      swiperData.images = res.data.banners
      console.log(res,'轮播图数据');
    })
    return { swiperData };
  },
}
</script>

<style lang="less" scoped>
.swiperTop {
  width: 95%;
  margin: .2rem auto 0;
  .van-swipe {
  .van-swipe-item {
    width: 100%;
    img {
      width: 100%;
      border-radius: .2rem;
      // padding: .2rem;
    }
  }
}
}
</style>