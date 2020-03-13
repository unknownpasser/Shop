module.exports = {

  publicPath: './',
  devServer: {
    proxy: {
      '/swipes': {
        target: 'http://localhost:3000/swipes',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/swipes': ''
        }
      },
      '/detail': {
        target: 'http://localhost:3000/detail',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/detail': ''
        }
      },
      '/recommends': {
        target: 'http://localhost:3000/recommends',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/recommends': ''
        }
      },
      '/navbars': {
        target: 'http://localhost:3000/navbars',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/navbars': ''
        }
      },
      '/goods': {
        target: 'http://localhost:3000/goods',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/goods': ''
        }
      },
      '/search': {
        target: 'http://localhost:3000/search',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/search': ''
        }
      },
      '/addresslist': {
        target: 'http://localhost:3000/addresslist',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/addresslist': ''
        }
      },
      '/addressinfo': {
        target: 'http://localhost:3000/addressinfo',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/addressinfo': ''
        }
      },
      '/saveaddress': {
        target: 'http://localhost:3000/saveaddress',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/saveaddress': ''
        }
      },
      '/deleteaddress': {
        target: 'http://localhost:3000/deleteaddress',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/deleteaddress': ''
        }
      },
      '/users/logincheck': {
        target: 'http://localhost:3000/users/logincheck',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/users/logincheck': ''
        }
      },
      '/users/logon': {
        target: 'http://localhost:3000/users/logon',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/users/logon': ''
        }
      },
      '/users/userhome': {
        target: 'http://localhost:3000/users/userhome',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/users/userhome': ''
        }
      },
      '/carts/add': {
        target: 'http://localhost:3000/carts/add',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/carts/add': ''
        }
      },
      '/carts/list': {
        target: 'http://localhost:3000/carts/list',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/carts/list': ''
        }
      },
      '/carts/delete': {
        target: 'http://localhost:3000/carts/delete',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/carts/delete': ''
        }
      },
    }
  }
}