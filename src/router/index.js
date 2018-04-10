import Vue from 'vue';
import Router from 'vue-router';

// Containers
import AppContainer from '@/pages/AppContainer';
import RankingPage from '@/pages/RankingPage';
import TeamsPage from '@/pages/TeamsPage';
import PlayersPage from '@/pages/PlayersPage';
import MatchsPage from '@/pages/MatchsPage';

// Pages

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: AppContainer,
      children: [
        {
          name: 'ranking',
          path: 'ranking',
          component: RankingPage,
          meta: { title: 'META_TITLE_RANKING' },
        },
        {
          name: 'teams',
          path: 'teams',
          component: TeamsPage,
          meta: { title: 'META_TITLE_TEAMS' },
        },
        {
          name: 'players',
          path: 'players',
          component: PlayersPage,
          meta: { title: 'META_TITLE_PLAYERS' },
        },
        {
          name: 'matchs',
          path: 'matchs',
          component: MatchsPage,
          meta: { title: 'META_TITLE_MATCHS' },
        },
      ],
    },
  ],
});

export default router;
