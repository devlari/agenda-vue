<template>
  <td>
    <router-link :to="`/pessoas/${person.id}`">{{ person.nome }}</router-link>
  </td>
  <td>{{ person.cpf }}</td>
  <td>
    <p>{{ person.endereco.cidade }} - {{ person.endereco.estado }}</p>
  </td>
  <td>
    <router-link
      :to="{ name: 'editarPessoa', params: { id: person.id } }"
      class="btn btn-outline-primary"
      >Editar</router-link
    >
    <button class="btn btn-danger ms-3" @click="deletarPessoa(person.id)">Excluir</button>
  </td>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Person } from '../../types'

export default defineComponent({
  name: 'ItemTablePerson',
  props: {
    person: {
      type: Object as () => Person,
      required: true
    },
    deletarPessoa: {
      type: Function as unknown as () => (id: number) => Promise<void>,
      required: true
    }
  }
})
</script>
