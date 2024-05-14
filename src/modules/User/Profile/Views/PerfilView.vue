<template>
  <MainLayout>
    <div class="row" v-if="user">
      <div class="col-md-12">
        <h2 class="mt-2 text-center">Perfil</h2>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center mb-4">Informações do usuário</h5>
            <div class="row">
              <div class="col-md-6">
                <p>
                  <strong>Nome:</strong> {{ user.nome }}
                  <span class="badge bg-danger" v-if="tipos.includes('ROLE_ADMIN')">ADMIN</span>
                </p>
              </div>
              <div class="col-md-6">
                <p><strong>Email:</strong> {{ user.email }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>CPF:</strong> {{ user.cpf }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Telefone:</strong> {{ user.telefone }}</p>
              </div>
            </div>
            <router-link
              :to="{ name: 'editarPerfil', params: { id: user.id } }"
              class="btn btn-primary mt-3"
              >Editar</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'
import { useAuthStore } from '@/modules/Auth/store'
import { useUserStore } from '@/modules/User/store'

export default defineComponent({
  name: 'PerfilView',
  components: {
    MainLayout
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const userStore = useUserStore()

    onMounted(async () => {
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }
    })

    const user = userStore.getUser()
    const tipos = userStore.getTipos()

    return {
      user,
      tipos
    }
  }
})
</script>
