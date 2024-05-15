<template>
  <MainLayout>
    <div class="col-md-12">
      <h2 class="mt-2 text-center">Editar {{ isPerfil ? 'Perfil' : 'Usuário' }}</h2>
      <div class="card">
        <div class="card-body">
          <form>
            <div class="mb-3">
              <InputComponent label="Nome" type="text" v-model="user.nome" required />
            </div>
            <div class="mb-3">
              <InputComponent label="Email" type="email" v-model="user.email" required />
            </div>
            <div class="mb-3">
              <InputComponent label="Username" type="text" v-model="user.username" required />
            </div>
            <div class="mb-3">
              <InputComponent label="CPF" type="text" v-model="user.cpf" />
            </div>
            <div class="mb-3">
              <InputComponent label="Telefone" type="text" v-model="user.telefone" />
            </div>
            <div class="mb-3">
              <InputComponent
                label="Data de Nascimento"
                type="date"
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
import InputComponent from '@/components/ui/Input.vue'
import { useAuthStore } from '@/modules/Auth/store'
import UserService from '@/modules/User/service'
import { useUserStore } from '../../store'

export default {
  name: 'EditPerfilView',
  components: {
    MainLayout,
    InputComponent
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

    console.log(user)

    return {
      user,
      salvarUsuario,
      isPerfil: router.currentRoute.value.name == 'editarPerfil'
    }
  }
}
</script>
