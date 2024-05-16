<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div class="container">
        <router-link class="navbar-brand" to="/">Agenda</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"></li>
            <li class="nav-item">
              <router-link class="nav-link" to="/perfil">Perfil</router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link" to="/usuarios">Usuários</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/pessoas">Pessoas</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <button class="nav-link" @click="handleLogout()"><ph-sign-out /> Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { PhSignOut } from '@phosphor-icons/vue'
import { useAuthStore } from '@/modules/Auth/store'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export default {
  name: 'HeaderComponent',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    if (!authStore.authInfo) {
      authStore.logout()
      router.push({ name: 'login' })
      return {}
    }

    const isAdmin = authStore.authInfo.tipos.includes('ROLE_ADMIN')

    async function handleLogout() {
      const confirm = await Swal.fire({
        title: 'Deseja realmente sair?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      })

      if (!confirm.isConfirmed) return

      await authStore.logout()
      router.push({ name: 'login' })
    }

    return {
      handleLogout,
      isAdmin
    }
  },
  components: {
    PhSignOut
  }
}
</script>
