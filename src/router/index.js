import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutUs from '../views/AboutUs.vue'
import MyProfile from '../views/MyProfile.vue'
import MyDomains from '../views/MyDomains.vue'
import DomainPanel from '../views/DomainPanel.vue'

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
    },
    {
      path: '/domains',
      component: MyDomains
    },
    {
      path: '/domain',
      component: DomainPanel
    }
  ]
})

export default router
