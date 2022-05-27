<template>
  <div class="musicList">
    <div class="top">
      <div class="left">
        <van-icon name="play-circle" size=".5rem"/>
        <span>播放全部</span>
        <span>(共 {{ musicList.length }} 首)</span>
      </div>
      <div class="right">
        <van-button icon="plus" type="danger" round >收藏({{ playlist.subscribedCount }})</van-button>
      </div>
    </div>
    <div class="list">
      <div class="listItem" v-for="(item,index) in musicList" :key="item.id">
        <div class="left">
          <span class="index"> {{ index + 1 }} </span>
          <div class="value">
            <div class="van-ellipsis"> {{ item.name }} </div>
            <div class="author van-ellipsis">
              <p v-for="item1 in item.ar" :key="item1">
                {{ item1.name }}
              </p>
            </div>
          </div>
        </div>
        <div class="right">
          <van-icon class="mv" name="video-o" size=".5rem" v-if="item.mv !== 0"/>
          <van-icon name="wap-nav" size=".5rem" v-else/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  props : [ 'musicList', 'playlist' ],
  setup(props) {
    const loading = ref(false);
    const finished = ref(false);
    const list = ref(props.musicList)
    /* const state = reactive({
      musicList: []
    }) */
    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        if (list.value.length == 20) {
          finished.value = true;
        }
      }, 1000);
    }
    console.log(props,'musicList的数据');
    return {
      onLoad,
      loading,
      finished
    }
  }
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  /* height: 350px;
  position: fixed;
  bottom: 0; */
  background-color: white;
  border-top-left-radius: .3rem;
  border-top-right-radius: .3rem;
  .top {
    display: flex;
    justify-content: space-between;
    margin-top: .2rem;
    padding: .1rem;
    .left {
      display: flex;
      align-items: center;
      .van-icon {
        margin: 0 .3rem 0 .1rem;
      }
    }
    .left :nth-child(2) {
      font-size: .3rem;
      font-weight: bold;
    }
  }
  .listItem {
    height: .7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem;
    .left {
      display: flex;
      justify-content: space-between;
      .index {
        width: .3rem;
        text-align: center;
        line-height: .7rem;
      }
      .value {
        width: 200px;
        margin-left: .4rem;
        display: flex;
        flex-direction: column;
        .author {
          display: flex;
          justify-content: flex-start;
          p {
            margin: 0 .1rem 0 0;
            padding: 0;
            font-size: .2rem;
          }
        }
      }
    }
    .right{
      .mv {
        margin-right: .3rem;
      }
    }
  }
}
</style>