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
              <a v-if="tr.Finished" :href="tr.SiteURL" class="list-group-item finished-training trainings-links">{{ tr.ProgramName }}</a>
              <a v-else :href="tr.SiteURL" class="list-group-item trainings-links">{{ tr.ProgramName }}</a>
            </td>
            <td v-if="tr.Finished">
              {{ getDate(tr.FinishDate) }}
            </td>
            <td v-else>
              Not finished
            </td>
            <td>
              <a v-if="deleteLink" @click="deleteTraining($event, tr.URL)" :href="tr.SiteURL">x</a>
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
        trainings: [],

        deleteLink: true
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

            this.trainings = result.data.Body.Result.sort(this.compareArr);

            //console.log('xxx: ' + JSON.stringify(this.trainings));
          })
          .catch(err => {
            this.$parent.animation_status = false;

            console.log(err);
          })
      },

      deleteTraining(event, id) {
        if (event) event.preventDefault();

        this.deleteLink = false;
        this.$parent.animation_status = true;

        this.axios.post('/deleteTraining', {
            Token: this.token,
            URL: id
          })
          .then(async result => {
            await this.getTrainings();

            this.$parent.animation_status = false;
            this.deleteLink = true;
          })
          .catch(err => {
            this.$parent.animation_status = false;

            console.log(err);
          })
      },

      getDate(time) {
        var date = new Date(time);

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        if (minutes.toString().length == 1) {
          minutes = '0' + minutes;
        }

        var dateStr = day + '/' + month + '/' + year + ' @ ' + hours + ':' + minutes;

        return dateStr;
      },

      compareArr(a, b) {
        if (a.FinishDate > b.FinishDate)
          return -1;
        if (a.FinishDate < b.FinishDate)
          return 1;
        return 0;
      }
    }
  }

</script>

<style>
  .finished-training {
    background-color: rgb(136, 206, 75);
    color: black
  }

</style>
