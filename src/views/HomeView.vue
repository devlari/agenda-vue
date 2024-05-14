<template>
  <MainLayout>
    <div v-if="user">
      <h2 class="mt-2 text-center">Bem vindo, {{ user.nome }}</h2>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/Auth/store'
import { useUserStore } from '@/modules/User/store'
import MainLayout from '@/components/layout/MainLayout.vue'
import UserService from '@/modules/User/service'

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
    })

    return {
      user: userStore.getUser()
    }
  }
}
</script>
