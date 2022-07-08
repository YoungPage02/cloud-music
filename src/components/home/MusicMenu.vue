<template>
  <div class="musicList">
    <van-row justify="space-between">
      <van-col span="7" class="findMusic">
        {{cat}}歌单
      </van-col>
      <van-col span="7" class="btn">
        <van-button round plain size="small">查看更多</van-button>
      </van-col>
    </van-row>
    <div class="musicContent">
      <van-swipe :loop="false" :width="120" :show-indicators=false>
        <van-swipe-item v-for="item in musicData.musicList" :key="item.id">
          <router-link :to=" { path: '/itemMusic',query: { id: item.id } } ">
            <img :src="item.coverImgUrl" alt="">
            <span>
              <van-icon name="flag-o" color="white"/>
              {{ changeCount(item.playCount) }}
            </span>
            <p>
              {{ item.name }}
            </p>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getGreatMenu } from '@/request/api/home'
import { reactive, onMounted} from 'vue'
export default {
  props: ['cat'],
  setup(props) {
    const musicData = reactive({
      musicList:[]
    })
    const cat = props.cat
    // console.log(props.cat);
    function changeCount(num) {
      if(num > 100000000) {
        return (num/100000000).toFixed(1) + '亿'
      }
      if(num > 10000) {
        return (num/10000).toFixed(1) + '万'
      }
    }
    onMounted(async () => {
      // 得到歌单数据
      let res = await getGreatMenu(props.cat)
      // console.log(res,props.cat,'日语歌单数据'); 
      musicData.musicList = res.data.playlists
    })
    return { musicData , changeCount,cat}
  }
}
</script>

<style lang="less" scoped>
.musicList {
  margin-top: .15rem;
  .van-row {
    align-items: center;
    .btn {
      display: flex;
      justify-content: center;
    }
    .findMusic {
      padding-left: .3rem;
      font-weight: 900;
    }
  }
  .musicContent {
    width: 100%;
    margin-top: .06rem;
    .van-swipe {
      width: 100%;
      height: 100%;
      .van-swipe-item {
        box-sizing: border-box;
        padding-right: .2rem;
        span {
          position: absolute;
          top: 3px;
          right: .3rem;
          font-size: .1rem;
          color: white;
        }
        p {
          color: black;
          font-size: .2rem;
          margin: 0;
          padding: 0;
        }
        img {
          width: 100%;
          border-radius: .2rem;
        }
      }
    }
  }
}
</style>