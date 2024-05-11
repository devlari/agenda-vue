<template>
  <HeaderComponent />
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/layout/Header.vue'

export default {
  name: 'MainLayout',
  components: {
    HeaderComponent
  }
}
</script>
