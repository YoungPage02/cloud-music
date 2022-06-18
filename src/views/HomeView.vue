<template>
   <div class="home-view">
    <TopNav></TopNav>
    <SwiperTop></SwiperTop>
    <IconList></IconList>
    <lazy-component>
      <MusicList></MusicList>
    </lazy-component>
    <lazy-component>
      <MusicMenu :cat = 'cat[0]'></MusicMenu>
    </lazy-component>
    <lazy-component>
      <MusicMenu :cat = 'cat[1]'></MusicMenu>
    </lazy-component>
    <lazy-component>
      <MusicMenu :cat = 'cat[2]'></MusicMenu>
    </lazy-component>
    <lazy-component>
      <MusicMenu :cat = 'cat[3]'></MusicMenu>
    </lazy-component>
   </div>
</template>

<script>
import TopNav from '@/components/home/TopNav.vue'
import SwiperTop from '@/components/home/SwiperTop.vue'
import IconList from '@/components/home/IconList'
// import IconList from '@/components/home/IconList.vue'
import MusicList from '@/components/home/MusicList.vue'
import MusicMenu from '@/components/home/MusicMenu.vue'
export default {
  components: {
    TopNav,
    SwiperTop,
    IconList,
    MusicList,
    MusicMenu
  },
  setup() {
    const cat = ['ACG','华语','欧美','轻音乐']
    return {cat}
  }
}
</script>

<style lang="less" scoped>
  .home-view {
    margin-bottom: 1.2rem;
  }
</style>
