<script>
import {get} from './utils/index'
import qcloud from 'wafer2-client-sdk'
import config from './utils/config'
export default {
  async created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // console.log('app created and cache logs by setStorageSync')
    // const res = await get('https://api.myjson.com/bins/g87hy');
    // console.log(123, res);

  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.textover{
  display: inline-block;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.margintitle{
  font-size: 16px;
  line-height: 2;
  background: #eee;
  color: #000000;
  margin: 10px auto;
  padding-left: 10px;
}
</style>
