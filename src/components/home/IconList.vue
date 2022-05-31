<template>
  <div class="iconList">
    <!-- <van-tabbar v-model="active" :fixed=false>
      <van-tabbar-item icon="service-o">每日推荐</van-tabbar-item>
      <van-tabbar-item icon="video-o">私人FM</van-tabbar-item>
      <van-tabbar-item icon="music-o">每日歌单</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o">排行榜</van-tabbar-item>
    </van-tabbar> -->
    <div>
      <van-icon name="service-o" size=".5rem" />
      <span>每日推荐</span>
    </div>
    <div>
      <van-icon name="video-o" size=".5rem" />
      <span>私人FM</span>
    </div>
    <div>
      <van-icon name="music-o" size=".5rem" />
      <span>每日歌单</span>
    </div>
    <div>
      <van-icon name="bar-chart-o" size=".5rem" />
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.iconList {
  margin-top: .3rem;
  display: flex;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      margin-top: .15rem;
      font-size: .25rem;
    }
  }
}
</style>