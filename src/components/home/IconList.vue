<template>
  <div class="iconList">
    <van-tabbar v-model="active" :fixed=false>
      <van-tabbar-item icon="service-o">每日推荐</van-tabbar-item>
      <van-tabbar-item icon="video-o">私人FM</van-tabbar-item>
      <van-tabbar-item icon="music-o">每日歌单</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o">排行榜</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.iconList {
  margin-top: .2rem;
}
</style>