<template>
  <div id="current-training">
    <h3>Current training: {{ training_name }}</h3>
    <div v-if="display_trainings" class="exercises">
      <table class="table">
        <thead>
        </thead>
        <tbody>
          <tr v-for="ex in exercises">
            <td v-if="ex.Finished">
              <a @click="startEx($event, ex)" class="list-group-item ex-list finished-ex" href="#">{{ ex.name }}</a>
            </td>
            <td v-else>
              <a @click="startEx($event, ex)" class="list-group-item ex-list" href="#">{{ ex.name }}</a>
            </td>
          </tr>
        </tbody>
      </table>
      <button id="endTrainingBtn" @click="finishTraining()" :disabled="form_elements_disabled" class="btn btn-lg">Finish</button>
    </div>
    <div v-if="current_exercice_display" id="current_ex">
      <button @click="showAllEx()" v-if="show_all_ex_butt" class="btn btn-lg btn-block">Back to all exercises</button>
      <h3 id="program-name">{{ current_exercice.name }}</h3>
      <button v-if="endEx == false" @click="finishEx()">Finish exercise</button>
      <h3 v-else>Finished</h3>
      <div>
        <h4>
          Repeats:
        </h4>
        <span v-for="(rep, index) in current_exercice.Repeats">
          <span class="repeats">
            {{ index + 1 }}
            <input :disabled="form_elements_disabled" type="text" :value="rep.Times" class="times-input"> /
            <input :disabled="form_elements_disabled" type="text" :value="rep.Weight" class="weight-input">
          </span>
        </span>
        <div id="add-repeat">
          <span>
            <input :disabled="form_elements_disabled" v-model="times" class="times-input" type="number" size="2"> /
            <input :disabled="form_elements_disabled" v-model="weight" class="weight-input" type="number" size="2">

            <button @click="saveTraining()" :disabled="form_elements_disabled" id="save-butt" class="btn btn-lg">Save</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'current_training',
    data() {
      return {
        training_url: this.$route.params.id,
        token: window.localStorage.getItem('token'),
        newTraining: false,
        display_trainings: true,
        show_all_ex_butt: false,

        training_name: '',
        exercises: [],
        current_exercice: null,
        current_exercice_display: false,
        form_elements_disabled: false,

        times: '',
        weight: '',
        count: 0,
        endTraining: false,
        endEx: false
      }
    },

    async mounted() {
      this.$parent.animation_status = true;
      await this.getTraining();
    },

    methods: {
      getTraining() {
        return new Promise(done => {
          this.axios.post('/training', {
              Token: this.token,
              URL: this.training_url
            })
            .then(result => {
              this.$parent.animation_status = false;

              this.training_name = result.data.Body.Result.ProgramName;
              this.exercises = result.data.Body.Result.Exercises;

              this.endTraining = result.data.Body.Finished;

              return done();
            })
            .catch(err => {
              this.$parent.animation_status = false;

              console.log(err);

              return done();
            })
        })
      },

      startEx(event, ex) {
        if (event) event.preventDefault();

        this.current_exercice = ex;

        this.display_trainings = false;
        this.current_exercice_display = true;
        this.show_all_ex_butt = true;

        console.log('xxx: ' + JSON.stringify);
      },

      showAllEx() {
        this.show_all_ex_butt = false;
        this.display_trainings = true;
        this.current_exercice_display = false;
      },

      finishTraining() {
        this.endTraining = true;

        var token = window.localStorage.getItem('token');
        this.form_elements_disabled = true;

        this.saveTraining();
      },

      finishEx() {
        this.endEx = true;

        this.saveTraining();
      },

      saveTraining() {
        if ((this.times == '' || this.weight == '') && this.endEx == false) {
          alert('Times and weight cannot be empty');

          return;
        }

        this.$parent.animation_status = true;

        this.form_elements_disabled = true;

        var token = window.localStorage.getItem('token');
        this.form_elements_disabled = true;

        var training = {
          Token: '',
          URL: '',
          Exercises: '',
          Finish: ''
        };

        if (this.endTraining == true) {
          training.Token = token;
          training.Finish = true;
          training.URL = this.training_url;
        } else {
          if (this.endEx == false) {
            this.current_exercice.Repeats.push({
              Times: this.times,
              Weight: this.weight
            });
          }

          this.current_exercice.Finished = this.endEx;

          training.Token = token;
          training.URL = this.training_url;
          training.Exercises = this.exercises;
          training.Finish = false;
        }

        this.axios.post('/updateTraining', training)
          .then(async response => {
            if (response.data.Status == false) {
              alert('Err 1: ' + response.data.Body.Msg);
              this.form_elements_disabled = false;
              this.endEx = false;
              this.$parent.animation_status = false;

              return;
            } else {
              this.times = '';
              this.weight = '';
              this.form_elements_disabled = false;

              await this.getTraining();

              if (this.endEx == true) {
                this.form_elements_disabled = true;
                this.$parent.animation_status = false;

                return;
              }

              if (this.endTraining == true) {
                this.$router.push('/myTrainings');
                this.$parent.animation_status = false;

                return;
              }
            }
          }).catch(err => {
            alert('Err 2: ' + err);
          });
      }
    }
  }

</script>

<style>
  #add-repeat {
    margin-top: 10px;
  }

  .times-input {
    width: 50px;
    background-color: #90EE90
  }

  .weight-input {
    width: 50px;
    background-color: #ADD8E6
  }

  #program-name {
    margin-top: 10px;
  }

  .finished-ex {
    background-color: rgb(136, 206, 75);
    color: black
  }

</style>
