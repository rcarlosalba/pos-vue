<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <h1>{{ product.name }}</h1>
</template>
