<template>
  <MainLayout>
    <div class="col-md-12">
      <h2 class="mt-2 text-center">Editar Pessoa</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="salvarPessoa">
            <InputComponent
              class="mb-3"
              label="Nome"
              type="text"
              v-model="person.nome"
              id="nome"
              required
            />
            <InputComponent
              class="mb-3"
              label="CPF"
              type="text"
              v-model="person.cpf"
              id="cpf"
              required
            />
            <InputComponent
              class="mb-3"
              label="CEP"
              type="text"
              v-model="person.endereco.cep"
              id="cep"
              required
            />
            <InputComponent
              class="mb-3"
              label="Rua"
              type="text"
              v-model="person.endereco.logradouro"
              id="rua"
              required
            />
            <InputComponent
              class="mb-3"
              label="Número"
              type="text"
              v-model="person.endereco.numero"
              id="numero"
            />
            <InputComponent
              class="mb-3"
              label="Cidade"
              type="text"
              v-model="person.endereco.cidade"
              id="cidade"
              required
            />
            <InputComponent
              class="mb-3"
              label="Estado"
              type="text"
              v-model="person.endereco.estado"
              id="estado"
              required
            />
            <InputComponent
              class="mb-3"
              label="País"
              type="text"
              v-model="person.endereco.pais"
              id="pais"
              required
            />
            <button type="submit" class="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import MainLayout from '@/components/layout/MainLayout.vue'
import InputComponent from '@/components/ui/Input.vue'
import { useAuthStore } from '@/modules/Auth/store'
import PersonService from '../service'
import type { Person } from '../types'

export default {
  name: 'EditPersonView',
  components: {
    MainLayout,
    InputComponent
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const person: Ref<Person> = ref({
      nome: '',
      cpf: '',
      endereco: {
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        cidade: '',
        estado: '',
        pais: ''
      }
    } as unknown as Person)

    onMounted(async () => {
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }

      const personService = new PersonService(authInfo.accessToken)

      const { id } = router.currentRoute.value.params
      const response = await personService.buscarPessoa(Number(id))
      person.value = response.object
    })

    async function salvarPessoa() {
      const confirm = await Swal.fire({
        title: 'Salvar alterações?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      })

      if (!confirm.isConfirmed) return

      const personService = new PersonService(authStore.authInfo?.accessToken || '')
      try {
        await personService.salvarPessoa(person.value)

        await Swal.fire({
          title: 'Sucesso!',
          text: 'Usuário atualizado com sucesso',
          icon: 'success'
        })

        router.push({ name: 'pessoas' })
      } catch (error: any) {
        console.error(error)

        if (error.response && error.response.status === 401) {
          await authStore.logout()
          router.push({ name: 'login' })
        } else {
          await Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível atualizar a pessoa',
            icon: 'error'
          })
        }
      }
    }

    return {
      person,
      salvarPessoa
    }
  }
}
</script>
