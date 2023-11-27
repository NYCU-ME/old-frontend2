<template>
  Hello World!
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config.json';

export default {
  created() {
    const code = this.$route.query.code;
    if (code) {
      this.login(code);
    }
  },
  methods: {
    async login(code) {
      try {
        const response = await axios.get(`${config.baseUrl}oauth/${code}`);
        const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set('token', response.data.token, { expires: expires });
        // Remove the parameter from URL
        const urlWithoutParams = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.replaceState({ path: urlWithoutParams }, '', urlWithoutParams);
        location.reload()
      } catch (error) {
        console.error(error);
        alert("登入失敗！");
      }
    }
  }
}
</script>

