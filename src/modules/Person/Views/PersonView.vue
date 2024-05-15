<template>
  <MainLayout v-if="person">
    <div class="row">
      <div class="col-md-12">
        <div class="card mt-4">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Detalhes da pessoa {{ person.nome }}</h2>
            <div class="row">
              <div class="col-md-6">
                <p><strong>Nome:</strong> {{ person.nome }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>CPF:</strong> {{ person.cpf }}</p>
              </div>
              <EnderecoComponent :endereco="person.endereco" />
            </div>
            <!-- <router-link
              :to="{ name: 'editarUsuario', params: { id: user.id } }"
              class="btn btn-primary mt-3"
              >Editar</router-link
            > -->
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
import PersonService from '../service'
import { formatDate } from '@/utils/index'
import EnderecoComponent from '../components/Endereco.vue'
import type { Person } from '../types'

const person: Ref<Person | null> = ref(null)

export default {
  name: 'PersonView',
  components: {
    MainLayout,
    EnderecoComponent
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

      async function buscarPessoa(token: string, id: number) {
        const personService = new PersonService(token)
        try {
          const response = await personService.buscarPessoa(id)

          person.value = response.object
        } catch (error) {
          console.error(error)
        }
      }

      const { id } = router.currentRoute.value.params
      await buscarPessoa(authInfo.accessToken, Number(id[0]))
    })

    return {
      person,
      formatDate
    }
  }
}
</script>
