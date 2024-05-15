<template>
  <div class="row">
    <div class="col-md-12">
      <h5 class="card-title text-center mb-3">Informações do endereço</h5>
      <div class="row">
        <div class="col-md-6">
          <p><strong>CEP:</strong> {{ ender.cep }}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Logradouro:</strong> {{ ender.logradouro }}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Número:</strong> {{ ender.numero }}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Complemento:</strong></p>
        </div>
        <div class="col-md-6">
          <p><strong>Bairro:</strong> {{ ender.bairro }}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Cidade:</strong> {{ ender.cidade }}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Estado:</strong> {{ ender.estado }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Address } from '@/modules/Person/types'

export default {
  name: 'EnderecoComponent',
  props: {
    endereco: {
      type: Object as () => Address,
      required: true
    }
  },
  setup(props) {
    return {
      ender: props.endereco
    }
  }
}
</script>
