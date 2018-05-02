<template>
  <div>
    <h3>{{$t('MATCHS')}}</h3>
    <div v-for="match in matches" :key="match.id">
      <match :match="match" v-on:open-dialog="openEditScoreDialog"></match>
    </div>

    <el-dialog
      :title="$t('CREATE_MATCH')"
      :visible.sync="createMatchDialogVisible"
      width="30%"
      center
      :show-close="false">
      <el-form
        v-model="newMatchForm"
        class=""
        ref="newMatchForm">

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCreateMatchDialog">
            {{ $t('BTN_CANCEL') }}
        </el-button>
        <el-button type="primary" @click="updateScore">
          {{ $t('BTN_VALIDATE') }}
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="$t('EDIT_MATCH_SCORE')"
      :visible.sync="editMatchDialogVisible"
      width="30%"
      center
      :show-close="false">
      <el-form
        v-model="scoreForm"
        class="score-form-input"
        :rules="scoreValidation"
        ref="scoreForm">
        <div>{{ scoreForm.nameTeam1 }}</div>
        <el-input
          type="number"
          v-model.number="scoreForm.scoreTeam1"
          prop="scoreTeam1">
        </el-input>
        <span>-</span>
        <el-input
          type="number"
          v-model.number="scoreForm.scoreTeam2"
          prop="scoreTeam2">
        </el-input>
        <div>{{ scoreForm.nameTeam2 }}</div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditScoreDialog">
            {{ $t('BTN_CANCEL') }}
        </el-button>
        <el-button type="primary" @click="updateScore">
          {{ $t('BTN_VALIDATE') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Match from '@/components/Match/Match';

export default {
  name: 'matchs-container',
  components: { Match },
  data() {
    return {
      createMatchDialogVisible: false,
      newMatchForm: {},
      editMatchDialogVisible: false,
      scoreForm: {},
      currentMatch: null,
      scoreValidation: {
        scoreTeam1: [
          { required: true, message: 'score is required', trigger: 'blur' },
          { type: 'number', message: 'score must be a number', trigger: 'blur' },
        ],
        scoreTeam2: [
          { required: true, message: 'score is required', trigger: 'blur' },
          { type: 'number', message: 'score must be a number', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.$store.dispatch('getMatches');
  },
  computed: {
    matches() {
      return this.$store.getters.matches;
    },
  },
  methods: {
    closeCreateMatchDialog() {
      this.createMatchDialogVisible = false;
      this.newMatchForm = {};
    },
    openEditScoreDialog(match) {
      const index = match.score.indexOf('-');
      const length = match.score.length;
      this.scoreForm = {
        nameTeam1: match.teams[0].name,
        scoreTeam1: Number(match.score.substring(0, index)),
        nameTeam2: match.teams[1].name,
        scoreTeam2: Number(match.score.substring(index + 1, length)),
      };
      this.currentMatch = match;

      this.editMatchDialogVisible = true;
    },
    closeEditScoreDialog() {
      this.editMatchDialogVisible = false;
      this.scoreForm = {};
    },
    updateScore() {
      let winnerId = this.currentMatch.teams[0].id;
      if (this.scoreForm.scoreTeam2 > this.scoreForm.scoreTeam1) {
        winnerId = this.currentMatch.teams[1].id;
      }
      this.$store.dispatch('updateScore', {
        data: {
          winner_id: winnerId,
          score: `${this.scoreForm.scoreTeam1}-${this.scoreForm.scoreTeam2}`,
        },
        matchId: this.currentMatch.id,
      });
      this.closeEditScoreDialog();
      this.$store.dispatch('getMatches');
    },
    createMatch(team1, team2) {
      this.$store.dispatch('createMatch', {
        data: {
          team_1: team1,
          team_2: team2,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.score-form-input {
  text-align: center;

  div {
    display: inline-block;
  }

  .el-input {
    width: 20%;
  }
}
</style>
