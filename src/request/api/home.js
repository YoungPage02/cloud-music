import service from "..";
// 得到轮播图的数据
export function getBanner() {
  return service({
    url: '/banner?type=2',
    method: 'GET'
  })
}
// 得到推荐歌单的数据
export function getMusicList() {
  return service({
    url: '/personalized?limit=10',
    method: 'GET'
  })
}