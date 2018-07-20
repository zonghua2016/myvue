// 配置项
// const host = "http://localhost:5757";
// https://api.douban.com//v2/movie/in_theaters
const host = 'https://douban.uieee.com/';
// const host = 'http://zp.joyme.com/api';
const config = {
    host,
    loginUrl: `${host}/weapp/login`,
    userUrl: `${host}/weapp/user`
};
export default config;