<template>
  <div class="input-group me-3">
    <input
      type="text"
      class="form-control"
      placeholder="Pesquisar..."
      aria-label="Pesquisar..."
      aria-describedby="button-addon2"
      v-model="searchValue"
    />
    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="pesquisar">
      <PhMagnifyingGlass :size="25" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'

export default defineComponent({
  name: 'SearchComponent',
  components: {
    PhMagnifyingGlass
  },
  props: {
    search: {
      type: String,
      required: true
    },
    pesquisarFunc: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const searchValue = ref(props.search)

    watch(
      () => props.search,
      (newSearch) => {
        searchValue.value = newSearch
      }
    )

    return {
      searchValue,
      pesquisar: () => props.pesquisarFunc(searchValue.value)
    }
  }
})
</script>
