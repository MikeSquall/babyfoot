<template>
  <div class="match" @mouseenter="showEditButton" @mouseleave="hideEditButton">
    <el-row :gutter="20" @click="editScore">
      <el-col :span="3" :offset="2">
        <icon name="trophy" class="trophy-icon" v-if="match.winner === 1"></icon>
        <div v-else>-</div>
      </el-col>
      <el-col :span="5">
        {{ match.teams[0].name }}
      </el-col>
      <el-col :span="4">
        {{  match.score }}
      </el-col>
      <el-col :span="5">
        {{ match.teams[1].name }}
      </el-col>
      <el-col :span="3">
        <icon name="trophy" class="trophy-icon" v-if="match.winner === 2"></icon>
        <div v-else>-</div>
      </el-col>
      <el-col :span="2">
        <button type="text" @click="$emit('open-dialog', match)" style="border: none;">
          <icon name="edit" class="edit-btn" v-show="showingEditButton">
          </icon>
        </button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'vue-awesome/icons/trophy';
import 'vue-awesome/icons/edit';

export default {
  name: 'match',
  props: {
    match: Object,
  },
  data() {
    return {
      showingEditButton: false,
    };
  },
  computed: {},
  methods: {
    editScore() {
      return 0;
    },
    showEditButton() {
      this.showingEditButton = true;
    },
    hideEditButton() {
      this.showingEditButton = false;
    },
  },
};
</script>

<style lang="scss">
.match {
  margin: 10px 0;
  font-size: 1.3em;
}

.trophy-icon {
  fill: #ddc755;
}

.edit-btn {
  fill: #e2e2e2;
  transition: fill 0.3s ease;
  cursor: pointer;

  &:hover {
    fill: #409EFF;
  }
}
</style>
