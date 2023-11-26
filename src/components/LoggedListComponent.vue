<template>
    <a href="/profile" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">個人資料</a>
    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">網域管理</a>
    <a href="/about-us" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">關於我們</a>
    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">聯係我們</a>
    <a @click="logout" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">登出</a>
</template>

<script>
  import Cookies from 'js-cookie';

  export default {
    name: "LoggedListComponent",
    methods: {
      logout() {
        Cookies.remove('token');
        console.log("logout");
        location.reload();
      }
    }
  };
  
</script>
