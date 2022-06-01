<template>
  <div class="user-info">
    <div class="back-home" @click="$router.push('/')">
      <van-icon name="arrow-left" />
      <span>返回</span>
    </div>
    <div class="top">
      <!-- 背景 -->
      <img class="bg-img" src="@/assets/古明地恋.jpg" alt="">
      <div class="nick-img">
        <img :src="userInfo.data.profile.avatarUrl" alt="">
      </div>
      <div class="nick-name">
        {{userInfo.data.profile.nickname}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    return {
      userInfo
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  .back-home {
    padding: .3rem;
    font-size: .35rem;
  }
  .top {
    width: 100%;
    // background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bg-img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: -1;
      opacity: .8;
    }
    .nick-img {
      display: flex;
      justify-content: center;
      img {
        width: 20%;
        border-radius: 50%;
        margin-top: .5rem;
      }
    }
    .nick-name {
      margin: .2rem 0;
    }
  }
}
</style>