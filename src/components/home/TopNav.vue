<template>
  <div class="topNav">
      <div class="left">
        <van-icon name="wap-nav" size=".5rem" style="color : black"/>
      </div>
      <div class="title">
        <span @click="$router.push('/userInfo')">我的</span>
        <span class="active">发现</span>
      </div>
      <div class="right" @click="$router.push('/search')">
        <van-icon name="search" size=".5rem" style="color : black"/>
      </div>
  </div>
</template>

<script>
export default {
name: 'TopNav'
}
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: .8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .2rem;
  box-sizing: border-box;
  border-bottom: .01rem solid black;
  .title {
    span {
      font-size: .35rem;
      margin-left: .2rem;
    }
    .active {
      font-weight: bold;
    }
  }
}
</style>