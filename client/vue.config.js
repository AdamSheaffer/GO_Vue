module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      },
      '/account': {
        target: 'http://localhost:8080'
      }
    }
  }
}
