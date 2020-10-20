var path = require('path');
module.exports = {
  //Почему ты такой бездарь...?:)))
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 8080
  }
};
