import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutUs from '../views/AboutUs.vue'
import MyProfile from '../views/MyProfile.vue'
import MyDomains from '../views/MyDomains.vue'
import DomainPanel from '../views/DomainPanel.vue'
import StatisticsPage from '../views/StatisticsPage.vue'
import DashboardPage from '../views/DashboardPage.vue'

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
    },
    {
      path: '/statics',
      component: StatisticsPage
    },
    {
      path: '/dashboard',
      component: DashboardPage
    }
  ]
})

export default router
