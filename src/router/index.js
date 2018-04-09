import Vue from 'vue';
import Router from 'vue-router';

// Containers
import AppContainer from '@/pages/AppContainer';
import TeamPage from '@/pages/TeamPage';

// Pages

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: AppContainer,
      children: [
        {
          name: 'teams',
          path: 'teams',
          component: TeamPage,
          meta: { title: 'META_TITLE_TEAMS' },
        },
      ],
    },
  ],
});

export default router;
