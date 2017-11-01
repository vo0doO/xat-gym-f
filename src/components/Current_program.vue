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
        current_program: 'xxx'
      }
    },

    mounted() {
        this.current_program = this.$route.params.id;
    },

    methods: {

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
