<template>
  <div>
    <el-header>
      <el-row>
        <el-col :span="12">
          <div class="app-title">My BabyFoot Championship</div>
        </el-col>
        <el-col :span="2" :offset="10">
          <icon name="user-circle" id="user-icon"></icon>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
import 'vue-awesome/icons/user-circle';

export default {
  name: 'app-header',
  components: {},
};
</script>

<style lang="scss">
.el-header {
  background-color: #409EFF;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 15px;
}

.app-title {
  font-size: x-large;
  font-weight: 600;
  color: #fff;
}

#user-icon {
  width: auto;
  height: 2em; /* or any other relative font sizes */
  // for Safari
  max-width: 100%;
  max-height: 100%;
  color: #fff;
}
</style>
