<template>
  <MainLayout>
    <div class="row">
      <div class="col-md-12">
        <h2 class="mt-2 text-center">Perfil</h2>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Informações do usuário</h5>
            <p class="card-text">
              <!-- <strong>Nome:</strong> {{ user.name }} <br />
              <strong>Email:</strong> {{ user.email }} -->
            </p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import MainLayout from '@/components/layout/MainLayout.vue'

export default {
  name: 'PerfilView',
  data() {
    return {
      user: {}
    }
  },
  components: {
    MainLayout
  }
}
</script>
