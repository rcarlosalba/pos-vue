<script setup>
import { formatCurrency } from '../helpers/index';
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="rounded bg-white shadow relative">
    <img
      :src="product.image"
      :alt="'Imagen de ' + product.name"
    />
    <div class="p-3 space-y-2">
      <h3 class="text-xl font-black text-gray-500">{{ product.name }}</h3>
      <p class="text-gray-500">Disponibles: {{ product.availability }}</p>
      <p class="font-extrabold text-2xl text-gray-900">
        {{ formatCurrency(product.price) }}
      </p>
    </div>
    <div>
      <button
        type="button"
        class="absolute top-3 -right-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 bg-indigo-500 text-white rounded-full"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
