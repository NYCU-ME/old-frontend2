<template>
  <div class="m-8 flex h-screen justify-center mb-8 p-16">
    <div class="w-1/2">
      <div class="border border-gray-300">
        <div class="bg-gray-300 text-black w-full">基本資訊</div>
        <p>學號：{{ this.uid }}</p>
        <p>信箱：{{ this.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config.json';

export default {
  data() {
    return {
      uid: "",
      email: "",
      domains: []
    }
  },
  created() {
    const token = Cookies.get('token');
    if (!token) {
      alert("還並未登入。");
      window.location.href = '/';
    } else {
      this.getProfile(token);
    }
  },
  methods: {
    async getProfile(token) {
      const response = await axios.get(`${config.baseUrl}whoami/`, {headers: `Authorization: Bearer ${token}`});
      const data = response.data;
			this.uid = data.uid;
			this.email = data.email;
			this.domains = data.domains;
    }
  }
}
</script>

