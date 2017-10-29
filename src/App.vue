<template>
  <div id="app">
    <div id="top">
      <h1>xat-gym</h1>
      <router-link v-if="isLogin" id="to-home" to="/">Home</router-link>
      <a href="#" v-if="isLogin" @click="logOut">Log out</a>
      <router-link v-if="isLogin" id="to-add-new-program" to="/addNewProgram">Add new program</router-link>
      <router-link v-if="isLogin" id="to-my-programs" to="/myPrograms">My Programs</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  data() {
    return {
      isLogin: false
    }
  },

  mounted() {
    this.checkSignInStatus();
  },

  methods: {
    logOut() {
      window.localStorage.setItem('token', 'null');
      this.isLogin = false;

      this.$router.push('/login');
    },

    checkSignInStatus() {
      var token = window.localStorage.getItem('token');
      console.log('Main page token: ' + token);

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

            console.log('Is login: ' + this.isLogin);
          }
        })
        .catch(err => {
          alert('Error2: ' + err);
        });
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