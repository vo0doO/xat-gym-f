<template>
  <div id="app">
    <div id="top">
      <h1 v-if="isLogin">xat-gym</h1>
      <h1 v-else>Please sign in</h1>
      <router-link v-if="isLogin" id="to-home" to="/">Home</router-link>
      <a href="#" v-if="isLogin" @click="logOut">Log out</a>
      <router-link v-if="isLogin" id="to-add-new-program" to="/addNewProgram">Add new program</router-link>
      <router-link v-if="isLogin" id="to-my-programs" to="/myPrograms">My Programs</router-link>
    </div>
    <router-view></router-view>
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
        isLogin: false,
        animation_status: false,
        userEmail: ''
      }
    },

    mounted() {
      this.checkSignInStatus();
      console.log('App.vue');
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
                alert('Your session ended');

                window.localStorage.setItem('token', 'null');

                this.$router.push('/login');
              } else {
                this.isLogin = true;

                console.log('Is login: ' + this.isLogin);
              }
            })
            .catch(err => {
              alert('Error2: ' + err);
            });
        }
      },

      checkSignInStatusServer(serverResponse) {
        if (serverResponse.Login == false) {
          this.$router.push('/login');

          return;
        }
      }
    }
  }

</script>

<style>
  #top {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
