<template>
  <MainLayout>
    <div class="row" v-if="user">
      <div class="col-md-12">
        <h2 class="mt-2 text-center">Perfil</h2>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Informações do usuário</h5>
            <p class="card-text">
              <strong>Nome:</strong> {{ user.nome }}
              <span class="badge bg-danger" v-if="tipos.includes('ROLE_ADMIN')">ADMIN</span><br />
              <strong>Email:</strong> {{ user.email }}<br />
              <strong>CPF:</strong> {{ user.cpf }}<br />
              <strong>Telefone:</strong> {{ user.telefone }}<br />
            </p>
            <router-link
              :to="{ name: 'editarPerfil', params: { id: user.id } }"
              class="btn btn-primary d-flex align-self-end"
              >Editar</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import router from '@/router'
import { useAuthStore } from '@/modules/Auth/store'
import { useUserStore } from '../../store'

export default {
  name: 'PerfilView',
  components: {
    MainLayout
  },
  setup() {
    onMounted(async () => {
      const authStore = useAuthStore()
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }
    })

    const userStore = useUserStore()
    const user = userStore.getUser()
    const tipos = userStore.getTipos()

    return {
      user,
      tipos
    }
  }
}
</script>
