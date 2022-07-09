<template>
  <div class="Footer van-safe-area-bottom">
    <div class="left" @click="$store.commit('changeLyricDetailShoe',true)">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div class="van-ellipsis">
        <p class="musicName"> {{ playList[playListIndex].name }} </p>
        <p class="des">横滑切换上下首</p>
      </div>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model:show="$store.state.lyricDetailShoe" position="top" :style="{ height: '100%' }">
      <LyricDetail :playList = "playList" :play = "play" :changeCuration = "changeCuration"></LyricDetail>
    </van-popup>
    <div class="right">
      <van-icon class="start" name="play-circle-o" size=".6rem" @click="play" v-if="audioPaused"/>
      <van-icon class="start" name="pause-circle-o" size=".6rem" @click="play" v-else/>
      <van-icon name="bars" size=".5rem"/>
      <audio ref="audioRef" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `" @timeupdate="timeUpdate" @canplay="getDuration"></audio>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {ref, onMounted,computed, onUpdated,watch} from 'vue'
import LyricDetail from '@/components/globle/LyricDetail.vue'
export default {
  setup() {
    const audioRef = ref(null)
    const store = useStore()
    const playList = computed(() => store.state.playList)
    const playListIndex= computed(() => store.state.playListIndex)
    // console.log(audioRef.value,'audioRef-----前')
    onMounted(() => {
      // console.log(audioRef,'audioRef-----后');
      // console.log(playList[playListIndex],'playList[playListIndex]的数据');
      // console.log(audioRef.value.paused,'audioRef.value的数据');
    })
    onUpdated(() => {
    })
    // 歌曲播放，传入duration到vuex中
    function getDuration() {
      // 存储歌曲总时间到vuex中
      store.commit('updateDuration',(audioRef.value.duration)*1000)
      // console.log(audioRef,'audioRef的值');
      // console.log(Number(audioRef.value.duration),'audioRef.value.duration的值');
      // console.log(store.state.duration,'歌曲总时间-来自update');
    }
    function changeCuration() {
      // 存储歌曲总时间到vuex中
      store.commit('updateDuration',(audioRef.value.duration*1000))
      // console.log(store.state.duration,'歌曲总时间-来自方法');
    }
    watch(() => store.state.playList,(newVal,oldVal) => {
      console.log('监听到了吗？');
      audioRef.value.autoplay = true
      store.commit('changeAudio',false)
    },{deep: true})
    // 播放、暂停事件
    function play() {
      if(store.state.audioPaused) {
        audioRef.value.play()
        // store.state.audioPaused = false
        store.commit('changeAudio',false)
      }else {
        audioRef.value.pause()
        // store.state.audioPaused = true
        store.commit('changeAudio',true)
      }
    }
    // 歌曲播放时触发的时间-将当前歌曲播放时间传入vuex
    function timeUpdate(e) {
      // console.log(e);
      store.commit('updatacurrentTime',e.target.currentTime * 1000)
    }
    /* function updataTime() {
      setInterval(() => {
        store.commit('updatacurrentTime',audioRef.value.currentTime)
      },1000)
    } */
    return {
      audioRef,
      play,
      playList,
      playListIndex,
      audioPaused: computed(() => store.state.audioPaused),
      timeUpdate,
      changeCuration,
      getDuration
    }
  },
  updated() {
    // 上传id得到歌词数据
    this.$store.dispatch('getMusicLyric_vuex',this.$store.state.playList[this.$store.state.playListIndex].id)
    // console.log(this.$store.state.playList[this.$store.state.playListIndex],'this.$store.state.playList[this.$store.state.playListIndex]的值');
    /* this.$store.commit('updateDuration',this.$refs.audioRef.duration)
    console.log(this.$store.state.duration,'歌曲总时间'); */
  },
  /* watch: {
    playList() {
      this.$refs.audioRef.autoplay = true
      this.$store.commit('changeAudio',false)
    }
  }, */
  components: {
    LyricDetail
  }
}
</script>

<style lang="less" scoped>
.Footer {
  width: 100%;
  height: 1.2rem;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
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