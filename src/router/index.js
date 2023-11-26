import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutUs from '../views/AboutUs.vue'
import MyProfile from '../views/MyProfile.vue'

const router = createRouter({
  history: createWebHistory(),
  routes :  [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/about-us',
      component: AboutUs
    },
    {
      path: '/profile',
      component: MyProfile
    }
  ]
})

export default router
