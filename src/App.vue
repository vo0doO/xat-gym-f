<template>
  <div id="app">
    <div id="wrapper" v-bind:class="toggledMenu">

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">xat-gym</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                  <a href="#" v-if="isLogin" @click="logOut" class="nav-link">Log out</a>
              </li>
              <li class="nav-item">
                  <router-link v-if="isLogin" class="nav-link" id="to-add-new-program" to="/addNewProgram">Add new program</router-link>
              </li>
              <li class="nav-item">
                  <router-link v-if="isLogin" class="nav-link" id="to-add-my-programs" to="/myPrograms">My programs</router-link>
              </li>
              <li class="nav-item">
                  <router-link v-if="isLogin" class="nav-link" id="to-my-trainings" to="/myTrainings">My trainings</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Page Content -->
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h1 v-if="isLogin">xat-gym</h1>
            <h1 v-else>Please sign in</h1>

            <router-view></router-view>
            <div v-if="animation_status" class="row">
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <div class="loader"></div>
              </div>
              <div class="col-md-4"></div>
            </div>
          </div>
        </div>
      </div>
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
        userEmail: '',

        toggledMenu: ''
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
        this.toggledMenu = '';

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
      },

      openMenu(event) {
        if (event) event.preventDefault();

        if (this.toggledMenu == '') {
          this.toggledMenu = 'toggled';
        } else {
          this.toggledMenu = '';
        }
      }
    }
  }

</script>

<style>


</style>
