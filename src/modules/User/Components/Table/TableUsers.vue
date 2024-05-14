<template>
  <table class="table table-striped">
    <thead>
      <tr class="table-dark">
        <th scope="col">Nome</th>
        <th scope="col">Email</th>
        <th scope="col">CPF</th>
        <th scope="col">Telefone</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <ItemTableUsers :user="user" />
      </tr>
    </tbody>
  </table>
</template>

<style>
table {
  margin-top: 20px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import ItemTableUsers from '../Table/ItemTableUsers.vue'
import type { User } from '../../types'

export default defineComponent({
  name: 'TableUsers',
  components: {
    ItemTableUsers
  },
  props: {
    users: {
      type: Array as () => User[],
      required: true
    }
  }
})
</script>
