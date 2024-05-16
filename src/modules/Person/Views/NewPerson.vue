<template>
  <MainLayout>
    <div class="col-md-12">
      <h2 class="mt-2 text-center">Novo Usuário</h2>
      <div class="card">
        <div class="card-body">
          <form>
            <InputComponent
              required
              class="mb-3"
              label="Nome"
              type="text"
              v-model="person.nome"
              id="nome"
            />
            <InputComponent
              required
              class="mb-3"
              label="CPF"
              type="text"
              v-model="person.cpf"
              id="cpf"
            />
            <InputComponent
              required
              class="mb-3"
              label="CEP"
              type="text"
              v-model="person.endereco.cep"
              id="cep"
            />
            <InputComponent
              required
              class="mb-3"
              label="Logradouro"
              type="text"
              v-model="person.endereco.logradouro"
              id="logradouro"
            />
            <InputComponent
              required
              class="mb-3"
              label="Número"
              type="number"
              v-model="person.endereco.numero"
              id="numero"
            />
            <InputComponent
              required
              class="mb-3"
              label="Bairro"
              type="text"
              v-model="person.endereco.bairro"
              id="bairro"
            />
            <InputComponent
              required
              class="mb-3"
              label="Cidade"
              type="text"
              v-model="person.endereco.cidade"
              id="cidade"
            />
            <InputComponent
              required
              class="mb-3"
              label="Estado"
              type="text"
              v-model="person.endereco.estado"
              id="estado"
            />
            <InputComponent
              required
              class="mb-3"
              label="País"
              type="text"
              v-model="person.endereco.pais"
              id="pais"
            />
            <button type="submit" class="btn btn-primary" @click="(e) => salvarPessoa(e)">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import InputComponent from '@/components/ui/Input.vue'
import { useAuthStore } from '@/modules/Auth/store'
import { useRouter } from 'vue-router'
import PersonService from '../service'
import type { PersonForm } from '../types'
import Swal from 'sweetalert2'

export default {
  name: 'NewPersonView',
  components: {
    MainLayout,
    InputComponent
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const person: Ref<PersonForm> = ref({
      nome: '',
      cpf: '',
      endereco: {
        id: -1,
        cep: '',
        logradouro: '',
        numero: 0,
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        pais: ''
      },
      foto: {
        id: '',
        name: '',
        type: ''
      }
    } as PersonForm)

    onMounted(async () => {
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }
    })

    // POST dando erro 500
    async function salvarPessoa(event: Event) {
      event.preventDefault()

      const confirm = await Swal.fire({
        title: 'Criar nova pessoa?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      })

      if (!confirm.isConfirmed) return

      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }

      const pessoaService = new PersonService(authInfo.accessToken)

      try {
        await pessoaService.salvarPessoa(person.value)

        await Swal.fire({
          title: 'Sucesso!',
          text: 'Pessoa criada com sucesso',
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
            text: 'Não foi possível criar a pessoa',
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
