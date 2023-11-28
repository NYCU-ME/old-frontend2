<template>
  <div v-if="isAdding" class="fixed inset-0 m-auto w-3/4 sm:w-1/2 h-3/4 bg-gray-300 text-black">
    <div class="rounded-t-md bg-[#11191F] text-white flex items-center justify-center p-4">
      <div>
        <span>{{ domain }}</span>
      </div>
    </div>

		<div class="flex flex-col justify-start items-center h-full pt-3">
			<div class="mb-4">
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
			<div class="mb-4">
				<span class="text-xl">2. 填入 Record 的值：</span>
				<input v-model="recordValue" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
			</div>
			<div class="mb-4">
				<span class="text-xl"><p>3. 指定 Record 的 TTL</p><p>（5 到 86400，預設為 5）：</p></span>
				<input v-model.number="ttl" type="number" min="5" max="86400" value="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
			</div>
		</div>

    <a @click="toggle" class="absolute bottom-5 left-10 bg-red-700 text-white hover:bg-red-500 px-3 py-2 rounded-md text-sm font-medium">取消</a>
    <a @click="submit" class="absolute bottom-5 right-10 bg-gray-700 text-white hover:bg-gray-500 px-3 py-2 rounded-md text-sm font-medium">註冊</a>
  </div>
	<div class="flex flex-row justify-start items-start w-full h-screen">
		<div class="overflow-x-auto flex flex-col justify-start items-center">
			<div class="m-4">
				<a href="/domains">回上一頁</a>
			</div>
			<div class="m-4">
				<a @click="toggle">新增紀錄</a>
			</div>
			<div class="m-4">
				<a @click="renew">延長網域</a>
			</div>
			<div class="m-4">
				<a @click="release">釋放網域</a>
			</div>
		</div>

		<div class="flex-grow overflow-x-auto flex flex-col justify-start items-center">
			<table class="w-full bg-white">
				<thead class="bg-gray-800 text-white">
					<tr>
						<th class="text-left py-3 px-4 uppercase font-semibold text-sm">類型</th>
						<th class="text-left py-3 px-4 uppercase font-semibold text-sm">值</th>
						<th class="text-left py-3 px-4 uppercase font-semibold text-sm">TTL</th>
						<th class="text-left py-3 px-4 uppercase font-semibold text-sm">操作</th>
					</tr>
				</thead>
				<tbody class="text-gray-700">
					<tr v-for="(record, index) in this.records" :key="index">
						<td class="text-left py-3 px-4">{{ record[1] }}</td>
						<td class="text-left py-3 px-4">{{ record[2] }}</td>
						<td class="text-left py-3 px-4">{{ record[3] }}</td>
						<td class="text-left py-3 px-4"><a @click="delRecord(record[1], record[2])">刪除</a></td>
					</tr>
				</tbody>
			</table>
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
      id: 0,
			isAdding: false,
      domain: "",
      records: [],
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
      console.log(domains)
      for(let i = 0; i < domains.length; i++) {
        if(domains[i].id == this.id) {
          this.domain = domains[i].domain;
          this.records = domains[i].records;
        }
      }
      if(this.domain == "") {
        alert("記錄不存在！");
        window.location.href = '/domains';
      }
      console.log(this.records);
    },
		async submit(){
			const domain = this.domain.split('.').reverse().join('/');
			const url = `${config.baseUrl}ddns/${domain}/records/${this.recordType}/${this.recordValue}`;
			const data = {
				ttl: this.ttl
			};
			const headers = {
        "Content-Type": "application/json",
				"Authorization": `Bearer ${this.token}`
			};
      try {
        await axios.post(url, data, { headers });
        alert("新增成功！")
        location.reload()
      } catch (error) {
				console.error(error)
				alert(error.response.data.msg)
      }
		},
    async delRecord(type_, value) {
			const domain = this.domain.split('.').reverse().join('/');
			const url = `${config.baseUrl}ddns/${domain}/records/${type_}/${value}`;
			const headers = {
				"Authorization": `Bearer ${this.token}`
			};
      try {
        await axios.delete(url, {}, { headers });
        alert("移除成功！")
        location.reload()
      } catch (error) {
				console.error(error)
				alert(error.response.data.msg)
      }
    },
		async renew() {
			const domain = this.domain.split('.').reverse().join('/');
			const url = `${config.baseUrl}renew/${domain}`;
			const headers = {
				"Authorization": `Bearer ${this.token}`
			};
      try {
        await axios.post(url, {}, { headers });
        alert("延長成功！")
      } catch (error) {
				console.error(error)
				alert(error.response.data.msg)
      }
		},
    async release() {
      const isConfirmed = confirm("釋放網域操作將不可撤回，你所有記錄都將被消除，你確定要這麽做嗎？");
      if(isConfirmed) {
        const domain = this.domain.split('.').reverse().join('/');
        const url = `${config.baseUrl}domains/${domain}`;
        const token = Cookies.get('token');

        try {
          await axios.delete(url, {
            "headers": {
              'Authorization': `Bearer ${token}`
            }
          });
          alert("刪除成功！")
          window.location.href = '/domains';
        } catch (error) {
          alert(error.response.data.msg)
          console.log(error)
        }
      }
    }
  }
}
</script>


