<template>
  <div class="Footer">
    <div class="left" @click="$store.commit('changeLyricDetailShoe')">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div class="van-ellipsis">
        <p class="musicName"> {{ playList[playListIndex].name }} </p>
        <p class="des">横滑切换上下首</p>
      </div>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model:show="$store.state.lyricDetailShoe" position="top" :style="{ height: '100%' }">
      <LyricDetail :playList = "playList" :play = "play"></LyricDetail>
    </van-popup>
    <div class="right">
      <van-icon class="start" name="play-circle-o" size=".6rem" @click="play" v-if="audioPaused"/>
      <van-icon class="start" name="pause-circle-o" size=".6rem" @click="play" v-else/>
      <van-icon name="bars" size=".5rem"/>
      <audio ref="singMusic" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"></audio>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {ref, onMounted,computed, onUpdated} from 'vue'
import LyricDetail from '@/components/globle/LyricDetail.vue'
export default {
  setup() {
    const singMusic = ref(null)
    const store = useStore()
    const playList = computed(() => store.state.playList)
    const playListIndex= computed(() => store.state.playListIndex)
    // console.log(singMusic.value,'singMusic的数据-----前')
    onMounted(() => {
      // console.log(singMusic,'singMusic的数据-----后');
      // console.log(playList[playListIndex],'playList[playListIndex]的数据');
      // console.log(singMusic.value.paused,'singMusic.value的数据');
    })
    /* onUpdated(() => {
      store.dispatch('getMusicLyric_vuex',playList[playListIndex].id)
    }) */
    // console.log(store.state.playList,'playList的值');
    function play() {
      if(store.state.audioPaused) {
        singMusic.value.play()
        // store.state.audioPaused = false
        store.commit('changeAudio',false)
      }else {
        singMusic.value.pause()
        // store.state.audioPaused = true
        store.commit('changeAudio',true)
      }
    }
    return {
      singMusic,
      play,
      playList,
      playListIndex,
      audioPaused: computed(() => store.state.audioPaused)
    }
  },
  updated() {
    this.$store.dispatch('getMusicLyric_vuex',this.$store.state.playList[this.$store.state.playListIndex].id)
    console.log(this.$store.state.playList[this.$store.state.playListIndex],'this.$store.state.playList[this.$store.state.playListIndex]的值');
  },
  watch: {
    playList() {
      this.$refs.singMusic.autoplay = true
      this.$store.commit('changeAudio',false)
    }
  },
  components: {
    LyricDetail
  }
}
</script>

<style lang="less" scoped>
.Footer {
  height: 1.5rem;
  background-color: grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 0;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: .2rem;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    div {
      width: 150px;
      margin-left: .3rem;
      .musicName {
        font-weight: bold;
      }
      .des {
        font-size: .2rem;
      }
      p {
        margin: 0;
        padding: 0;
      }
    }
  }
  .right {
    margin-right: .3rem;
    display: flex;
    align-items: center;
    .start {
      margin-right: .3rem;
    }
  }
}
</style>