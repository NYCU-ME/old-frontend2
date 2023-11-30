<template>
  <div v-if="isRegistering" class="fixed rounded-md top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 sm:w-2/1 h-1/4 bg-gray-300 text-black">
    <div class="fixed rounded-t-md bg-[#11191F] text-white transform w-full flex items-center justify-center">
      <div class="flex items-center">
        <span>註冊網域</span>
      </div>
    </div>
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 flex items-center justify-center">
      <div class="flex items-center">
        <input v-model="domain" type="text" class="border border-gray-300 text-black w-1/2" />
        <span class="w-1/2">.{{hosted_domain}}</span>
      </div>
      <a @click="toggle" class="absolute bottom-0 left-0 bg-red-700 text-white hover:bg-red-500 px-3 py-2 rounded-md text-sm font-medium">取消</a>
      <a @click="submit" class="absolute bottom-0 right-0 bg-gray-700 text-white hover:bg-gray-500 px-3 py-2 rounded-md text-sm font-medium">註冊</a>
    </div>
  </div>
  <div class="m-4">
    <a @click="toggle">註冊新網域</a>
  </div>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">網域名稱</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">有效日期</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">統計</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">操作</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
       <tr v-for="(user_domain, index) in this.domains" :key="index">
            <td class="text-left py-3 px-4">{{ user_domain.domain }}</td>
            <td class="text-left py-3 px-4">{{ user_domain.expDate }}</td>
            <td class="text-left py-3 px-4"><a :href="`/statics?id=${user_domain.id}`">統計資料</a></td>
            <td class="text-left py-3 px-4"><a :href="`/domain?id=${user_domain.id}`">控制面板</a></td>
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
        this.getProfile(token);
      }
    },
    methods: {
      toggle() {
        this.isRegistering = !this.isRegistering;
      },
      async submit() {
        const domain = this.hosted_domain.split('.').reverse().join('/');
        const url = `${config.baseUrl}domains/${domain}/${this.domain}`;
        const token = Cookies.get('token');

        try {
          await axios.post(url, {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          alert("新增成功！")
          location.reload()
        } catch (error) {
          alert(error.response.data.msg)
          console.log(error)
        }
      },
      async getProfile(token) {
        const response = await axios.get(`${config.baseUrl}whoami/`, {headers: `Authorization: Bearer ${token}`});
        const data = response.data;
        this.domains = data.domains;
        console.log(this.domains)
      }
    }
  }
</script>
