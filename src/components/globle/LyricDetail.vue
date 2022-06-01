<template>
  <div class="lyric-detail">
    <!-- 顶部 -->
    <div class="top">
      <div class="left">
        <!-- 返回按钮 -->
        <van-icon name="arrow-left" size=".5rem" @click="backHome"/>
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
    <div class="content" v-show="cdShow" @click="cdShow = false">
      <img src="@/assets/needle-ab.png" alt="" class="needle" :class="audioPaused ? '': 'needle_active'">
      <img src="@/assets/cd.png" alt="" class="cd">
      <img :src="playList[playListIndex].al.picUrl" alt="" class="head-img" :class="audioPaused ? 'img_pause' : 'img_active'">
    </div>
    <!-- 歌词区域 -->
    <div class="lyric_container" v-show="!cdShow">
      <div class="lyric" ref="lyricRef">
        <!-- {{ $store.state.musicLyric.lyric }} -->
        <p v-for="item in Lyric" :key="item" :class=" currentTime > item.time && currentTime < item.pre ? 'lyric_active' : '' ">
          {{ item.lrc }}
        </p>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="footer">
      <div class="footer-top">
        <van-icon name="like-o" size=".5rem"/>
        <van-icon name="down" size=".5rem"/>
        <van-icon name="chat-o" size=".5rem"/>
        <van-icon name="exchange" size=".5rem"/>
      </div>
      <!-- 歌曲进度条 -->
      <div class="footer-content">
        <input type="range" class="range" min="0" :max="duration" v-model="$store.state.currentTime" step="0.05">
      </div>
      <div class="footer-bottom">
        <van-icon name="revoke" />
        <!-- 切换到上一首 -->
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <!-- 播放暂停按钮 -->
        <van-icon name="pause-circle-o" size=".7rem" v-if="!$store.state.audioPaused" @click="play"/>
        <van-icon name="play-circle-o" size=".7rem" v-else @click="play"/>
        <!-- 切换到下一首 -->
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
        <van-icon name="bars" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive,ref } from 'vue'
import { computed, onMounted, watch, watchEffect } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  props: ['playList','play','changeCuration'],
  setup(props) {
    const cdShow = ref(true)  //磁盘是否显示,true表示显示
    const store = useStore()
    const playList = computed(() => store.state.playList)
    const playListIndex = computed(() => store.state.playListIndex)
    const audioPaused = computed(() => store.state.audioPaused)
    const currentTime = computed(() => store.state.currentTime)
    const duration = computed(() => store.state.duration)
    // 将歌词的字符串形式通过正则进行分隔
    const Lyric = computed(() => {
      let arr
      if(store.state.musicLyric) {
        arr = store.state.musicLyric.lyric.split(/[(\r\n)\r\n]+/).map((item,index) => {
          let min = item.slice(1,3)
          let sec = item.slice(4,6)
          let mill = item.slice(7,10)
          let lrc = item.slice(11,item.length)
          let time = parseInt(min*60*1000) + parseInt(sec*1000) + parseInt(mill)
          // console.log(min,sec,mill,lrc);
          if(isNaN(Number(mill))) {
            mill = item.slice(7,9)
            lrc = item.slice(10,item.length)
            time = parseInt(min*60*1000) + parseInt(sec*1000) + parseInt(mill)
          }
          // console.log(min,sec,mill,lrc);
          return {min,sec,mill,lrc,time}
        })
        arr.forEach((item,index) => {
          if(index == arr.length - 1 || isNaN(arr[index+1].time)) {
            item.pre = 100000
          }else {
            item.pre = arr[index + 1].time
          }
        });
        // console.log(arr);
        return arr
      }
    })
    // 返回上一页
    function backHome() {
      // cdShow.value = true
      store.commit('changeLyricDetailShoe',false)
      cdShow.value = true
    }
    // 切换上一首或下一首
    function goPlay(num) {
      let index = store.state.playListIndex + num
      if(index < 0) {
        index = store.state.playList.length - 1
      }else if(index == store.state.playList.length) {
        index = 0
      }
      store.state.playListIndex = index
      store.state.audioPaused = false
    }
    onMounted(() => {
      // console.log(store.state.musicLyric.lyric,'歌词的字符串形式');
      props.changeCuration()
      // console.log(store.state.duration,'store.state.duration--来自LyricDetail');
    })
    return {
      playList,
      playListIndex,
      audioPaused,
      cdShow,
      Lyric,
      currentTime,
      duration,
      backHome,
      goPlay
    }
  },
  watch: {
    currentTime(newValue) {
      let p = document.querySelector('.lyric_active')
      if(p) {
        // console.log([p.offsetTop]);
        // console.log([this.$refs.lyricRef.scrollTop]);
        if(p.offsetTop > 300) {
          this.$refs.lyricRef.scrollTop = p.offsetTop - 300
        }
      }
      if(newValue == this.duration) {
        this.goPlay(1)
      }
    }
  }

}
</script>

<style lang="less" scoped>
.lyric-detail {
  width: 100%;
  height: 100%;
  position: relative;
  .top {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: .3rem;
    background-color: pink;
    z-index: 2;
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
  filter: blur(70px);
  position: absolute;
  top: 0;
  z-index: -1;
}
// 磁盘等区域
.content {
  width: 100%;
  height: 9rem;
  padding-top: 1.5rem;
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
    transform: rotate(-13deg);
    transition: all 2s;
    z-index: 2;
  }
  .needle_active {
    height: 2.5rem;
    position: absolute;
    left: 53%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
    z-index: 2;
  }
  .cd {
    width: 4rem;
    position: absolute;
    top: 2.5rem;
    margin: 0 auto;
  }
  .head-img {
    width: 2.7rem;
    border-radius: 50%;
    position: absolute;
    top: 3.15rem;
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
// <!-- 歌词区域 -->
.lyric_container {
  width: 100%;
  overflow: hidden;
  padding-top: 1.5rem;
  .lyric {
    width: 102%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    p {
      margin: .18rem;
      padding: 0;
    }
    .lyric_active {
      color: white;
      font-size: .4rem;
    }
  }
}
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  .footer-top {
    display: flex;
    justify-content: space-between;
    padding: .3rem;
    color: white;
  }
  .range {
    width: 98%;
    height: .05rem;
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