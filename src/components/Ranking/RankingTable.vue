<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort = "{prop: 'points', order: 'descending'}"
      style="width: 100%">
      <!-- <el-table-column
        prop="rank"
        label="Rank"
        width="100">
      </el-table-column> -->
      <el-table-column
        prop="name"
        label="Name"
        align="left"
        width="280">
      </el-table-column>
      <el-table-column
        prop="victories"
        label="Victories"
        sortable
        width="150">
      </el-table-column>
      <el-table-column
        prop="draws"
        label="Draws"
        sortable
        width="150">
      </el-table-column>
      <el-table-column
        prop="losses"
        label="Losses"
        sortable
        width="150">
      </el-table-column>
      <el-table-column
        prop="points"
        label="Points"
        sortable
        width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'ranking-table',
  components: {},
  created() {
    this.$store.dispatch('setRanking');
  },
  computed: {
    tableData() {
      return this.$store.getters.ranking;
    },
  },
};
</script>

<style lang="scss">
</style>
