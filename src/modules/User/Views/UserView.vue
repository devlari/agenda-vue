<template>
  <MainLayout v-if="user">
    <div class="row">
      <div class="col-md-12">
        <div class="card mt-4">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Detalhes do usuário {{ user.nome }}</h2>
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
                <p><strong>Username:</strong> {{ user.username }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>CPF:</strong> {{ user.cpf }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Telefone:</strong> {{ user.telefone }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Data de nascimento:</strong> {{ formatDate(user.dataNascimento) }}</p>
              </div>
            </div>
            <router-link
              :to="{ name: 'editarUsuario', params: { id: user.id } }"
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
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'
import { useAuthStore } from '@/modules/Auth/store'
import UserService from '@/modules/User/service'
import { formatDate } from '@/utils/index'
import type { User } from '../types'

const user: Ref<User | null> = ref(null)
const tipos: Ref<string[]> = ref(['ROLE_ADMIN', 'ROLE_USER'])

export default {
  name: 'NewUserView',
  components: {
    MainLayout
  },
  setup() {
    onMounted(async () => {
      const authStore = useAuthStore()
      const router = useRouter()
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }

      async function buscarUsuario(token: string, id: number) {
        const userService = new UserService(token)
        try {
          const response = await userService.buscarUsuario(id)
          user.value = response.usuario
          tipos.value = response.tipos
        } catch (error) {
          console.error(error)
        }
      }

      const { id } = router.currentRoute.value.params
      await buscarUsuario(authInfo.accessToken, Number(id[0]))
    })

    return {
      user,
      tipos,
      formatDate
    }
  }
}
</script>
