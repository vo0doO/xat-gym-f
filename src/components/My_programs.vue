<template>
  <div id="my-programs">
    <h1>My programs</h1>
    <table class="table">
      <thead>
      </thead>
      <tbody>
        <tr v-for="program in my_programs">
          <td>
            <a :href="program.Url" class="list-group-item">{{ program.Name }}</a>
          </td>
          <td>
            <a v-if="delete_link_status" @click="deleteProgram($event, program._id)" href="#">x</a>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="animation_status" class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="loader"></div>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',

    data() {
      return {
        login: '',
        my_programs: [],
        delete_link_status: true,
        animation_status: true
      }
    },

    async mounted() {
      await this.getAllPrograms();
    },

    methods: {
      deleteProgram(event, id) {
        if (event) event.preventDefault()

        this.delete_link_status = false;

        this.axios.post('/deleteProgram', {
            Id: id
          })
          .then(async result => {
            this.delete_link_status = true;

            await this.getAllPrograms();
          })
          .catch(err => {
            this.delete_link_status = true;

            console.log(err);
          })
      },

      getAllPrograms() {
        return new Promise(done => {
          var token = window.localStorage.getItem('token');

          this.axios.post('/myPrograms', {
              Token: token
            })
            .then(result => {
              if (result.data.Status == false) {
                if (result.data.Login == false) {
                  this.isLogin = false;

                  alert('Error1: ' + result.data.Body.Message);

                  window.localStorage.setItem('token', 'null');

                  this.$router.push('/login');

                  return done();
                } else {
                  alert(result.data.Body.Msg);

                  return done();
                }
              } else {
                this.isLogin = true;

                for (var i = 0; i < result.data.Body.Programs.length; i++) {
                  result.data.Body.Programs[i].Url = '?#/program/' + result.data.Body.Programs[i]._id;
                }

                console.log(result.data.Body.Programs);

                this.my_programs = result.data.Body.Programs;

                this.animation_status = false;

                return done();
              }
            })
            .catch(err => {
              alert('Error3: ' + err);

              return done();
            });
        })
      }
    }
  }

</script>

<style>
  #my-programs {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  #add_new_program {
    margin-left: 15%;
    margin-right: 15%
  }

</style>
