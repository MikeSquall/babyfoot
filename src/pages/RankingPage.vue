<template>
  <div>
    <h3>{{$t('RANKING')}}</h3>
    <ranking-table></ranking-table>
  </div>
</template>

<script>
import RankingTable from '@/components/Ranking/RankingTable';

export default {
  name: 'ranking-container',
  components: { RankingTable },
  created() {},
  computed: {},
};
</script>

<style lang="scss">
</style>
