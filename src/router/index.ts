import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/modules/Auth/Views/LoginView.vue';
import PerfilView from '@/modules/User/Profile/Views/PerfilView.vue';
import EditPerfilView from '@/modules/User/Profile/Views/EditPerfilView.vue';
import UsersListView from '@/modules/User/Views/UsersListView.vue';
import UserView from '@/modules/User/Views/UserView.vue';
import NewUserView from '@/modules/User/Views/NewUserView.vue';

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
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsersListView
    },
    {
      path: '/usuarios/:id',
      name: 'usuario',
      component: UserView
    },
    {
      path: '/usuarios/:id/editar',
      name: 'editarUsuario',
      component: EditPerfilView
    },
    {
      path: '/usuarios/novo',
      name: 'novoUsuario',
      component: NewUserView
    }
  ]
})

export default router
