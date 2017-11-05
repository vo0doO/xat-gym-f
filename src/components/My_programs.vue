<template>
  <div id="my-programs">
    <h1>My programs</h1>
    <table class="table">
      <thead>
      </thead>
      <tbody>
        <tr v-for="program in my_programs">
          <td>
            <a :href="program.SiteUrl" class="list-group-item">{{ program.Name }}</a>
          </td>
          <td>
            <a v-if="delete_link_status" @click="deleteProgram($event, program.Url)" href="#">x</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'app',

    data() {
      return {
        login: '',
        my_programs: [],
        delete_link_status: true
      }
    },

    async mounted() {
      this.$parent.animation_status = true;
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
                alert(result.data.Body.Msg);
                
                this.isLogin = true;

                return done();
              } else {
                this.isLogin = true;

                for (var i = 0; i < result.data.Body.Programs.length; i++) {
                  result.data.Body.Programs[i].SiteUrl = '?#/program/' + result.data.Body.Programs[i].Url;
                }

                this.my_programs = result.data.Body.Programs;

                this.$parent.animation_status = false;

                return done();
              }
            })
            .catch(err => {
              alert('Error3: ' + err);

              return done();
            });
        })
      },
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
