<script setup>
import { useProductsStore } from '../stores/products';
import Link from './Link.vue';
import Logo from './Logo.vue';

const productsStore = useProductsStore();
</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10"
  >
    <div>
      <Logo />
      <div class="flex gap-5 text-white">
        <h2 class="text-lg font-extrabold">Filtros</h2>
        <div
          class="flex items-center gap-2"
          v-for="category in productsStore.categories"
          :key="category.id"
        >
          <label class="text-gray-100">{{ category.name }}</label>
          <input
            type="radio"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            name="category"
            :value="category.id"
            :checked="productsStore.selectedCategory === category.id"
            v-model="productsStore.selectedCategory"
          />
        </div>
      </div>
    </div>
    <nav>
      <Link to="admin">Administración</Link>
    </nav>
  </header>
</template>
