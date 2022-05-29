<template>
  <div class="lyric-detail">
    <!-- 顶部 -->
    <div class="top">
      <div class="left">
        <van-icon name="arrow-left" size=".5rem" @click="this.$store.commit('changeLyricDetailShoe')"/>
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
    <div class="content" v-show="cdShow">
      <img src="@/assets/needle-ab.png" alt="" class="needle" :class="audioPaused ? '': 'needle_active'">
      <img src="@/assets/cd.png" alt="" class="cd">
      <img :src="playList[playListIndex].al.picUrl" alt="" class="head-img" :class="audioPaused ? 'img_pause' : 'img_active'">
    </div>
    <!-- 歌词区域 -->
    <div class="lyric" @click="Lyric">
      {{ $store.state.musicLyric.lyric }}
    </div>
    <!-- 底部区域 -->
    <div class="footer">
      <div class="footer-top">
        <van-icon name="like-o" size=".5rem"/>
        <van-icon name="down" size=".5rem"/>
        <van-icon name="chat-o" size=".5rem"/>
        <van-icon name="exchange" size=".5rem"/>
      </div>
      <div class="footer-bottom">
        <van-icon name="revoke" />
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <van-icon name="pause-circle-o" size=".7rem" v-if="!$store.state.audioPaused" @click="play"/>
        <van-icon name="play-circle-o" size=".7rem" v-else @click="play"/>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
        <van-icon name="bars" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive,ref } from 'vue'
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  props: ['playList','play'],
  setup(props) {
    const cdShow = false  //磁盘是否显示
    const store = useStore()
    const playList = computed(() => store.state.playList)
    const playListIndex = computed(() => store.state.playListIndex)
    const audioPaused = computed(() => store.state.audioPaused)
    function Lyric() {
      let arr
      if(store.state.musicLyric) {
        arr = store.state.musicLyric.lyric.split(/[(\r\n)\r\n]+/).map((item,index) => {
          let min = item.slice(1,3)
          let sec = item.slice(4,6)
          let mill = item.slice(7,10)
          let lrc = item.slice(11,item.length)
          console.log(min,sec,mill,lrc);
        })
      }
    }
    onMounted(() => {
      console.log(store.state.musicLyric.lyric,'歌词的字符串形式');
    })
    console.log(playList,'playList的值');
    console.log(playListIndex,'playListIndex的值');
    return {
      playList,
      playListIndex,
      audioPaused,
      cdShow,
      Lyric
    }
  }

}
</script>

<style lang="less" scoped>
.lyric-detail {
  width: 100%;
  height: 100%;
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
  // background-color: lightblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  .needle {
    height: 2.5rem;
    position: absolute;
    left: 53%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
    z-index: 2;
  }
  .needle_active {
    height: 2.5rem;
    position: absolute;
    left: 53%;
    transform-origin: 0 0;
    transform: rotate(8deg);
    transition: all 2s;
    z-index: 2;
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
    animation: rotate_z 10s linear infinite;
  }
  .img_active {
    animation-play-state: running;
  }
  .img_pause {
    animation-play-state: paused;
  }
  @keyframes rotate_z {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  .footer-top {
    display: flex;
    justify-content: space-between;
    padding: .3rem;
    color: white;
  }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .3rem;
    font-size: .5rem;
    color: white;
  }
}
}
</style>