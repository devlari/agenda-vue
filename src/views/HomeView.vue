<template>
  <MainLayout>
    <div v-if="user">
      <h2 class="mt-2 text-center">Bem vindo, {{ user.nome }}</h2>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/Auth/store'
import { useUserStore } from '@/modules/User/store'
import MainLayout from '@/components/layout/MainLayout.vue'
import UserService from '@/modules/User/service'
import type { User } from '@/modules/User/types'

const user = ref<User | null>(null)

export default {
  components: {
    MainLayout
  },
  setup() {
    const authStore = useAuthStore()
    const userStore = useUserStore()
    const router = useRouter()

    onMounted(async () => {
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }

      //TODO: Implementar "lembre-se de mim"
      const userService = new UserService(authInfo.accessToken)

      try {
        const res = await userService.buscarUsuario(authInfo.id)

        if (!res) {
          await authStore.logout()
          router.push({ name: 'login' })
          return
        }

        userStore.setUser(res.usuario)
        user.value = res.usuario
      } catch (error) {
        console.error(error)
        await authStore.logout()
        await router.push({ name: 'login' })
        return
      }
    })

    return {
      user: userStore.user
    }
  }
}
</script>
