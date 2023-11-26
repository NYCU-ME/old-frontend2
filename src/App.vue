<template>
  <div class="flex flex-col h-screen">
    <NavBar v-bind:isMobileMenuOpen="this.isMobileMenuOpen" v-bind:isLogged="this.isLogged" v-bind:loginUrl="this.loginUrl"></NavBar>
    <div class="flex-grow bg-[#393431] p-4 text-gray-100">
      <router-view />
    </div>
  </div>
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
      loginUrl: ""
    };
  },
  mounted() {
    this.loginUrl = config.loginUrl;
    this.checkLogged();
  },
  methods: {
    async checkLogged() {
      const token = Cookies.get('token');
      if(token) this.isLogged = 1;
    }
  }
}
</script>

