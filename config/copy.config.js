/**
 * Created by salho on 07.12.16.
 */

// https://www.npmjs.com/package/fs-extra

module.exports = {
  include: [
    {
      src: '{{SRC}}/assets/',
      dest: '{{WWW}}/assets/'
    },
    {
      src: '{{SRC}}/index.html',
      dest: '{{WWW}}/index.html'
    },
    {
      src: '{{SRC}}/manifest.json',
      dest: '{{WWW}}/manifest.json'
    },
    {
      src: '{{SRC}}/service-worker.js',
      dest: '{{WWW}}/service-worker.js'
    },
    {
      src: 'node_modules/ionic-angular/polyfills/polyfills.js',
      dest: '{{BUILD}}/polyfills.js'
    },
    {
      src: 'node_modules/ionicons/dist/fonts/',
      dest: '{{WWW}}/assets/fonts/'
    },
    {
      src: 'node_modules/font-awesome/fonts/',
      dest: '{{WWW}}/fonts/'
    },
    {
      src: 'node_modules/drmonty-leaflet-awesome-markers/css',
      dest: '{{WWW}}/assets/css/'
    },
    {
      src: 'node_modules/leaflet/dist/',
      dest: '{{WWW}}/assets/css/'
    }
  ]
};
