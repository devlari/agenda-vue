<template>
  <div class="login">
    <div class="box">
      <h1 class="mb-4 text-center">Agenda</h1>
      <InputComponent placeholder="Insira seu login" type="string" />
      <InputComponent class="mt-2" placeholder="Insira sua senha" type="password" />
      <div class="form-check mt-2">
        <input class="form-check-input" type="checkbox" id="checkLembrar" />
        <label class="form-check-label" for="checkLembrar">Lembrar-me</label>
      </div>
      <button class="btn btn-primary mt-2">Login</button>
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

<script>
import InputComponent from '@/components/layout/Input.vue'

export default {
  name: 'LoginView',
  components: {
    InputComponent
  }
}
</script>
