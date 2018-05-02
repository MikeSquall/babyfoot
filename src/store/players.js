import config from '@/config';
import Vue from 'vue';

const SET_PLAYER = 'SET_PLAYER';
const SET_PLAYERS = 'SET_PLAYERS';

const modulePlayers = {
  state: {
    selectedPlayer: null,
    players: [],
  },
  mutations: {
    [SET_PLAYER](state, player) {
      Vue.set(state, 'player', player);
    },
    [SET_PLAYERS](state, players) {
      Vue.set(state, 'players', players);
    },
  },
  actions: {
    setPlayer({ commit }, player) {
      commit(SET_PLAYER, player);
    },
    getPlayers({ commit }) {
      // eslint-disable-next-line
      const url = config.API_URL + '/players';
      return new Promise((resolve, reject) => {
        Vue.axios.get(url)
          .then((response) => {
            if (response.status !== 200) {
              reject(response);
            }
            commit(SET_PLAYERS, response.data.objects);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updatePlayer({ commit }, data) {
      // eslint-disable-next-line
      const url = config.API_URL + '/players/' + data.data.id;
      return new Promise((resolve, reject) => {
        Vue.axios.patch(url, data)
          .then((response) => {
            if (response.status !== 201) {
              reject(response);
            }
            commit(SET_PLAYER, response.data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    player: state => state.selectedPlayer,
    players: state => state.players,
  },
};

export default modulePlayers;
