<template>
  <div
    class="d-flex align-items-center p-2 border-bottom list-group-item"
    @click="goToPersonDetails"
  >
    <PhotoComponent :photoId="person.id" />
    <div>
      <h5 class="mb-0">{{ person.nome }}</h5>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f0f0f0;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Person } from '@/modules/Person/types'
import PhotoComponent from '@/modules/Person/Photo/Components/Photo.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PersonListItem',
  components: {
    PhotoComponent
  },
  props: {
    person: {
      type: Object as () => Person,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const goToPersonDetails = async () => {
      await router.push({
        name: 'contatosPessoa',
        params: {
          id: props.person.id.toString()
        }
      })
    }

    return {
      goToPersonDetails
    }
  }
})
</script>
