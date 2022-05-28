<template>
  <div class="lyric-detail">
    <!-- 顶部 -->
    <div class="top">
      <div class="left">
        <van-icon name="arrow-left" size=".5rem"/>
        <div class="des">
          <p> {{ playList[playListIndex].name }} </p>
          <p class="van-ellipsis">
            <span v-for="item in playList[playListIndex].ar" :key="item.id">
              {{ item.name }}
            </span>
          </p>
        </div>
      </div>
      <div class="right">
        <van-icon name="share-o" size=".5rem"/>
      </div>
    </div>
    <!-- 背景 -->
    <img class="bgimg" :src="playList[playListIndex].al.picUrl" alt="">
    <!-- 磁盘等图片 -->
    <div class="content">
      <img src="@/assets/needle-ab.png" alt="" class="needle">
      <img src="@/assets/cd.png" alt="" class="cd">
      <img :src="playList[playListIndex].al.picUrl" alt="" class="head-img">
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  props: ['playList'],
  setup(props) {
    const store = useStore()
    const playList = computed(() => store.state.playList)
    const playListIndex = computed(() => store.state.playListIndex)
    console.log(playList,'playList的值');
    console.log(playListIndex,'playListIndex的值');
    return {
      playList,
      playListIndex
    }
  }

}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .3rem;
  background-color: pink;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .des {
      display: flex;
      flex-direction: column;
      margin-left: .3rem;
      p {
        margin: 0;
        padding: 0;
        color: white;
        span {
          margin-left: .1rem;
          font-size: .2rem;
          color: grey;
        }
      }
      .van-ellipsis {
        width: 150px;
        color: grey;
      }
    }
  }
}
.bgimg {
  width: 100%;
  height: 100%;
  filter: blur(40px);
  position: absolute;
  z-index: -1;
}
.content {
  width: 100%;
  height: 9rem;
  position: relative;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  .needle {
    height: 3rem;
    position: absolute;
    left: 53%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
  }
  .cd {
    width: 4rem;
    position: absolute;
    top: 1.5rem;
    margin: 0 auto;
  }
  .head-img {
    width: 2.7rem;
    border-radius: 50%;
    position: absolute;
    top: 2.15rem;
  }
}
</style>