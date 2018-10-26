<template>
  <div id="app">
    <Navbar/>
    <Projects/>
  </div>
</template>

<script>
    import Projects from "./components/Projects.vue"
    import Navbar from "./components/Navbar.vue"
    import VueMarkdown from 'vue-markdown'

    export default {
        name: 'app',
        components: {
            Projects,
            Navbar,
            VueMarkdown
        }
    }
</script>

<style>
  body{
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
  }
</style>
