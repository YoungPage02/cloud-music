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
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
    method: 'GET'
  })
}
// 二维码 key 生成接口
export function getBaseKey(data) {
  return service({
    url: '/login/qr/key',
    method: 'GET'
  })
}
// 二维码生成接口
export function getBase64(data) {
  return service({
    url: `/login/qr/create?qrimg&key=${data}`,
    method: 'GET'
  })
}
// 得到验证码
export function getVerCode(data) {
  return service({
    url: `/captcha/sent?phone=${data}`,
    method: 'GET'
  })
}
// 验证验证码 说明 : 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确
export function loginBycode(data) {
  return service({
    url: `/captcha/verify?phone=${data.phone}&captcha=${data.code}`,
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

// 获得精品歌单
export function getGreatMenu(cat) {
  return service({
    url: `/top/playlist/highquality?limit=10&cat=${cat}`
  })
}