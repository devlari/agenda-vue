<template>
  <MainLayout>
    <div class="row">
      <div class="col-md-12" v-if="contact.length > 0">
        <div class="card mt-4">
          <div class="card-body">
            <div class="row">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <PhotoComponent :photoId="contact[0].pessoa.id" />
                <strong> {{ contact[0].pessoa.nome }} </strong>
                <router-link
                  :to="{ name: 'novoContato', params: { id: contact[0].pessoa.id } }"
                  class="btn btn-primary"
                  >Novo</router-link
                >
              </div>
              <div>
                <ContactList :contacts="contact" :deletarContato="deletarContato" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12" v-else>
        <div class="card mt-4">
          <div class="card-body">
            <div class="row">
              <h3 class="text-center">Nenhum contato encontrado</h3>
              <!-- <router-link
                :to="{ name: 'novoContato', params: { id: contact[0].pessoa.id } }"
                class="btn btn-primary mt-3"
                >Novo</router-link
              > -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import type { Contact } from '../types'
import { useAuthStore } from '@/modules/Auth/store'
import { useRouter } from 'vue-router'
import ContactService from '../service'
import ContactList from '../Components/ContactList/ContactList.vue'
import PhotoComponent from '@/modules/Person/Photo/Components/Photo.vue'
import Swal from 'sweetalert2'

const contact = ref([] as Contact[])

async function deletarContato(idCon: number) {
  // Erro 500 ao deletar contato
  const confirm = await Swal.fire({
    title: 'Atenção!',
    text: 'Deseja realmente excluir esse contato?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  })

  if (confirm.isConfirmed) {
    const authStore = useAuthStore()
    const router = useRouter()
    const authInfo = authStore.authInfo

    if (!authInfo) {
      await authStore.logout()
      router.push({ name: 'login' })
      return
    }

    const contactService = new ContactService(authInfo.accessToken)
    await contactService.removerContato(idCon)

    await Swal.fire({
      title: 'Sucesso!',
      text: 'Contato excluído com sucesso!',
      icon: 'success'
    })

    router.back()
  }
}

export default {
  name: 'ContactView',
  components: {
    MainLayout,
    PhotoComponent,
    ContactList
  },
  setup() {
    onMounted(async () => {
      const authStore = useAuthStore()
      const router = useRouter()
      const authInfo = authStore.authInfo

      if (!authInfo) {
        await authStore.logout()
        router.push({ name: 'login' })
        return
      }

      const { id } = router.currentRoute.value.params
      const contactService = new ContactService(authInfo.accessToken)
      const resContacts = await contactService.buscarContato(Number(id))

      if (resContacts.length === 0) {
        const confirm = await Swal.fire({
          title: 'Nenhum contato encontrado',
          text: 'Deseja criar um novo contato para esta pessoa?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não'
        })

        if (confirm.isConfirmed) {
          router.push({ name: 'novoContato', params: { id: id } })
        }

        return
      }

      contact.value = resContacts
    })

    console.log(contact)

    return {
      contact,
      deletarContato
    }
  }
}
</script>
