<template>
  <div>
    <div class="box-card">
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header" v-if="!showPlayerEditBox">
          <span>{{ player.first_name + ' ' + player.last_name }} </span>
        </div>
        <div class="player-front" v-if="!showPlayerEditBox">
          <el-row>
            <el-col :span="24">
              <icon name="user-circle" class="player-icon" v-show="!player.icon"></icon>
              <img src="player.icon" class="player-image" v-show="player.icon">
            </el-col>
          </el-row>
          <el-row class="player-attributes">
            <el-col :span="12">
              <div>{{ $t('NICKNAME') }}</div>
            </el-col>
            <el-col :span="12">
              <div>{{ player.nickname || '-' }}</div>
            </el-col>
            <el-col :span="12">
              <div>{{ $t('TEAM') }}</div>
            </el-col>
            <el-col :span="12">
              <div>{{ player.teams[0].name || '-' }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="player-back" v-if="showPlayerEditBox">
          <el-form label-position="left">
            <el-form-item :label="$t('FIRST_NAME')">
              <el-input v-model="player.first_name"
                prefix-icon="el-icon-arrow-right"
                size="small">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('LAST_NAME')">
              <el-input v-model="player.last_name"
                prefix-icon="el-icon-arrow-right"
                size="small">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('NICKNAME')">
              <el-input v-model="player.nickname"
                prefix-icon="el-icon-arrow-right"
                size="small">
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('TEAM')">
              <el-select v-model="player.team"
                filterable
                placeholder="-"
                size="small">
                <el-option v-for="team in teamsList"
                  :key="team"
                  :value="team">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="default"
          @click="showPlayerEditBox = false"
          size="small"
          v-show="showPlayerEditBox">
          {{ $t('BTN_CANCEL') }}
        </el-button>
        <el-button type="primary" @click="togglePlayerEditBox" size="small">
          <span v-if="!showPlayerEditBox">{{ $t('EDIT_PLAYER') }}</span>
          <span v-else>{{ $t('BTN_VALIDATE') }}</span>
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/user-circle';

export default {
  name: 'player',
  components: {},
  props: {
    player: Object,
  },
  data() {
    return {
      showPlayerEditBox: false,
      teamsList: [],
    };
  },
  created() {
    this.$store.dispatch('getTeams')
      .then((response) => {
        const list = response.data.objects;
        list.forEach((t) => {
          this.teamsList.push(t.name);
        });
      });
  },
  methods: {
    togglePlayerEditBox() {
      if (this.showPlayerEditBox) {
        this.$store.dispatch('updatePlayer', { data: this.player });
      }
      this.showPlayerEditBox = !this.showPlayerEditBox;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
  min-height: 260px;

  .el-button {
    margin-bottom: 15px;
  }
}

.player-icon {
  margin: 10px 0;
  width: 50px;
  height: 50px;

  .player-image {
    border-radius: 50%;
  }
}

.player-back {
  padding: 10px;
}

.player-attributes {
  margin-bottom: 15px;
  text-align: left;
  padding: 0 15px;
}

.el-form-item {
  margin-bottom: 4px;

  .el-input {
    width: 50%;
  }
}

</style>
