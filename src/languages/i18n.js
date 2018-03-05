/* eslint-disable */
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    fr: require('./fr.json'),
    en: require('./en.json'),
  },
});

export default i18n;
