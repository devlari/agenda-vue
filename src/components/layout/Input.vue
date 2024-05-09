<template>
  <div class="input">
    <input :placeholder="placeholder" :type="type" :value="value" class="form-control" />
  </div>
</template>

<style></style>

<script>
export default {
  name: 'InputComponent',
  props: {
    placeholder: {
      type: String,
      default: 'Enter your name'
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
