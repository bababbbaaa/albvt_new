import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
    apiKey: '3df7f9c4-9cb6-4ab6-b610-b41c22c3c6ab',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
  }
  

Vue.use(YmapPlugin, settings);
