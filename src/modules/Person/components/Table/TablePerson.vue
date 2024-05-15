<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr class="table-dark">
          <th scope="col">Nome</th>
          <th scope="col">CPF</th>
          <th scope="col">Endereço</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in people" :key="person.id">
          <ItemTablePerson :person="person" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
table {
  margin-top: 20px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import ItemTablePerson from './ItemTablePerson.vue'
import type { Person } from '../../types'

export default defineComponent({
  name: 'TablePerson',
  components: {
    ItemTablePerson
  },
  props: {
    people: {
      type: Array as () => Person[],
      required: true
    }
  }
})
</script>
