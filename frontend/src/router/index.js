import { createRouter, createWebHistory } from 'vue-router'
import ActionPlan from '../components/ActionPlan.vue'
import DocumentAnalysis from '../components/DocumentAnalysis.vue'
import OriginalScreen from '../components/OriginalScreen.vue'
import ResultsScreen from '../components/ResultsScreen.vue'
import SupportScreen from '../components/SupportScreen.vue'
import UploadInterface from '../components/UploadInterface.vue'
import WelcomeScreen from '../components/WelcomeScreen.vue'
const routes = [
  {
    path: '/',
    name: 'Original',
    component: OriginalScreen
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: WelcomeScreen
  },
  {
    path: '/upload',
    name: 'Upload',
    component: UploadInterface
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: DocumentAnalysis
  },
  {
    path: '/results',
    name: 'Results',
    component: ResultsScreen
  },
  {
    path: '/action-plan',
    name: 'ActionPlan',
    component: ActionPlan
  },
  {
    path: '/support',
    name: 'Support',
    component: SupportScreen
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 