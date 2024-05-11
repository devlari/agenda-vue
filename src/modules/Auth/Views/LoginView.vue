<template>
  <div class="login">
    <div class="box">
      <h1 class="text-center">Agenda</h1>
      <div class="mb-3 d-flex justify-content-center">
        <PhAddressBookTabs :size="32" color="black" weight="fill" />
      </div>
      <InputComponent class="mt-2" placeholder="Insira seu login" type="text" v-model="username" />
      <InputComponent
        class="mt-2"
        placeholder="Insira sua senha"
        type="password"
        v-model="password"
      />
      <div class="form-check mt-2">
        <input class="form-check-input" type="checkbox" id="checkLembrar" v-model="remember" />
        <label class="form-check-label" for="checkLembrar">Lembrar-me</label>
      </div>
      <button class="btn btn-primary mt-2" @click="handleLogin">Login</button>
    </div>
  </div>
</template>

<style>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--black);
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  height: 50vh;
  width: 50vh;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PhAddressBookTabs } from '@phosphor-icons/vue'
import SweetAlert from 'sweetalert2'
import InputComponent from '@/components/ui/Input.vue'
import AuthService from '../service'
import { useAuthStore } from '../store'

export default defineComponent({
  components: {
    InputComponent,
    PhAddressBookTabs
  },
  setup() {
    const username = ref('')
    const password = ref('')
    const remember = ref(false)
    const router = useRouter()
    const authStore = useAuthStore()
    const service = new AuthService()

    const handleLogin = async () => {
      if (!username.value || !password.value) {
        await SweetAlert.fire({
          title: 'Atenção!',
          text: 'Preencha todos os campos',
          icon: 'warning'
        })
        return
      }

      try {
        const info = await service.login({ username: username.value, password: password.value })
        await authStore.login(info)
        router.push({ name: 'home' })
      } catch (error) {
        await SweetAlert.fire({
          title: 'Atenção!',
          text: 'Usuário ou senha inválidos',
          icon: 'error'
        })
      }
    }

    return {
      username,
      password,
      remember,
      handleLogin
    }
  }
})
</script>
