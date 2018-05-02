import config from '@/config';
import Vue from 'vue';

const SET_RANKING = 'SET_RANKING';
const UPDATE_RANKING = 'UPDATE_RANKING';

const moduleRanking = {
  state: {
    ranking: [],
    isUpdatingRanking: false,
  },
  mutations: {
    [SET_RANKING](state, ranking) {
      Vue.set(state, 'ranking', ranking);
    },
    [UPDATE_RANKING](state, isUpdatingRanking) {
      Vue.set(state, 'isUpdatingRanking', isUpdatingRanking);
    },
  },
  actions: {
    setRanking({ commit }) {
      commit(UPDATE_RANKING, true);
      // eslint-disable-next-line
      const url = config.API_URL + '/ranking';
      return new Promise((resolve, reject) => {
        Vue.axios.get(url)
          .then((response) => {
            if (response.status !== 200) {
              commit(UPDATE_RANKING, false);
              reject(response);
            }
            commit(SET_RANKING, response.data);
            commit(UPDATE_RANKING, false);
            resolve();
          })
          .catch((error) => {
            commit(UPDATE_RANKING, false);
            reject(error);
          });
      });
    },
  },
  getters: {
    ranking: state => state.ranking,
    isUpdatingRanking: state => state.isUpdatingRanking,
  },
};

export default moduleRanking;
