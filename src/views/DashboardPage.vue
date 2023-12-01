<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">網域名稱</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">有效日期</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
       <tr v-for="(user_domain, index) in this.domains" :key="index">
            <td class="text-left py-3 px-4">{{ user_domain.domain }}</td>
            <td class="text-left py-3 px-4">{{ user_domain.expDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import config from '../config.json';

  export default {
    data() {
      return {
        isRegistering: false,
        domain: "",
        hosted_domain: "",
        domains: [],
      }
    },
    mounted() {
      this.hosted_domain = config.domain;
      const token = Cookies.get('token');
      if (!token) {
        alert("還並未登入。");
        window.location.href = '/';
      } else {
        this.getDomains(token);
      }
    },
    methods: {
      async getDomains(token) {
        try {
          const response = await axios.get(`${config.baseUrl}domains`, {headers: `Authorization: Bearer ${token}`});
          const data = response.data;
          this.domains = data.data;
          console.log(this.domains)
        } catch(e){
          console.log(e.response)
        }
      }
    }
  }
</script>
