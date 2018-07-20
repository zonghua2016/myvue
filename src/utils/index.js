import config from './config'

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function get(url) {
  return request(url, 'GET', data)
}
export function post(url) {
  return request(url, 'post', data)
}

function request(url, method, data) {
  console.log(url);
  return new Promise((reslove, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        if (res.data.code === 0) {
          reslove(res.data.data)
        } else {
          reject(res.data.data)
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  })
}

export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
export default {
  formatNumber,
  formatTime,
  get,
  post,
  showSuccess
}
