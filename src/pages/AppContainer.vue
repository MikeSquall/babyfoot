<template>
  <div>
    <el-container>
      <app-header></app-header>
      <el-main>
        <el-tabs v-model="activeTab" @tab-click="handleClick">
          <el-tab-pane :label="$t('RANKING')" name="ranking"></el-tab-pane>
          <el-tab-pane :label="$t('TEAMS')" name="teams"></el-tab-pane>
          <el-tab-pane :label="$t('PLAYERS')" name="players"></el-tab-pane>
          <el-tab-pane :label="$t('MATCHS')" name="matchs"></el-tab-pane>
        </el-tabs>
        <div class="content-container">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';

export default {
  name: 'app-container',
  components: { AppHeader },
  data() {
    return {
      activeTab: 'first',
    };
  },
  methods: {
    handleClick(tab) {
      this.$router.push(tab.name);
    },
  },
};
</script>

<style lang="scss">
.el-tabs {
  max-width: 900px;
  margin: 0 auto;
}

.content-container {
  padding: 30px 40px;
}

.content-container > div,
.content {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
</style>
