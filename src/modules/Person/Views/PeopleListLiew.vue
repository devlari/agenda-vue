<template>
  <MainLayout>
    <h2 class="mt-2 text-center">Pessoas</h2>
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex justify-content-between align-items-center">
          <SearchComponent :search="search" :pesquisar-func="buscarPessoas" />
          <router-link to="/pessoas/novo" class="btn btn-primary">Novo</router-link>
        </div>
        <TablePerson :people="people" :deletarPessoa="deletarPessoa" />
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
import TablePerson from '../components/Table/TablePerson.vue'
import { useAuthStore } from '@/modules/Auth/store'
import PersonService from '@/modules/Person/service'
import type { Person } from '../types'
import Swal from 'sweetalert2'

const people: Ref<Person[]> = ref([])
const search: Ref<string> = ref('')

const buscarPessoas = async (searchValue: string) => {
  const authStore = useAuthStore()
  const router = useRouter()
  const authInfo = authStore.authInfo

  if (!authInfo) {
    await authStore.logout()
    router.push({ name: 'login' })
    return
  }

  const personService = new PersonService(authInfo.accessToken)
  try {
    const response = await personService.pesquisarPessoas(searchValue)
    people.value = response
  } catch (error) {
    console.error(error)
  }
}

async function deletarPessoa(id: number) {
  const confirm = await Swal.fire({
    title: 'Atenção!',
    text: 'Deseja realmente excluir essa pessoa?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  })

  if (!confirm.isConfirmed) return

  const authStore = useAuthStore()
  const authInfo = authStore.authInfo
  const router = useRouter()

  if (!authInfo) {
    await authStore.logout()
    router.push({ name: 'login' })
    return
  }

  const personService = new PersonService(authInfo.accessToken)
  try {
    await personService.removerPessoa(id)

    await Swal.fire({
      title: 'Sucesso!',
      text: 'Pessoa excluída com sucesso',
      icon: 'success'
    })

    router.go(0)
  } catch (error) {
    console.error(error)
  }
}

export default {
  name: 'UsersListView',
  components: {
    MainLayout,
    TablePerson,
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

      async function buscarPessoas(token: string) {
        const personService = new PersonService(token)
        try {
          const response = await personService.pesquisarPessoas('')
          people.value = response
        } catch (error) {
          console.error(error)
        }
      }

      await buscarPessoas(authInfo.accessToken)
    })

    return {
      people,
      search,
      buscarPessoas,
      deletarPessoa
    }
  }
}
</script>
