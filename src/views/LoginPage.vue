<template>
  <div class="fixed inset-0 m-auto w-3/4 sm:w-1/2 h-1/4 text-black">
    <div class="flex flex-col h-full pt-3">
      <div class="flex items-center">
        <label for="email" class="w-16">信箱：</label>
        <input v-model.number="email" id="email" type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5">
      </div>
      <a :href="oauthUrl" class="absolute bottom-5 left-5 bg-gray-700 text-white hover:bg-gray-500 px-3 py-2 rounded-md text-sm font-medium">交大 OAuth</a>
      <a @click="submit" class="absolute bottom-5 right-5 bg-gray-700 text-white hover:bg-gray-500 px-3 py-2 rounded-md text-sm font-medium">登入</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../config.json';

export default {
  data() {
    return {
      email: "",
      oauthUrl: "",
    };
  },
  mounted() {
    this.oauthUrl = config.loginUrl;
  },
  methods: {
    async submit() {
      const url = `${config.baseUrl}login_email`
			const data = {
				email: this.email
			};
      const headers = {
        "Content-Type": "application/json"
      };
      try {
        await axios.post(url, data, { headers  });
        alert("請至信箱收取認證信！");
      } catch (error) {
        console.error(error)
        alert(error.response.data.msg)
      }
    },
  },
};
</script>

