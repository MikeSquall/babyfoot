<template>
  <div>
    <h3>{{$t('PLAYERS')}}</h3>
    <el-row :gutter="20">
      <el-col
        :span="8"
        v-for="player in players"
        :key="player.id">
        <player :player="player">
        </player>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Player from '@/components/Player/Player';

export default {
  name: 'players-container',
  components: { Player },
  created() {
    this.$store.dispatch('getPlayers');
  },
  computed: {
    players() {
      return this.$store.getters.players;
    },
  },
};
</script>

<style lang="scss">
</style>
