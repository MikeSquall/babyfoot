import config from '@/config';
import Vue from 'vue';

const SET_TEAM = 'SET_TEAM';
const SET_TEAMS = 'SET_TEAMS';

const moduleTeams = {
  state: {
    selectedTeam: null,
    teams: [],
  },
  mutations: {
    [SET_TEAM](state, team) {
      Vue.set(state, 'team', team);
    },
    [SET_TEAMS](state, teams) {
      Vue.set(state, 'teams', teams);
    },
  },
  actions: {
    setTeam({ commit }, team) {
      commit(SET_TEAM, team);
    },
    getTeams({ commit }) {
      // eslint-disable-next-line
      const url = config.API_URL + '/teams';
      return new Promise((resolve, reject) => {
        Vue.axios.get(url)
          .then((response) => {
            if (response.status !== 200) {
              reject(response);
            }
            commit(SET_TEAMS, response.data.objects);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    team: state => state.selectedTeam,
    teams: state => state.teams,
  },
};

export default moduleTeams;
