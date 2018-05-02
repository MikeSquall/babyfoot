import config from '@/config';
import Vue from 'vue';

const SET_MATCH = 'SET_MATCH';
const SET_MATCHES = 'SET_MATCHES';
const SET_CREATING_MATCH = 'SET_CREATING_MATCH';

const moduleMatches = {
  state: {
    selectedMatch: null,
    matches: [],
    isCreatingMatch: false,
  },
  mutations: {
    [SET_MATCH](state, selectedMatch) {
      Vue.set(state, 'selectedMatch', selectedMatch);
    },
    [SET_MATCHES](state, matches) {
      Vue.set(state, 'matches', matches);
    },
    [SET_CREATING_MATCH](state, isCreatingMatch) {
      Vue.set(state, 'isCreatingMatch', isCreatingMatch);
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
    createMatch({ commit }, data) {
      commit(SET_CREATING_MATCH, true);
      const url = `${config.API_URL}/matches`;
      return new Promise((resolve, reject) => {
        Vue.axios.post(url, data)
          .then((response) => {
            if (response.status !== 201) {
              commit(SET_CREATING_MATCH, false);
              reject(response);
            }
            commit(SET_CREATING_MATCH, false);
            resolve(response);
          })
          .catch((error) => {
            commit(SET_CREATING_MATCH, false);
            reject(error);
          });
      });
    },
  },
  getters: {
    match: state => state.selectedMatch,
    matches: state => state.matches,
    isCreatingMatch: state => state.isCreatingMatch,
  },
};

export default moduleMatches;
