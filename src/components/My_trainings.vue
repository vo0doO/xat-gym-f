<template>
  <div id="trainings">
    <h3>My trainings</h3>
    <div class="list-of-trainings">
      <table class="table">
        <thead>
        </thead>
        <tbody>
          <tr v-for="tr in trainings">
            <td>
              <a :href="tr.SiteURL" class="list-group-item">{{ tr.ProgramName }}</a>
            </td>
            <td>
              {{ tr.StartStatus }}
            </td>
            <td>
              <a @click="deleteTraining($event, tr.URL)" :href="tr.SiteURL">x</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my_trainings',
    data() {
      return {
        token: window.localStorage.getItem('token'),
        trainings: []
      }
    },

    async mounted() {
      this.$parent.animation_status = true;
      this.getTrainings();
    },

    methods: {
      getTrainings() {
        this.axios.post('/myTrainings', {
            Token: this.token
          })
          .then(result => {
            this.$parent.animation_status = false;

            for (var i = 0; i < result.data.Body.Result.length; i++) {
              result.data.Body.Result[i].SiteURL = '?#/' + 'training/' + result.data.Body.Result[i].URL
            }

            this.trainings = result.data.Body.Result;

            //console.log('xxx: ' + JSON.stringify(this.trainings));
          })
          .catch(err => {
            this.$parent.animation_status = false;

            console.log(err);
          })
      },

      deleteTraining(event, id) {
        if (event) event.preventDefault();

        this.$parent.animation_status = true;

        this.axios.post('/deleteTraining', {
            Token: this.token,
            URL: id
          })
          .then(async result => {
            this.$parent.animation_status = false;

            await this.getTrainings();
          })
          .catch(err => {
            this.$parent.animation_status = false;

            console.log(err);
          })
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
