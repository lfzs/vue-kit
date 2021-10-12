module.exports = {
  '/api': {
    target: process.env.SERVER_HOST,
    changeOrigin: true
  },
}
