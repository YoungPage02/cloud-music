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
// 点击搜索按钮，得到搜索的歌曲数据
export function getSearchMusic(data) {
  return service({
    url: `/cloudsearch?keywords=${data}`,
    method: 'GET'
  })
}
// 手机号登录
export function getPhoneLogin(data) {
  return service({
    url: `/login/cellphone?phone=${data.phone}&password=${ data.password }`,
    method: 'GET'
  })
}
//得到个人用户信息/user/detail?uid=32953014
export function getUserInfo(id) {
  return service({
    url: `/user/detail?uid=${id}`,
    method: 'GET'
  })
}