<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">日期</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">查詢次數</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
       <tr v-for="(entry, index) in this.data" :key="index">
            <td class="text-left py-3 px-4">{{ entry[0] }}</td>
            <td class="text-left py-3 px-4">{{ entry[1] }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>


<script>
import axios from 'axios';
import Cookie from 'js-cookie';
import config from '../config.json';

export default {
  data() {
    return {
      id: 0,
      token: "",
      data: [],
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.token = Cookie.get('token');
    if (!this.token) {
      alert("您尚未登入。");
      window.location.href = '/';
    } else {
      this.getProfile(this.token);
    }
  },
  methods: {
    async getProfile(token) {
      const response = await axios.get(`${config.baseUrl}whoami/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data;
      const domains = data.domains;
      for(let i = 0; i < domains.length; i++) {
        if(domains[i].id == this.id) {
          this.domain = domains[i].domain;
        }
      }
      if(this.domain == "") {
        alert("記錄不存在！");
        window.location.href = '/domains';
      }
      this.getStatics();
    },
    async getStatics() {
      const domain = this.domain.split('.').reverse().join('/');
      const url = `${config.baseUrl}traffic/${domain}`;
      const headers = {
        "Authorization": `Bearer ${this.token}`
      };
      try {
        const response = await axios.get(url, { headers: headers });
        this.data = response.data.data.reverse();
        console.log(this.data)
      } catch (error) {
        console.error(error)
        alert(error.response.data.msg)
      }
		},
  }
}
</script>


