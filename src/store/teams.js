import config from '@/config';
import Vue from 'vue';

const SET_TEAM = 'SET_TEAM';
const SET_TEAMS = 'SET_TEAMS';
const SET_TEAMS_LIST = 'SET_TEAMS_LIST';

const moduleTeams = {
  state: {
    selectedTeam: null,
    teams: [],
    teamsList: [],
  },
  mutations: {
    [SET_TEAM](state, team) {
      Vue.set(state, 'team', team);
    },
    [SET_TEAMS](state, teams) {
      Vue.set(state, 'teams', teams);
    },
    [SET_TEAMS_LIST](state, teamsList) {
      Vue.set(state, 'teamsList', teamsList);
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
            const teamsList = [];
            response.data.objects.forEach((team) => {
              teamsList.push(team.name);
            });
            commit(SET_TEAMS_LIST, teamsList);
            resolve(response);
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
    teamsList: state => state.teamsList,
  },
};

export default moduleTeams;
