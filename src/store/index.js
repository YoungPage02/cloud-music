import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item.js'
export default createStore({
  state: {
    playList: [
      {
        al: {
          id: 87992021,
          name: "Fairy Tail",
          pic: 109951164906684960,
          picUrl: "http://p3.music.126.net/Gd0cuH0DEpBacVsOQfYcwQ==/109951164906684958.jpg",
          pic_str: "109951164906684958"
        },
        id: 1440679725,
        name: 'Fairy Tail'
      }
    ],
    playListIndex: 0,  // playlist的下标
    audioPaused: true,  // 暂停按钮的显示true为暂停按钮
    lyricDetailShoe: false,  // 歌词详情页的显示（弹出层）
    musicLyric: {}, //歌词的数据
    currentTime: 0, //歌曲当前时间
    duration: 0, //歌曲总时间
    isLogin: false, //判断是否登录，false为没有登录
    isFooter: true, //判断底部footer播放器是否显示，true为显示
    userInfo: {} //个人用户信息
  },
  getters: {
  },
  mutations: {
    changeAudio(state,value) {
      state.audioPaused = value
    },
    // 更新playList的全部数据
    updataPlayList(state,value) {
      state.playList = value
    },
    // 添加数据到playList
    addPlayList(state,value) {
      state.playList.push(value)
    },
    updataPlayListIndex(state,value) {
      state.playListIndex = value
    },
    changeLyricDetailShoe(state,value) {
      state.lyricDetailShoe = value
    },
    updataMusicLyric(state,value) {
      state.musicLyric = value
    },
    updatacurrentTime(state,value) {
      state.currentTime = value
      // console.log(state.currentTime);
    },
    updateDuration(state,value) {
      state.duration = value
    },
    changeIsLogin(state,value) {
      state.isLogin = value
    },
    getUserInfo(state,value) {
      state.userInfo = value
    }
  },
  actions: {
    async getMusicLyric_vuex(context,value) {
      let res = await getMusicLyric(value)
      // console.log(res,'歌词的数据');
      context.commit('updataMusicLyric',res.data.lrc)
    }
  },
  modules: {
  }
})
