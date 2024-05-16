<template>
  <MainLayout>
    <div class="col-md-12">
      <h2 class="mt-2 text-center">Novo Usuário</h2>
      <div class="card">
        <div class="card-body">
          <form>
            <InputComponent label="Usuário" type="text" v-model="user.username" required />
            <InputComponent label="Senha" type="password" v-model="user.password" required />
            <InputComponent
              label="Repetir Senha"
              type="password"
              v-model="user.repeatPassword"
              required
            />
            <input
              type="checkbox"
              class="form-check-input me-2"
              id="isAdmin"
              v-model="user.isAdmin"
            />
            <label for="isAdmin" class="form-label">Admin</label>
            <InputComponent label="Nome" type="text" v-model="user.nome" id="nome" required />
            <InputComponent label="Email" type="email" v-model="user.email" id="email" />
            <InputComponent label="CPF" type="text" v-model="user.cpf" id="cpf" />
            <InputComponent label="Telefone" type="text" v-model="user.telefone" id="telefone" />
            <InputComponent
              label="Data de Nascimento"
              type="date"
              v-model="user.dataNascimento"
              id="dataNascimento"
            />
            <button type="submit" class="btn btn-primary" @click="(e) => salvarUsuario(e)">
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
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import InputComponent from '@/components/ui/Input.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import { useAuthStore } from '@/modules/Auth/store'
import UserService from '@/modules/User/service'
import type { UserForm, User } from '../types'

export default {
  name: 'EditPerfilView',
  components: {
    MainLayout,
    InputComponent
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const user: Ref<UserForm> = ref({
      username: '',
      password: '',
      repeatPassword: '',
      isAdmin: false,
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      dataNascimento: ''
    })

    onMounted(async () => {
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }
    })

    async function salvarUsuario(event: Event) {
      event.preventDefault()

      const confirm = await Swal.fire({
        title: 'Criar novo usuário?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      })

      if (!confirm.isConfirmed) return

      if (user.value.password !== user.value.repeatPassword) {
        await Swal.fire({
          title: 'Atenção!',
          text: 'As senhas não coincidem',
          icon: 'warning'
        })
        return
      }

      const regexLetrasNumeros = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

      if (user.value.password.length < 8 || regexLetrasNumeros.test(user.value.password) == false) {
        await Swal.fire({
          title: 'Atenção!',
          text: 'A senha deve conter no mínimo 8 caracteres, sendo pelo menos uma letra e um número',
          icon: 'warning'
        })
        return
      }

      const userService = new UserService(authStore.authInfo?.accessToken || '')

      // API retornando erro 500 ao tentar criar usuário
      try {
        const tipos = user.value.isAdmin ? ['ROLE_ADMIN'] : ['ROLE_USER']
        const newUser: User = {
          id: -1,
          username: user.value.username,
          password: user.value.password,
          nome: user.value.nome,
          email: user.value.email,
          cpf: user.value.cpf,
          telefone: user.value.telefone,
          dataNascimento: user.value.dataNascimento
        }

        await userService.salvarUsuario(newUser, tipos)

        await Swal.fire({
          title: 'Sucesso!',
          text: 'Usuário criado com sucesso',
          icon: 'success'
        })

        router.push({ name: 'usuarios' })
      } catch (error: any) {
        console.error(error)

        if (error.response && error.response.status === 401) {
          await authStore.logout()
          router.push({ name: 'login' })
        } else {
          await Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível atualizar o usuário',
            icon: 'error'
          })
        }
      }
    }

    return {
      user,
      salvarUsuario,
      isPerfil: router.currentRoute.value.name == 'editarPerfil'
    }
  }
}
</script>
