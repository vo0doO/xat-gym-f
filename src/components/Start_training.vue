<template>
  <div id="training">
    <h3>Choose program</h3>
    <select v-if="select_program_in_status" v-model="selected_program" class="form-control">
      <option disabled value="">Please select program</option>
      <option v-for="program in programs" :value="program">{{ program.Name }}</option>
    </select>
    <button @click="startTraining()" v-if="button_start_status" class="btn btn-lg">Start!</button>
    <div v-if="select_ex_status" id="select-ex">
      <h1>123</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'start_training',
    data() {
      return {
        isLogin: false,
        login: '',
        programs: [],
        current_training: [],
        selected_program: '',

        select_program_in_status: false,
        select_ex_status: false,
        button_start_status: false
      }
    },

    async mounted() {
      this.$parent.animation_status = true;
      await this.getAllPrograms();
    },

    methods: {
      getAllPrograms() {
        return new Promise(done => {
          var token = window.localStorage.getItem('token');

          this.axios.post('/myPrograms', {
              Token: token
            })
            .then(result => {
              if (result.data.Status == false) {
                alert(result.data.Body.Msg);

                this.isLogin = true;

                return done();
              } else {
                this.isLogin = true;
                this.login = result.data.Body.Login;
                this.programs = result.data.Body.Programs;
                this.select_program_in_status = true;

                this.$parent.animation_status = false;
                this.button_start_status = true;

                return done();
              }
            })
            .catch(err => {
              alert('Error3: ' + err);

              return done();
            });
        })
      },

      startTraining() {
        if (this.selected_program == '') {
          alert('Please choose program');

          return;
        }
        this.button_start_status = false;

        var token = window.localStorage.getItem('token');

        //add false status to each exercise

        for (var i = 0; i < this.selected_program.Exercises.length; i++) {
          this.selected_program.Exercises[i].Finished = false;
          this.selected_program.Exercises[i].Repeats = [];
        }
    
        this.axios.post('/addTraining', {
            Token: token,
            Training: this.selected_program,
          })
          .then(result => {
            if (result.data.Status == false) {
              alert(result.data.Body.Msg);

              this.isLogin = false;
              this.button_start_status = true;
            } else {
              this.$router.push('/training/' + result.data.Body.TrainingID);
            }
          })
          .catch(err => {
            alert('Error3: ' + err);

            this.button_start_status = true;
          });
      }
    }
  }

</script>

<style>

</style>
