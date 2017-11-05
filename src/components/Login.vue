<template>
  <div id="login">
    <form>
      <div class="form-group">
        <label for="email">Email address:</label>
        <input type="email" :disabled="emailDisabled" v-model="Email" class="form-control" id="email">
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="password" :disabled="passwordDisabled" v-model="Password" class="form-control" id="pwd">
      </div>
      <button @click="signIn" :disabled="submitButDusabled" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>

<script>
  //import { apiUrl } from '../config';
  import settings from '../settings.json';

  export default {
    name: 'login',
    data() {
      return {
        Email: '',
        Password: '',
        emailDisabled: false,
        passwordDisabled: false,
        submitButDusabled: false,
        test: ''
      }
    },

    mounted() {
      this.checkSignInStatus();
    },

    methods: {
      checkSignInStatus() {
        var token = window.localStorage.getItem('token');

        if (token == 'null') {
          this.$parent.isLogin = false;
        }
      },

      signIn() {
        this.disableAllElemets(true);

        var url = settings.BackURL + ':3000/signin';

        this.axios.post('/signin', {
          Email: this.Email,
          Password: this.Password
        })
          .then(response => {
            if (response.data.Status == false) {
              alert(response.data.Body.Msg);

              this.disableAllElemets(false);
            } else {
              window.localStorage.setItem('token', response.data.Body.Token);

              this.$parent.isLogin = true;

              this.$router.push('/');
            }
          })
          .catch(err => {
            alert(err);

            this.disableAllElemets(false);
          });
      },

      disableAllElemets(status) {
        this.emailDisabled = status;
        this.passwordDisabled = status;
        this.submitButDusabled = status;
      }
    }
  }
</script>

<style>
  #login {
    margin-left: 5%;
    margin-right: 5%
  }
</style>