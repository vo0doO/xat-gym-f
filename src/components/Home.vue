<template>
  <div id="home">
    <h1>Hello</h1>
    <div id="start-training">
      <button @click="start_training()" :disabled="start_but_status" class="btn btn-lg btn-block">Start training!</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        msg: 'Welcome home',

        start_but_status: false
      }
    },

    mounted() {
      //this.checkSignInStatus();
    },

    methods: {
      checkSignInStatus() {
        var token = window.localStorage.getItem('token');

        if (token == 'null') {
          this.$router.push('/login');
        } else {
          this.axios.post('/checksigninstatus', {
              Token: token
            })
            .then(result => {
              if (result.data.Status == false) {
                alert(result.data.Body.Message);

                window.localStorage.setItem('token', 'null');

                this.$router.push('/login');
              }
            })
            .catch(err => {
              this.$router.push('/login');
            });
        }
      },

      start_training() {
        this.$router.push('/startTraining');
      }
    }
  }

</script>

<style>

</style>
