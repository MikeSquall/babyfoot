<template>
  <div>
    <h3>{{$t('TEAM_LIST')}}</h3>
    <el-row :gutter="20">
      <el-col
        :span="8"
        v-for="team in teams"
        :key="team.id">
        <team
          :name="team.name"
          :victories="team.victories"
          :losses="team.losses"
          :draws="team.draws"
          :players="team.players">
        </team>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Team from '@/components/Team/Team';

export default {
  name: 'team-container',
  components: { Team },
  created() {
    this.$store.dispatch('getTeams');
  },
  computed: {
    teams() {
      return this.$store.getters.teams;
    },
  },
};
</script>

<style lang="scss">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  max-width: 300px;
}
</style>
