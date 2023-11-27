<template>
  <div v-if="isAdding" class="fixed inset-0 m-auto w-3/4 sm:w-1/2 h-3/4 bg-gray-300 text-black">
    <div class="rounded-t-md bg-[#11191F] text-white flex items-center justify-center p-4">
      <div>
        <span>{{ domain }}</span>
      </div>
    </div>

		<div class="flex flex-col justify-start items-center h-full pt-10">
			<div class="mb-16">
				<span class="text-xl">1. 選擇 Record 的類別：</span>
				<select v-model="recordType" id="dnsRecordType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
					<option value="A">A</option>
					<option value="AAAA">AAAA</option>
					<option value="CNAME">CNAME</option>
					<option value="MX">MX</option>
					<option value="TXT">TXT</option>
					<option value="NS">NS</option>
				</select>
			</div>
			<div class="mb-16">
				<span class="text-xl">2. 填入 Record 的值：</span>
				<input v-model="recordValue" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
			</div>
			<div class="mb-16">
				<span class="text-xl">3. 指定 Record 的 TTL（5 到 86400，預設為 5）：</span>
				<input v-model.number="ttl" type="number" min="5" max="86400" value="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
			</div>
		</div>

    <a @click="toggle" class="absolute bottom-10 left-10 bg-red-700 text-white hover:bg-red-500 px-3 py-2 rounded-md text-sm font-medium">取消</a>
    <a @click="submit" class="absolute bottom-10 right-10 bg-gray-700 text-white hover:bg-gray-500 px-3 py-2 rounded-md text-sm font-medium">註冊</a>
  </div>

  <div class="m-4">
    <a @click="toggle">新增新紀錄</a>
  </div>
</template>


<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config.json';

export default {
  data() {
    return {
      id: 0,
			isAdding: false,
      domain: "",
      recordType: 'A',
      recordValue: '',
      ttl: 5,
			token: ""
    }
  },
  created() {
    this.token = Cookies.get('token');
    this.id = this.$route.query.id;
    if (!this.token) {
      alert("您尚未登入。");
      window.location.href = '/';
    } else {
      this.getProfile(this.token);
    }
  },
  methods: {
		toggle() {
			this.isAdding = !this.isAdding;
		},
    async getProfile(token) {
      const response = await axios.get(`${config.baseUrl}whoami/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data;
      const domains = data.domains;
			for(let i = 0; i < domains.length; i++) {
        if(domains[i].id == this.id) {
          this.domain = domains[i].domain;
          this.records = domains[i].records;
        }
			}
    },
		async submit(){
			const domain = this.domain.split('.').reverse().join('/');
			const url = `${config.baseUrl}ddns/${domain}/records/${this.recordType}/${this.recordValue}`;
			const data = {
				ttl: this.ttl
			};
			const headers = {
				Authorization: `Bearer ${this.token}`
			};
      try {
        await axios.post(url, data, { headers });
      } catch (error) {
				console.error(error)
				alert(error.response.data.msg)
      }
		}
  }
}
</script>

<style>
/* Add any styles you need here */
</style>

