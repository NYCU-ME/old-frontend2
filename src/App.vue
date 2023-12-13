<template>
  <div class="flex flex-col h-screen">
    <NavBar v-bind:isMobileMenuOpen="this.isMobileMenuOpen" v-bind:isLogged="this.isLogged" loginUrl="/login"></NavBar>
    <div class="parent-element flex-grow p-4 bg-[#52585D] text-gray-300">
      <router-view />
    </div>
  </div>
  
  <!--
  <footer class="footer text-gray-300">
    <div class="text-center bg-[#363b3f]">
      <p>NYCU-ME 團隊</p>
      <p>&copy; 2021 - {{ currentYear }}</p>
      <break/>
      <p><a href="https://github.com/NYCU-ME">GitHub</a></p>
    </div>
  </footer>
  -->
</template>

<script>
import NavBar from './components/NavBar';
import Cookies from 'js-cookie';
import config from './config.json';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      isLogged: false,
      loginUrl: "",
      currentYear: null
    }
  },
  mounted() {
    this.currentYear = new Date().getFullYear()
    this.loginUrl = config.loginUrl;
    this.checkLogged();
    document.title = "NYCU-ME"
  },
  methods: {
    async checkLogged() {
      const token = Cookies.get('token');
      if(token) this.isLogged = 1;
    }
  }
}
</script>

<style>
    .parent-element {
        position: relative;
    }
</style>
