import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/modules/Auth/Views/LoginView.vue';
import PerfilView from '@/modules/User/Profile/Views/PerfilView.vue';
import EditPerfilView from '@/modules/User/Profile/Views/EditPerfilView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView
    },
    {
      path: '/perfil/:id/editar',
      name: 'editarPerfil',
      component: EditPerfilView
    }
  ]
})

export default router
