<template>
  <MainLayout>
    <h2 class="mt-2 text-center">Bem vindo, {{ user.nome }}</h2>
  </MainLayout>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/Auth/store'
import { useUserStore } from '@/modules/User/store'
import MainLayout from '@/components/layout/MainLayout.vue'
import UserService from '@/modules/User/service'
import { onMounted } from 'vue'

export default {
  components: {
    MainLayout
  },
  setup() {
    const authStore = useAuthStore()
    const userStore = useUserStore()
    const userService = new UserService()
    const router = useRouter()

    onMounted(async () => {
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }

      //TODO: Implementar "lembre-se de mim"

      try {
        const user = await userService.buscarUsuario(authInfo.id)

        if (!user) {
          await authStore.logout()
          router.push({ name: 'login' })
          return
        }

        userStore.setUser(user)
      } catch (error) {
        console.error(error)
        await authStore.logout()
        await router.push({ name: 'login' })
        return
      }
    })

    const user = userStore.getUser()

    return {
      user
    }
  }
}
</script>
