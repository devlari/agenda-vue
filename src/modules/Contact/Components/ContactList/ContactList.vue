<template>
  <div v-for="con in contacts" :key="con.id" class="contact d-flex justify-content-between">
    <ContactItemList :con="con" :deletarContato="deletarContato" />
  </div>
</template>

<style scoped>
.contact {
  padding: 10px;
  border-radius: 5px;
}

.contact p {
  margin: 0;
}

.contact:hover {
  cursor: pointer;
  background-color: #f5f5f5;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Contact } from '@/modules/Contact/types'
import ContactItemList from './ContactItemList.vue'
export default defineComponent({
  name: 'ContactList',
  components: {
    ContactItemList
  },
  props: {
    contacts: {
      type: Array as PropType<Contact[]>,
      required: true
    },
    deletarContato: {
      type: Function as PropType<(id: number) => void>,
      required: true
    }
  }
})
</script>
