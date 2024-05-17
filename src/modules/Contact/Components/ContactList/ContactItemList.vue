<template>
  <div v-if="con.tipoContato == 'EMAIL'">
    <PhEnvelopeOpen size="25" />
    <strong>{{ con.tipoContato }}</strong>
    <span class="badge bg-primary ms-2">{{ con.tag }}</span>
    <p>{{ con.email }}</p>
  </div>
  <div v-else-if="con.tipoContato == 'TELEFONE'">
    <PhPhoneList size="25" />
    <strong>{{ con.tipoContato }}</strong>
    <span class="badge bg-primary ms-2">{{ con.tag }}</span>
    <p>{{ con.telefone }}</p>
  </div>
  <div v-else-if="con.tipoContato == 'CELULAR'">
    <PhDeviceMobile size="25" />
    <strong>{{ con.tipoContato }}</strong>
    <span class="badge bg-primary ms-2">{{ con.tag }}</span>
    <p>{{ con.telefone }}</p>
  </div>

  <div>
    <button class="btn btn-outline-primary me-2"><PhPencil /></button>
    <button class="btn btn-danger" @click="deletarContato(con.id)"><PhTrash /></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Contact } from '../../types'
import { PhEnvelopeOpen, PhDeviceMobile, PhPhoneList, PhPencil, PhTrash } from '@phosphor-icons/vue'

export default defineComponent({
  name: 'ContactItemList',
  components: {
    PhEnvelopeOpen,
    PhDeviceMobile,
    PhPhoneList,
    PhPencil,
    PhTrash
  },
  props: {
    con: {
      type: Object as () => Contact,
      required: true
    },
    deletarContato: {
      type: Function as PropType<(id: number) => void>,
      required: true
    }
  }
})
</script>
