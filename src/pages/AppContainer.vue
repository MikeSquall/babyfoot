<template>
  <div>
    <el-container>
      <app-header></app-header>
      <el-main>
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
};
</script>

<style lang="scss">
.content-container {
  margin-top: 48px;
  padding: 30px 40px;
}

.content-container > div,
.content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
