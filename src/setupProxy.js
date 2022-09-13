const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/cnpj/',
    createProxyMiddleware({
      target: 'https://www.receitaws.com.br/v1/cnpj',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/cnpj': ''
      }
    })
  )

  app.use(
    '/correios/',
    createProxyMiddleware({
      target: 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/correios': ''
      }
    })
  )
}
