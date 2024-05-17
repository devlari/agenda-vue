<template>
  <div>
    <h3>Contatos</h3>
    <hr class="divider" />
    <div v-for="person in people" :key="person.id">
      <PersonListItem :person="person" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Person } from '@/modules/Person/types'
import PersonListItem from './PersonListItem.vue'

export default defineComponent({
  name: 'PersonList',
  components: {
    PersonListItem
  },
  props: {
    people: {
      type: Array as () => Person[],
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
