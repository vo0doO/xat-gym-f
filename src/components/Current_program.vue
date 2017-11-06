<template>
  <div id="current-program">
    <h1>{{ program_name }}</h1>
    <h3>Add new exercise</h3>
    <input v-if="input_status" v-model="new_ex" type="text">
    <button v-if="input_status" @click="addNewEx()">Add</button>
    <table class="table">
      <thead>
      </thead>
      <tbody>
        <tr v-for="ex in exercises">
          <td>
            {{ ex.name }}
          </td>
          <td>
            <a v-if="input_status" @click="deleteEx($event, ex.id)" href="#">x</a>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-if="input_status" @click="updateProgram()">Save</button>
  </div>
</template>

<script>
  export default {
    name: 'current_program',
    data() {
      return {
        program_name: '',
        program_url: '',
        exercises: [],
        new_ex: '',
        input_status: false,

        delete_ex_status: true
      }
    },

    async mounted() {
      this.$parent.animation_status = true;
      await this.openProgram(this.$route.params.id);
      this.$parent.animation_status = false;
    },

    methods: {
      openProgram(id) {
        return new Promise(done => {
          this.axios.post('/program', {
            ID: id,
            Token: window.localStorage.getItem('token')
          })
          .then(result => {
            this.$parent.animation_status = false;
            this.delete_ex_status = true;

            if (result.data.Login == false) {
              this.$router.push('/login');

              return;
            }

            if (result.data.Status == false) {
              this.program_name = 'Such program doesn\'t exist';

              return done();
            } else {
              this.program_name = result.data.Body.Program.Name;
              this.program_url = result.data.Body.Program.Url;
              this.exercises = result.data.Body.Program.Exercises;

              this.input_status = true;

              return done();
            }
          })
          .catch(err => {
            alert(err);

            return done();
          })
        })
      },

      deleteEx(event, id) {
        if (event) event.preventDefault();

        for (var i = 0; i < this.exercises.length; i++) {
          if (this.exercises[i].id == id) {
            this.exercises.splice(i, 1);
          }
        }
      },

      updateProgram() {
        return new Promise(done => {

          var token = window.localStorage.getItem('token');
          this.$parent.animation_status = true;
          this.input_status = false;

          if (token == '' || token == 'null') {
            this.$parent.animation_status = false;
            this.$router.push('/login');

            return;
          }

          this.axios.post('/updateProgram', {
            Token: token,
            ProgramURL: this.program_url,
            Exs: this.exercises
          }).then(result => {
            this.$parent.animation_status = false;
            this.input_status = true;

            return done();
          }).catch(err => {
            alert(err);
            this.$parent.animation_status = false;
            this.input_status = true;

            return done();
          })
        })
      },

      addNewEx() {
        if (this.exercises.length == 0) {
          var lastExID = 0;
        } else {
          var lastExID = this.exercises[this.exercises.length - 1].id;
        }

        this.exercises.push({
          id: lastExID + 1,
          name: this.new_ex
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

</style>
