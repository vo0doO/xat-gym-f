<template>
  <div id="app">
    <div id="wrapper" v-bind:class="toggledMenu">

      <!-- Sidebar -->
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <li class="sidebar-brand">
            <a href="#">
              Menu
            </a>
          </li>
          <li>
            <router-link v-if="isLogin" id="to-home" to="/">Home</router-link>
          </li>
          <li>
            <a href="#" v-if="isLogin" @click="logOut">Log out</a>
          </li>
          <li>
            <router-link v-if="isLogin" id="to-add-new-program" to="/addNewProgram">Add new program</router-link>
          </li>
          <li>
            <router-link v-if="isLogin" id="to-add-my-programs" to="/myPrograms">My programs</router-link>
          </li>
          <li>
            <router-link v-if="isLogin" id="to-my-trainings" to="/myTrainings">My trainings</router-link>
          </li>
        </ul>
      </div>
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h1 v-if="isLogin">xat-gym</h1>
            <h1 v-else>Please sign in</h1>
            <a v-if="isLogin" href="#" id="menu-toggle" @click="openMenu($event)">Toggle Menu</a>
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
      <!-- /#page-content-wrapper -->

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
