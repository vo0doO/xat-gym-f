<template>
  <div id="current-program">
    <h1>{{ current_program }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'current_program',
    data() {
      return {
        current_program: ''
      }
    },

    mounted() {
      this.openProgram(this.$route.params.id);
    },

    methods: {
      openProgram(id) {
        this.axios.post('/program', {
            ID: id
          })
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            alert(err);
          })
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
