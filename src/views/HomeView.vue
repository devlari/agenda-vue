<template>
  <MainLayout>
    <div v-if="user">
      <h2 class="mt-2 text-center">Bem vindo, {{ user.nome }}</h2>
      <PersonList :people="people" />
    </div>
  </MainLayout>
</template>

<style scoped>
.divider {
  border-top: 2px solid #ccc;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/Auth/store'
import { useUserStore } from '@/modules/User/store'
import MainLayout from '@/components/layout/MainLayout.vue'
import PersonService from '@/modules/Person/service'
import PersonList from '@/modules/Person/components/PersonList/PersonList.vue'
import type { Person } from '@/modules/Person/types'

export default {
  components: {
    MainLayout,
    PersonList
  },
  setup() {
    const authStore = useAuthStore()
    const userStore = useUserStore()
    const router = useRouter()

    const people = ref([] as Person[])

    onMounted(async () => {
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }

      try {
        const personService = new PersonService(authInfo.accessToken)
        const res = await personService.pesquisarPessoas('')
        people.value = res
      } catch (error) {
        console.error('Erro ao buscar pessoas:', error)
      }
    })

    return {
      user: userStore.getUser(),
      people
    }
  }
}
</script>
