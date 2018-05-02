<template>
  <div class="card-container">
    <transition-group name="flip" class="flipper">
      <div class="front" v-if="!showCardBack" key="front">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ name }}</span>
            <el-button type="text"
              style="float: right; padding: 0 3px;"
              @click="flipCard">
              {{ $t('PLAYERS') }}
            </el-button>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="8">{{ $t('VICTORIES') }}</el-col>
              <el-col :span="8">{{ $t('DRAWS') }}</el-col>
              <el-col :span="8">{{ $t('LOSSES') }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">{{ victories }}</el-col>
              <el-col :span="8">{{ draws }}</el-col>
              <el-col :span="8">{{ losses }}</el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <div class="back" v-if="showCardBack" key="back">
        <el-card class="box-card">
          <div slot="header">
            <span>{{ $t('PLAYERS') }}</span>
            <el-button type="text"
              style="float: right; padding: 0 3px;"
              @click="flipCard">
                <icon name="arrow-left"></icon>
              </el-button>
          </div>
          <div>
            <team-players :players="players"></team-players>
          </div>
        </el-card>
      </div>
    </transition-group>
  </div>
</template>

<script>
import TeamPlayers from '@/components/Team/TeamPlayers';
import 'vue-awesome/icons/arrow-left';

export default {
  name: 'team',
  components: { TeamPlayers },
  props: {
    name: String,
    victories: Number,
    losses: Number,
    draws: Number,
    players: Array,
  },
  data() {
    return {
      showCardBack: false,
    };
  },
  methods: {
    flipCard() {
      this.showCardBack = !this.showCardBack;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  position: relative;
}

.flipper {
  position: relative;
}

.front, .back {
  backface-visibility: hidden;
  height: 160px;
}

.box-card {
  margin-bottom: 20px;
}

.flip-enter,
.flip-leave-to {
  transform: rotateY(90deg);
}

.flip-enter-active {
  transition: all 0.5s ease;
  transition-delay: 0.5s;
}

.flip-leave-active {
  transition: all 0.5s ease;
}
</style>
