<template>
  <MainLayout>
    <div class="col-md-12">
      <h2 class="mt-2 text-center">Novo Usuário</h2>
      <div class="card">
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="user.username" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Senha</label>
              <input type="password" class="form-control" id="password" v-model="user.password" />
            </div>
            <div class="mb-3">
              <label for="repeat-password" class="form-label">Confirmar senha</label>
              <input
                type="password"
                class="form-control"
                id="repeat-password"
                v-model="user.repeatPassword"
              />
            </div>
            <div class="mb-3">
              <input
                type="checkbox"
                class="form-check-input me-2"
                id="isAdmin"
                v-model="user.isAdmin"
              />
              <label for="isAdmin" class="form-label">Admin</label>
            </div>
            <div class="mb-3">
              <label for="nome" class="form-label">Nome</label>
              <input type="text" class="form-control" id="nome" v-model="user.nome" />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="user.email" />
            </div>
            <div class="mb-3">
              <label for="cpf" class="form-label">CPF</label>
              <input type="text" class="form-control" id="cpf" v-model="user.cpf" />
            </div>
            <div class="mb-3">
              <label for="telefone" class="form-label">Telefone</label>
              <input type="text" class="form-control" id="telefone" v-model="user.telefone" />
            </div>
            <div class="mb-3">
              <label for="dataNascimento" class="form-label">Data de Nascimento</label>
              <input
                type="date"
                class="form-control"
                id="dataNascimento"
                v-model="user.dataNascimento"
              />
            </div>
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
import MainLayout from '@/components/layout/MainLayout.vue'
import { useAuthStore } from '@/modules/Auth/store'
import UserService from '@/modules/User/service'
import type { UserForm, User } from '../types'

export default {
  name: 'EditPerfilView',
  components: {
    MainLayout
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
