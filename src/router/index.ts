import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/modules/Auth/Views/LoginView.vue';
import PerfilView from '@/modules/User/Profile/Views/PerfilView.vue';
import EditPerfilView from '@/modules/User/Profile/Views/EditPerfilView.vue';
import UsersListView from '@/modules/User/Views/UsersListView.vue';
import UserView from '@/modules/User/Views/UserView.vue';
import NewUserView from '@/modules/User/Views/NewUserView.vue';
import PersonListView from '@/modules/Person/Views/PeopleListLiew.vue';
import PersonView from '@/modules/Person/Views/PersonView.vue';
import EditPersonView from '@/modules/Person/Views/EditPersonView.vue';
import NewPersonView from '@/modules/Person/Views/NewPerson.vue';
import ContactView from '@/modules/Contact/Pages/ContactView.vue';
import NewContactView from '@/modules/Contact/Pages/NewContactView.vue';

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
    },
    {
      path: '/pessoas',
      name: 'pessoas',
      component: PersonListView
    },
    {
      path: '/pessoas/novo',
      name: 'novaPessoa',
      component: NewPersonView
    },
    {
      path: '/pessoas/:id',
      name: 'pessoa',
      component: PersonView
    },
    {
      path: '/pessoas/:id/editar',
      name: 'editarPessoa',
      component: EditPersonView
    },
    {
      path: '/contatos/pessoa/:id',
      name: 'contatosPessoa',
      component: ContactView
    },
    {
      path: '/contatos/pessoa/:id/novo',
      name: 'novoContato',
      component: NewContactView
    }
  ]
})

export default router
