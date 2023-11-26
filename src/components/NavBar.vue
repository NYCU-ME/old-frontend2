<template>
	<nav class="bg-[#363b3f]">
		<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
			<div class="relative flex items-center justify-between h-16">
				<div class="flex-1 flex items-center justify-start sm:items-stretch">
					<div class="flex-shrink-0 flex items-center">
						<!-- Logo here -->
						<a href="/"><h1 class="text-2xl text-gray-300">NYCU-ME</h1></a>
					</div>
					<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
						<LoggedListComponent v-if="isLogged"></LoggedListComponent>
						<LogoutListComponent v-else v-bind:loginUrl="loginUrl"></LogoutListComponent>
					</div>
				</div>
				<!-- Mobile menu button -->
				<div class="sm:hidden">
					<button @click="toggleMobileMenu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
						<span class="sr-only">Open main menu</span>
						<svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
						</svg>
						<svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile menu, show/hide based on menu state. -->
		<div class="sm:hidden" id="mobile-menu" v-show="isMobileMenuOpen">
			<div class="px-2 pt-2 pb-3 space-y-1">
				<!-- Mobile Navigation Links -->
				<LoggedListComponent v-if="isLogged"></LoggedListComponent>
				<LogoutListComponent v-else v-bind:loginUrl="loginUrl"></LogoutListComponent>
			</div>
		</div>
	</nav>

</template>

<script>
import LoggedListComponent from './LoggedListComponent';
import LogoutListComponent from './LogoutListComponent';

export default {
  components: {
		LoggedListComponent,
		LogoutListComponent,
  }, 
  data() {
    return {
      isMobileMenuOpen: false,
    };
  },
  name: "NavBar",
  props: {
    loginUrl: {
      type: String
    },
		isLogged: {
      type: Boolean
    },
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
  }
};
</script>
