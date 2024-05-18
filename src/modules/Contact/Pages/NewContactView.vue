<template>
  <MainLayout>
    <h2 class="mt-2 text-center">Novo Usuário</h2>
    <div class="card">
      <div class="card-body">
        <form>
          <div class="row">
            <div class="form-group mb-3">
              <label for="tipoContato" class="mb-2">Tipo de Contato</label>
              <select class="form-select" id="tipoContato" v-model="tipoContato">
                <option value="EMAIL">E-mail</option>
                <option value="TELEFONE">Telefone</option>
                <option value="CELULAR">Celular</option>
              </select>
            </div>
            <InputComponent
              id="tag"
              label="Tag"
              class="mb-3"
              placeholder="Exemplo: privado, comercial..."
              v-model="tag"
            />
            <InputComponent
              :type="inputType"
              id="contactInput"
              :label="contactLabel"
              class="mb-3"
              v-model="contato"
            />
            <div class="form-check mb-3 ms-2">
              <input class="form-check-input" type="checkbox" id="checkLembrar" v-model="privado" />
              <label class="form-check-label" for="checkLembrar">Privado</label>
            </div>
            <div>
              <button class="btn btn-primary" @click="handleSubmit">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import InputComponent from '@/components/ui/Input.vue'
import ContatoService from '@/modules/Contact/service'
import PessoaService from '@/modules/Person/service'
import router from '@/router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/modules/Auth/store'
import type { Contact, TypeContact } from '../types'
import UserService from '@/modules/User/service'

export default defineComponent({
  name: 'NewContactView',
  components: {
    MainLayout,
    InputComponent
  },
  setup() {
    const tipoContato = ref('EMAIL')
    const tag = ref('')
    const contato = ref('')
    const privado = ref(false)

    const inputType = computed(() => {
      return tipoContato.value === 'EMAIL' ? 'email' : 'tel'
    })

    const contactLabel = computed(() => {
      return tipoContato.value === 'EMAIL' ? 'E-mail' : 'Telefone/Celular'
    })

    async function handleSubmit(event: Event) {
      event.preventDefault()
      const authStore = useAuthStore()

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

      const { id } = router.currentRoute.value.params

      const pessoaService = new PessoaService(authInfo.accessToken)
      const pessoa = await pessoaService.buscarPessoa(Number(id))

      const userService = new UserService(authInfo.accessToken)
      const usuario = await userService.buscarUsuario(authInfo.id)

      const contatoService = new ContatoService(authInfo.accessToken)

      let novoContato: Contact = {
        id: -1,
        privado: privado.value,
        tag: tag.value,
        tipoContato: tipoContato.value as TypeContact,
        telefone: '',
        email: '',
        pessoa: pessoa.object,
        usuario: usuario.usuario
      }

      if (tipoContato.value === 'EMAIL') {
        novoContato.email = contato.value
      } else {
        novoContato.telefone = contato.value
      }

      await contatoService.salvarContato(novoContato)

      await Swal.fire({
        title: 'Contato salvo com sucesso!',
        icon: 'success'
      })

      router.push({ name: 'contatosPessoa', params: { id: id } })
    }

    return {
      tipoContato,
      tag,
      contato,
      inputType,
      contactLabel,
      privado,
      handleSubmit
    }
  }
})
</script>
