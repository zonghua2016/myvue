var WXBizDataCrypt = require('./WXBizDataCrypt')

var appId = 'wx47f3aab4e6d0dc93'
var AppSecret = '4f199c35317df1cb20be6b9b9f4ac7cf';
var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
export default function getresdata(iv, encryptedData) {
  var pc = new WXBizDataCrypt(appId, sessionKey)

  return pc.decryptData(encryptedData, iv)
}
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
