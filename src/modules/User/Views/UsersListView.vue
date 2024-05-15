<template>
  <MainLayout>
    <h2 class="mt-2 text-center">Usuários</h2>
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex justify-content-between align-items-center">
          <SearchComponent :search="search" :pesquisar-func="buscarUsuarios" />
          <router-link to="/usuarios/novo" class="btn btn-primary">Novo</router-link>
        </div>
        <TableUsers :users="users" />
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'
import SearchComponent from '@/components/ui/Search.vue'
import TableUsers from '@/modules/User/Components/Table/TableUsers.vue'
import { useAuthStore } from '@/modules/Auth/store'
import UserService from '@/modules/User/service'
import type { User } from '../types'

const users: Ref<User[]> = ref([])
const search: Ref<string> = ref('')

const buscarUsuarios = async (searchValue: string) => {
  const authStore = useAuthStore()
  const router = useRouter()
  const authInfo = authStore.authInfo

  if (!authInfo) {
    await authStore.logout()
    router.push({ name: 'login' })
    return
  }

  const userService = new UserService(authInfo.accessToken)
  try {
    const response = await userService.pesquisarUsuarios(searchValue)
    users.value = response
  } catch (error) {
    console.error(error)
  }
}

export default {
  name: 'UsersListView',
  components: {
    MainLayout,
    TableUsers,
    SearchComponent
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

      async function buscarUsuarios(token: string) {
        const userService = new UserService(token)
        try {
          const response = await userService.pesquisarUsuarios('')
          users.value = response
        } catch (error) {
          console.error(error)
        }
      }

      await buscarUsuarios(authInfo.accessToken)
    })

    return {
      users,
      search,
      buscarUsuarios
    }
  }
}
</script>
