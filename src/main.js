import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ea5149',
      navigationBarTitleText: 'movie',
      navigationBarTextStyle: 'white'
    },
    "tabBar": {
      selectedColor: '#ea5149',
      list: [
        {
          pagePath: 'pages/books/main',
          text: '电影',
          iconPath: 'static/imgs/book.png',
          selectedIconPath: 'static/img/book-active.png'
        },
        {
          pagePath: 'pages/comments/main',
          text: '评论',
          iconPath: 'static/imgs/todo.png',
          selectedIconPath: 'static/img/todo-active.png'
        },
        {
          pagePath: 'pages/me/main',
          text: '我',
          iconPath: 'static/imgs/me.png',
          selectedIconPath: 'static/img/me-active.png'
        }
      ]
    }
  }
}
