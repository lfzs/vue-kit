// const { renderToString } = require('@vue/server-renderer')
// const server = require('express')()
// const { createApp } = require('./dist/server/main')

// // process.env.NODE_ENV = 'production'

// ;(async () => {
//   const { app, router } = createApp()
//   await router.push('/')
//   await router.isReady()
//   const ctx = {}
//   try {

//     const html = await renderToString(app, ctx)
//     console.log('---------------------------')
//     console.log(html)
//   } catch (error) {
//     console.log('---------------------------')
//     console.log(error)
//   }
// })()

// // server.get('*', async (req, res) => {
// //   const { app, router } = createApp()
// //   await router.push(req.url)
// //   await router.isReady()
// //   const ctx = {}
// //   const html = await renderToString(app, ctx)
// //   console.log('---------------------------')
// //   console.log(html)
// //   res.end(html)
// // })

// server.listen(8899)
