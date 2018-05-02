<template>
  <div>
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col
        :span="12"
        v-for="player in players"
        :key="player.id"
        class="team-player">
        <div v-if="player.nickname">{{ player.nickname }}</div>
        <div v-else>
          <div>{{ player.first_name }}</div>
          <div>{{ player.last_name }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'team-players',
  props: {
    players: Array,
  },
  components: {},
};
</script>

<style lang="scss">
.team-player {
  display: flex;
  flex-direction: column;
}
</style>
