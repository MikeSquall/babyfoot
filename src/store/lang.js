import i18n from '@/languages/i18n';
import Vue from 'vue';

const SET_LANGUAGE = 'SET_LANGUAGE';

const moduleLanguage = {
  state: {
    language: localStorage.getItem('LANGUAGE_KEY') || 'en',
    supportedLang: ['en', 'fr'],
  },
  mutations: {
    [SET_LANGUAGE](state, lang) {
      Vue.set(state, 'language', lang);
    },
  },
  actions: {
    setLanguage({ commit }, lang) {
      commit(SET_LANGUAGE, lang);
      localStorage.setItem('LANGUAGE_KEY', lang);
      Vue.moment.locale(lang);
      i18n.locale = lang;
    },
  },
  getters: {
    language: state => state.language,
    supportedLang: state => state.supportedLang,
  },
};

export default moduleLanguage;
