module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    rules: {
      entry: 'src/rules.js',
      template: 'public/rules.html',
      filename: 'rules.html',
    },
  },
  pwa:{
    workboxPluginMode: "InjectManifest",
    workboxOptions:{
      swSrc:"./src/service-worker.js",
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
