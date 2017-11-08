<template>
  <div id="current-training">
    <h3>Current training: {{ training_name }}</h3>
    <div v-if="display_trainings" class="exercises">
      <table class="table">
        <thead>
        </thead>
        <tbody>
          <tr v-for="ex in exercises">
            <td>
              <a @click="startEx($event, ex)" class="list-group-item" href="#">{{ ex.name }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="current_exercice_display" id="current_ex">
      <button @click="showAllEx()" v-if="show_all_ex_butt" :disabled="form_elements_disabled">Back to all exercises</button>
      <h3>{{ current_exercice.name }}</h3>
      <div>
        <h4>
          Repeats:
        </h4>
        <span v-for="(rep, index) in current_exercice.Repeats">
          <span class="repeats">
            {{ index + 1 }}
            <input :disabled="form_elements_disabled" type="text" size="2" :value="rep.Times" class="times-input"> /
            <input :disabled="form_elements_disabled" type="text" size="2" :value="rep.Weight" class="weight-input">
          </span>
        </span>
        <div id="add-repeat">
          <span>
            <input :disabled="form_elements_disabled" v-model="times" class="times-input" type="text" size="2"> /
            <input :disabled="form_elements_disabled" v-model="weight" class="weight-input" type="text" size="2">

            <button @click="saveTraining()" :disabled="form_elements_disabled" id="save-butt">Save</button>
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
        count: 0
      }
    },

    async mounted() {
      this.$parent.animation_status = true;
      this.getTraining();
    },

    methods: {
      getTraining() {
        this.axios.post('/training', {
            Token: this.token,
            URL: this.training_url
          })
          .then(result => {
            this.$parent.animation_status = false;

            this.training_name = result.data.Body.Result.ProgramName;
            this.exercises = result.data.Body.Result.Exercises;

            //chek if training is new
            var newEx = false;
            for (var i = 0; i < this.exercises.length; i++) {
              if (this.exercises[i].StartStatus == true) {
                newEx = true;

                break;
              }
            }

            if (newEx === false) {

            }

            this.newTraining = newEx;
          })
          .catch(err => {
            this.$parent.animation_status = false;

            console.log(err);
          })
      },

      startEx(event, ex) {
        if (event) event.preventDefault();

        this.current_exercice = ex;

        this.display_trainings = false;
        this.current_exercice_display = true;
        this.show_all_ex_butt = true;
      },

      showAllEx() {
        this.show_all_ex_butt = false;
        this.display_trainings = true;
        this.current_exercice_display = false;
      },

      saveTraining() {
        console.log(JSON.stringify(this.exercises));

        var token = window.localStorage.getItem('token');
        this.form_elements_disabled = true;

        this.current_exercice.Repeats.push({
          Times: this.times,
          Weight: this.weight
        });

        this.axios.post('/updateTraining', {
            Token: token,
            URL: this.training_url,
            Exercises: this.exercises
          })
          .then(response => {
            if (response.data.Status == false) {
              alert('Err 1: ' + response.data.Body.Msg);
              this.form_elements_disabled = false;

              return;
            } else {
              this.times = '';
              this.weight = '';
              this.form_elements_disabled = false;
            }
          }).catch(err => {
            alert('Err 2: ' + err);
          });
      }
    }
  }

</script>

<style>
  #home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  #add-repeat {
    margin-top: 10px;
  }

  .times-input {
    background-color: #90EE90
  }

  .weight-input {
    background-color: #ADD8E6
  }

</style>
