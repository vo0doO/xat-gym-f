<template>
  <div id="home">
    <h1>Hello</h1>
    <div id="start-training">
      <button @click="start_training()">Start training!</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        msg: 'Welcome home'
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
  #home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
