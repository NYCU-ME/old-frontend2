<template>
  <div>
    <a href="/about-us" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">關於我們</a>
    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">聯繫我們</a>
    <a :href="loginUrl" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">登入</a>
  </div>
</template>

<script>
export default {
  name: "LoggedListComponent",
  props: {
    loginUrl: {
      type: String
    }
  }
};
</script>
