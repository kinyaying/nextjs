// const axios = require('axios')
// export default async (req, res) => {
// const {
//   query: { slug },
// } = req
// console.log('slug:::', req.query, slug)
// const url = slug.join('/')
// const data = await axios({
//   method: 'get',
//   url: 'https://' + url,
//   data: req.query,
// })
// console.log(':::', data)
// axios.get('/user?ID=12345')
// .then(function (response) {
//   // handle success
//   console.log(response)
// })

//   res.end(url)

//   // res.statusCode = 200
//   // res.json({ name: 'kinyaying' })
// }

// https://movesearch.vercel.app/api/baidukaifa?query=selectedText&pageNum=1&pageSize=10
// http://localhost:3000/api/https/kaifa.baidu.com

// // Create proxy instance outside of request handler function to avoid unnecessary re-creation
// const apiProxy = createProxyMiddleware({
//     target: 'https://kaifa.baidu.com/',
//     changeOrigin: true,
//     pathRewrite: { '^/api/baidukaifa': '/rest/v1/search' },
//     secure: false,
// });

// export default function (req, res) {
//     apiProxy(req, res, (result) => {
//         if (result instanceof Error) {
//             throw result;
//         }
//         throw new Error(`Request '${req.url}' is not proxied! We should never reach here!`);
//     });
// };

const { createProxyMiddleware } = require('http-proxy-middleware')
var url = require('url')
// restream parsed body before proxying
var restream = function (proxyRes, req, res, options) {
  proxyRes.headers['x-added'] = 'foobar'
  proxyRes.headers['Access-Control-Allow-Origin'] = '*'
  proxyRes.headers['Access-Control-Allow-Headers'] = '*'
  proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
}

// https://nextjs-lovat-kappa-87.vercel.app/api/movesearch?query=selectedText&pageNum=1&pageSize=10

// https://nextjs-lovat-kappa-87.vercel.app/api/https/kaifa.baidu.com/rest/v1/search?query=selectedText&pageNum=1&pageSize=10
let target = 'https://kaifa.baidu.com/'
let pathRewriteFrom = '^/api/https/kaifa.baidu.com/rest/v1/search'
let pathRewriteTo = '/rest/v1/search'

const apiProxy = createProxyMiddleware({
  target: target,
  changeOrigin: true,
  pathRewrite: { pathRewriteFrom: pathRewriteTo },
  secure: false,
  onProxyRes: restream,
})

module.exports = function (req, res) {
  // const {
  //   query: { slug },
  // } = req
  // /api/kaifa.baidu.com/rest/v1/search?query=selectedText&pageNum=1&pageSize=10
  var pathname = url.parse(req.url).pathname
  let slug = pathname.split('/')
  target = slug[1] + '://' + slug[2]
  pathRewrite = slug.splice(3).join('/')

  console.log('slug:::', slug, target, pathRewrite)
  apiProxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result
    }
    throw new Error(
      `Request '${req.url}' is not proxied! We should never reach here!`
    )
  })
}
