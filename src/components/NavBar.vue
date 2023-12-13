<template>
<nav ref="navbar" class="bg-[#11191F]">
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex items-center justify-between h-16">
			<div class="flex-1 flex items-center justify-start sm:items-stretch">					
				<div class="flex-shrink-0 flex items-center">
					<button ref="menuButton" v-if="isLogged" @click="toggleDashBoard" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
						<ButtonStyle></ButtonStyle>
					</button>
					<a href="/"><h1 class="text-2xl text-gray-300">NYCU-ME</h1></a>
					</div>
					<div class="flex flex-1 items-center justify-end">
						<LoggedListComponent v-if="isLogged"></LoggedListComponent>
						<LogoutListComponent v-else v-bind:loginUrl="loginUrl"></LogoutListComponent>
					</div>
				</div>
				<!-- Mobile menu button -->
			</div>
		</div>
	</nav>
  <div :style="{top: topValue}" ref="dashboard-menu" id="dashboard-menu" class="overlay-element bg-[#363B3F] sm:1/3 md:w-1/6 text-gray-300" v-show="isDashBoardOpen">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <ul>
        <li><a href="/dashboard">儀表板</a></li>
        <li><a href="/domains">DNS 管理</a></li>
        <hr/>
        <li><a href="/profile">個人資料</a></li>
        <li><a @click="logout">登出</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import LoggedListComponent from './LoggedListComponent';
import LogoutListComponent from './LogoutListComponent';
import ButtonStyle from './ButtonStyle';
import Cookies from 'js-cookie';

export default {
  components: {
		LoggedListComponent,
		LogoutListComponent,
    ButtonStyle,
  }, 
  data() {
    return {
      isDashBoardOpen: false,
      isMobileMenuOpen: false,
      topValue: "0px",
    };
  },
  name: "NavBar",
  props: {
    loginUrl: {
      type: String
    },
		isLogged: {
      type: Boolean
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      this.isDashBoardOpen = false;
    },
    toggleDashBoard() {
      this.isMobileMenuOpen = false;
      this.isDashBoardOpen = !this.isDashBoardOpen;
    },
    logout() {
      Cookies.remove('token');
      location.reload();
    }
  },
  mounted() {
    const navbar= this.$refs.navbar;
    const height = navbar.clientHeight;
    this.topValue = height + 'px';
  }
};
</script>

<style>

.overlay-element {
  position: absolute;
  z-index: 10;
  left: 0;
}

</style>
