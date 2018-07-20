// 新增图书
// 1、获取豆瓣信息
// 2、入库
module.exports = async (ctx) => {
  const isbn = ctx.query.body;
  if (isbn) {
    let url = 'https://api.douban.com/v2/book/isbn/' + isbn;
    let bookinfo = await getJSON(url);
    console.log(bookinfo);

  }
}

function getJSON(url) {
  return new Promise((reslove, reject) => {
    https.get(url, res => {
      let urlData = '';
      res.on('data', data => {
        urlData += data;
      })
      res.on('end', data => {
        const bookinfo = JSON.parse(urlData);
        if (bookinfo.title) {
          reslove(bookinfo);
        }
        reject(bookinfo)
        // urlData += data
      })
    })
  })
}
