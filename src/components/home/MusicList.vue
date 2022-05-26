<template>
  <div class="musicList">
    <van-row justify="space-between">
      <van-col span="7" class="findMusic">
        发现好歌单
      </van-col>
      <van-col span="7" class="btn">
        <van-button round plain size="small">查看更多</van-button>
      </van-col>
    </van-row>
    <div class="musicContent">
      <van-swipe :loop="false" :width="150" :show-indicators=false>
        <van-swipe-item v-for="item in musicData.musicList" :key="item.id">
          <router-link :to=" { path: '/itemMusic',query: { id: item.id } } ">
            <img :src="item.picUrl" alt="">
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
import { getMusicList } from '@/request/api/home'
import { reactive, onMounted} from 'vue'
export default {
setup() {
  const musicData = reactive({
    musicList:[]
  })
  function changeCount(num) {
    if(num > 100000000) {
      return (num/100000000).toFixed(1) + '亿'
    }
    if(num > 10000) {
      return (num/10000).toFixed(1) + '万'
    }
  }
  onMounted(async () => {
    let res = await getMusicList()
    console.log(res,'推荐歌单数据'); 
    musicData.musicList = res.data.result
  })
  return { musicData , changeCount}
}
}
</script>

<style lang="less" scoped>
.musicList {
  margin-top: .2rem;
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
    margin-top: .2rem;
    .van-swipe {
      width: 100%;
      height: 100%;
      .van-swipe-item {
        padding-right: .2rem;
        span {
          position: absolute;
          top: 3px;
          right: .3rem;
          font: .3rem;
          color: white;
        }
        p {
          color: black;
          font: .3rem;
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