import config from '@/utils/config'


export function getHotMovie(page) {
  let url = "/v2/movie/in_theaters";
  wx.request({
    url: config.host + url,
    data: {
      start: (page - 1) * 20
    },
    method: "GET",
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      if (res.errMsg === 'request:ok') {
        console.log(res.data.subjects);

        return res.data.subjects;
      }
    },
    fail(err) {
      console.log(err);
    }
  });

}

export default {
  getHotMovie
}
