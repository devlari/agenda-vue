<template>
  <MainLayout>
    <div class="row">
      <div class="col-md-12">
        <h2 class="mt-2 text-center">Perfil</h2>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Informações do usuário</h5>
            <p class="card-text">
              {{ user?.nome }}<br />
              {{ user?.email }}<br />
              {{ user?.telefone }}<br />
              {{ user?.dataNascimento }}<br />
              {{ user?.cpf }}<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import { useAuthStore } from '@/modules/Auth/store'
import UserService from '../../service'
import type { User } from '../../types'
import router from '@/router'

export default {
  name: 'PerfilView',
  data() {
    return {
      user: null as User | null
    }
  },
  components: {
    MainLayout
  },
  setup() {
    const authStore = useAuthStore()
    const userService = new UserService()

    onMounted(async () => {
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }

      const usuario = await userService.buscarUsuario(authInfo.id)

      if (!usuario) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }

      this.user = usuario
    })
  }
}
</script>
