<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ name }}</span>
      </div>
      <table>
        <tr>
          <td>Victories</td>
          <td>{{ victories }}</td>
        </tr>
        <tr>
          <td>Draws</td>
          <td>{{ draws }}</td>
        </tr>
        <tr>
          <td>Losses</td>
          <td>{{ losses }}</td>
        </tr>
        <tr>
          <td rowspan="2">Players</td>
          <td v-for="player in players" :key="player.id">
            {{ player.first_name + ' ' + player.last_name }}
          </td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'team',
  props: {
    name: String,
    victories: Number,
    losses: Number,
    draws: Number,
    players: Array,
  },
  components: {},
};
</script>

<style lang="scss">
.box-card {
  margin-bottom: 20px;
}
</style>
