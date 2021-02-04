import nc from 'next-connect'
import cors from 'cors'
const remoteServerUrl = 'https://kaifa.baidu.com/'
const config = 
const handler = nc()
  // use connect based middleware
  .use(cors())
  .post(async (req, res) => {
    const response = await fetch(remoteServerUrl, config)
    res.json(response)
  })


  // const apiProxy = createProxyMiddleware({
//     target: 'https://kaifa.baidu.com/',
//     changeOrigin: true,
//     pathRewrite: { '^/api/baidukaifa': '/rest/v1/search' },
//     secure: false,
// });

export default handler
