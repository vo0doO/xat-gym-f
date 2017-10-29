<template>
  <div id="my-programs">
    <h1>TEST</h1>
  </div>
</template>

<script>
  export default {
    name: 'app',

    data() {
      return {
        isLogin: null
      }
    },

    mounted() {
      this.checkSignInStatus();
      console.log('start');
      console.log('Is login: ' + this.isLogin);

      this.getAllPrograms();
      console.log('end');
    },

    methods: {
      logOut() {
        window.localStorage.setItem('token', 'null');
        this.isLogin = false;

        this.$router.push('/login');
      },

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
                alert('Error1: ' + result.data.Body.Message);

                window.localStorage.setItem('token', 'null');

                this.$router.push('/login');
              } else {
                this.isLogin = true;
              }
            })
            .catch(err => {
              alert('Error2: ' + err);
            });
        }
      },

      getAllPrograms() {
        console.log('yyyyyyyyyyyyyyyyyyyyy');
        if (this.isLogin == true) {
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
                } else {
                  alert(result.data.Body.Msg);
                }
              } else {
                this.isLogin = true;

                console.log(result.data.Body.Programs);
              }
            })
            .catch(err => {
              alert('Error3: ' + err);
            });
        } else {
          alert('fuck uou');
          this.$router.push('/');
        }
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
