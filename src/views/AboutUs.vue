<template>
  <div class="p-16">
    <div class="flex justify-center items-center">
      <div class="md:w-2/3 flex">
        <div class="md:w-1/3">
          <img src="https://avatars.githubusercontent.com/u/30391069?v=4" width="160" height="160" alt="Lin Lee" class="object-cover">
        </div>
        <div class="hidden md:block w-2/3 h-48 flex p-8">
          <ul class="list-disc"> 
          <li class="list-none"><a href="https://github.com/LeeLin2602">Lin Lee</a></li>
            <li>專案發起者</li>
            <li>後端開發</li>
            <li>前端開發</li>
            <li>伺服器維運</li>
            <li>DevOps</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center">
        <div class="block md:hidden h-48 flex p-4">
          <ul class="list-disc"> 
          <li class="list-none"><a href="https://github.com/LeeLin2602">Lin Lee</a></li>
            <li>專案發起者</li>
            <li>後端開發</li>
            <li>前端開發</li>
            <li>伺服器維運</li>
            <li>DevOps</li>
          </ul>
        </div>
    </div>
  </div>


  <div class="p-16">
    <div class="flex justify-center items-center">
      <div class="md:w-2/3 flex">
        <div class="md:w-1/3">
          <img src="https://avatars.githubusercontent.com/u/39057640?v=4" width="160" height="160" alt="Hyperbola" class="object-cover">
        </div>
        <div class="hidden md:block w-2/3 h-48 flex p-8">
          <ul class="list-disc"> 
          <li class="list-none"><a href="https://github.com/wdzeng">Hyperbola</a></li>
            <li>共同發起者</li>
            <li>網域贊助商</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center">
        <div class="block md:hidden h-48 flex p-4">
          <ul class="list-disc"> 
          <li class="list-none"><a href="https://github.com/wdzeng">Hyperbola</a></li>
            <li>共同發起者</li>
            <li>網域贊助商</li>
          </ul>
        </div>
    </div>
  </div>
  <hr/>
  <div class="p-16">
    <div class="flex justify-center items-center">
      感謝以下貢獻者：
    </div>
    <div class="m-16">
      {{contributors}}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contributor_list: [],
			contributors: "",
    }
  },
  created() {
    this.getContributors();
  },
  methods: {
    async getContributors() {
      try {
        const apiServerResponse = await axios.get('https://api.github.com/repos/NYCU-ME/backend-flask-server/pulls?state=closed');
        const backendResponse = await axios.get('https://api.github.com/repos/NYCU-ME/backend/pulls?state=closed');
        const frontendResponse = await axios.get('https://api.github.com/repos/NYCU-ME/frontend/pulls?state=closed');


        // Concatenate contributors from all sources
        const contributor_list = apiServerResponse['data'].concat(backendResponse['data']).concat(frontendResponse['data']);
        
				for(let i = 0; i < contributor_list.length; i++) {
          if(contributor_list[i]['merged_at'] != null)
						this.contributor_list.push(contributor_list[i]['user']['login'])
				}
				console.log(this.contributor_list)
				const unique = arr => [...new Set(arr)];
				this.contributors = unique(this.contributor_list).join(", ")
				console.log(this.contributors)
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    },
  }
}
</script>

