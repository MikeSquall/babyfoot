<template>
  <div>
    <h3>{{$t('MATCHS')}}</h3>
    <search-bar
      :placeholder="$t('SEARCH_TEAM')"
      :callback="updateQuery"
      style="width: 300px;">
    </search-bar>
    <el-button
      icon="el-icon-circle-plus"
      type="primary">
    </el-button>
    <div v-for="match in filteredMatches" :key="match.id">
      <match :match="match" v-on:open-dialog="openEditScoreDialog"></match>
    </div>
    <div v-show="filteredMatches.length === 0" style="margin-top: 20px;">
      {{ $t('NO_DATA_TO_DISPLAY') }}
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
        <el-form-item :label="$t('TEAM') + ' 1'">
          <el-select v-model="newMatchForm.team1"
            filterable
            placeholder="-"
            size="small">
            <el-option v-for="team in teamsList"
              :key="team"
              :value="team">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('TEAM') + ' 2'">
          <el-select v-model="newMatchForm.team2"
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCreateMatchDialog">
            {{ $t('BTN_CANCEL') }}
        </el-button>
        <el-button type="primary" @click="createMatch()">
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
import SearchBar from '@/components/SearchBar';

export default {
  name: 'matchs-container',
  components: { Match, SearchBar },
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
      teamsList: [],
      query: '',
    };
  },
  created() {
    this.$store.dispatch('getMatches');
    this.$store.dispatch('getTeams')
      .then((response) => {
        const list = response.data.objects;
        list.forEach((t) => {
          this.teamsList.push(t.name);
        });
      });
  },
  computed: {
    matches() {
      return this.$store.getters.matches;
    },
    filteredMatches() {
      return this.matches.filter((match) => {
        const f = match.teams[0].name.toUpperCase().includes(this.query) ||
                  match.teams[1].name.toUpperCase().includes(this.query);
        return f;
      });
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
    updateQuery(query) {
      this.query = query.toUpperCase();
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
