<template>
  <div>
    <div class="input">
      <label class="form-label" v-if="label" :for="id">{{ label }}{{ required ? '*' : '' }}</label>
      <input
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        :class="['form-control', { required: required }]"
        @input="handleInput"
        :id="id"
        :required="required"
      />
    </div>
  </div>
</template>

<style>
.required {
  border-color: rgba(255, 115, 115, 0.5);
}
</style>

<script>
export default {
  name: 'InputComponent',
  props: {
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text',
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: '',
      required: true
    },
    label: {
      type: String
    },
    id: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
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
