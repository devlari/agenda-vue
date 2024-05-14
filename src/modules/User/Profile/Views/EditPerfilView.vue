<template>
  <MainLayout>
    <div class="col-md-12">
      <h2 class="mt-2 text-center">Editar {{ isPerfil ? 'Perfil' : 'Usuário' }}</h2>
      <div class="card">
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="nome" class="form-label">Nome</label>
              <input type="text" class="form-control" id="nome" v-model="user.nome" />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="user.email" />
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="user.username" />
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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import MainLayout from '@/components/layout/MainLayout.vue'
import { useAuthStore } from '@/modules/Auth/store'
import UserService from '@/modules/User/service'
import { useUserStore } from '../../store'

export default {
  name: 'EditPerfilView',
  components: {
    MainLayout
  },
  setup() {
    const authStore = useAuthStore()
    const userStore = useUserStore()
    const router = useRouter()
    const user = userStore.getUser()

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
        title: 'Salvar alterações?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      })

      if (!confirm.isConfirmed) return

      const userService = new UserService(authStore.authInfo?.accessToken || '')
      try {
        await userService.atualizarUsuario(user)
        userStore.setUser(user)

        await Swal.fire({
          title: 'Sucesso!',
          text: 'Usuário atualizado com sucesso',
          icon: 'success'
        })

        router.push({ name: 'perfil' })
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
