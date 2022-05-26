<template>
  <div class="topNav">
    <van-nav-bar left-text="返回"  border :placeholder=false>
      <template #title>
        <!-- <van-row>
          <van-col span="6">我的</van-col>
          <van-col span="6">发现</van-col>
          <van-col span="6">云村</van-col>
          <van-col span="6">视频</van-col>
        </van-row> -->
        <div class="center">
          <span>我的</span>
          <span class="active">发现</span>
          <span>云村</span>
          <span>视频</span>
        </div>
      </template>
      <template #left>
        <van-icon name="wap-nav" size=".4rem" style="color : black"/>
      </template>
      <template #right>
        <van-icon name="search" size=".4rem" style="color : black"/>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
name: 'TopNav'
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__title {
    width: 100%;
  }
.center {
  display: flex;
  justify-content: space-around;
  .active {
    font-weight: bold;
  }
}
</style>