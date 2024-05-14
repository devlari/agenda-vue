<template>
  <td>
    <router-link :to="`/usuarios/${user.id}`">{{ user.nome }}</router-link>
  </td>
  <td>{{ user.email }}</td>
  <td>{{ user.cpf }}</td>
  <td>{{ user.telefone }}</td>
  <td>
    <router-link
      :to="{ name: 'editarUsuario', params: { id: user.id } }"
      class="btn btn-outline-primary"
      >Editar</router-link
    >
    <!-- <button class="btn btn-danger">Excluir</button> -->
  </td>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { User } from '../../types'

export default defineComponent({
  name: 'ItemTableUsers',
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  }
})
</script>
