import config from '@/config';
import Vue from 'vue';

const SET_MATCH = 'SET_MATCH';
const SET_MATCHES = 'SET_MATCHES';

const moduleMatches = {
  state: {
    selectedMatch: null,
    matches: [],
  },
  mutations: {
    [SET_MATCH](state, selectedMatch) {
      Vue.set(state, 'selectedMatch', selectedMatch);
    },
    [SET_MATCHES](state, matches) {
      Vue.set(state, 'matches', matches);
    },
  },
  actions: {
    setMatch({ commit }, match) {
      commit(SET_MATCH, match);
    },
    getMatches({ commit }) {
      // eslint-disable-next-line
      const url = config.API_URL + '/matches';
      return new Promise((resolve, reject) => {
        Vue.axios.get(url)
          .then((response) => {
            if (response.status !== 200) {
              reject(response);
            }
            commit(SET_MATCHES, response.data.objects);
            const matchesList = [];
            response.data.objects.forEach((match) => {
              matchesList.push(match.name);
            });
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateScore({ commit }, { data, matchId }) {
      const url = `${config.API_URL}/matches/${matchId}`;
      return new Promise((resolve, reject) => {
        Vue.axios.patch(url, data)
          .then((response) => {
            if (response.status !== 200) {
              reject(response);
            }
            commit(SET_MATCHES, response.data.objects);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    match: state => state.selectedMatch,
    matches: state => state.matches,
  },
};

export default moduleMatches;
