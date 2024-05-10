<template>
  <div class="input">
    <input
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      class="form-control"
      @input="handleInput"
    />
  </div>
</template>

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
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      text: this.value
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
