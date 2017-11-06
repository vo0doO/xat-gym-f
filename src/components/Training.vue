<template>
  <div id="current-training">
    <h3>Current training: {{ training_name }}</h3>
    <div class="exercises">
        <div v-for="ex in exercises">
            {{ ex.name }}
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

        training_name: '',
        exercises: []
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

            //console.log('training: ' + JSON.stringify(result));
          })
          .catch(err => {
            this.$parent.animation_status = false;

            console.log(err);
          })
      },

      saveTraining() {

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
