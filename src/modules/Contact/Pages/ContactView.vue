<template>
  <MainLayout v-if="contact">
    <div class="row">
      <div class="col-md-12">
        <div class="card mt-4">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Detalhes do contato</h2>
            <div class="row">
              <div class="col-md-6">
                <p><strong>Nome:</strong> {{ contact.pessoa.nome }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>CPF:</strong> {{ contact.pessoa.cpf }}</p>
              </div>
              <div>
                <h3>Contato</h3>
                <p><strong>Telefone:</strong> {{ contact.telefone }}</p>
                <p><strong>Email:</strong> {{ contact.email }}</p>
                <p>
                  <strong>{{ contact.tag }}</strong>
                </p>
                <p>
                  <strong>{{ contact.tipoContato }}</strong>
                </p>
              </div>
              <EnderecoComponent :endereco="contact.pessoa.endereco" />
            </div>
            <router-link
              :to="{ name: 'editarPessoa', params: { id: contact.pessoa.id } }"
              class="btn btn-primary mt-3"
              >Editar</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { ref } from 'vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import type { Person } from '@/modules/Person/types'
import type { TypeContact } from '../types'
import { useAuthStore } from '@/modules/Auth/store'
import { useRouter } from 'vue-router'
import ContactService from '../service'
import type { User } from '@/modules/User/types'

const contact = ref({
  id: 0,
  email: '',
  pessoa: {
    id: 0,
    nome: '',
    cpf: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: 0,
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      id: 0,
      pais: ''
    },
    foto: {
      id: '',
      name: '',
      type: ''
    }
  } as Person,
  privado: false,
  tag: '',
  telefone: '',
  tipoContato: {} as TypeContact,
  usuario: {} as User
})

export default {
  name: 'ContactView',
  components: {
    MainLayout
  },
  async onMounted() {
    const authStore = useAuthStore()
    const router = useRouter()
    const authInfo = authStore.authInfo

    if (!authInfo) {
      await authStore.logout()
      router.push({ name: 'login' })
      return
    }

    const { id } = router.currentRoute.value.params
    const contactService = new ContactService(authInfo.accessToken)
    const resContacts = await contactService.buscarContato(Number(id))

    contact.value = resContacts
  },
  setup() {
    return {
      contact
    }
  }
}
</script>
