<template>
  <div>
    <img :src="photoSrc" :alt="photoAlt" class="rounded-circle me-2" width="50" height="50" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import PhotoService from '@/modules/Person/Photo/service'
import placeholderImage from '@/assets/placeholder.png'
import { useAuthStore } from '@/modules/Auth/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PhotoComponent',
  props: {
    photoId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const photoSrc = ref<string>(placeholderImage)
    const photoAlt = ref<string>('Sem foto disponível')

    onMounted(async () => {
      const authStore = useAuthStore()
      const router = useRouter()

      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }

      try {
        const photoService = new PhotoService(authInfo.accessToken)
        const base64String = await photoService.getPhoto(props.photoId)

        if (base64String) {
          photoSrc.value = `data:image/png;base64,${base64String}`
          photoAlt.value = 'Foto do usuário'
        }
      } catch (error) {
        console.error('Erro ao buscar a foto:', error)
      }
    })

    return {
      photoSrc,
      photoAlt
    }
  }
})
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>
