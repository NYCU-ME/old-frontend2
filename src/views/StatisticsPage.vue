<template>
  <div class="m-8 flex h-screen justify-center mb-8 p-16">
    <div class="w-1/2">
      <div class="border text-center border-gray-300">
        <div class="bg-gray-300 text-black w-full">流量</div>
        <p>{{ this.num }}</p>
        <p>次查詢</p>
      </div>
    </div>
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
      num: "",
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
        this.num = response.data.num;
      } catch (error) {
        console.error(error)
        alert(error.response.data.msg)
      }
		},
  }
}
</script>


