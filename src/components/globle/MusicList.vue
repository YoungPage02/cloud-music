<template>
  <!-- 此为音乐的列表 -->
  <div class="list">
      <div class="listItem" v-for="(item,index) in musicList" :key="item.id">
        <div class="left" @click="playMusic(index)">
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
          <van-icon name="wap-nav" size=".5rem"/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['musicList','playMusic']
}
</script>

<style lang="less" scoped>
.list {
  margin-bottom: 1.5rem;
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
</style>