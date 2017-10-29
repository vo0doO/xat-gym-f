<template>
  <div id="home">
      <div><a href="Сиськи">Добавить программу</a></div>
    <div><a href="Сиськи">Сиськи</a></div>
    <div><a href="Сиськи">Биц/триц</a></div>
    <div><a href="Сиськи">Спина</a></div>
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
    this.checkSignInStatus();
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
          alert(err);
        });
      }
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