<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import Link from '../../components/Link.vue';
import useImages from '../../composables/useImages';
import { useProductsStore } from '../../stores/products';

const { url, isImageUploaded, onFileChange } = useImages();
const productsStore = useProductsStore();
const router = useRouter();

const formData = reactive({
  name: '',
  image: '',
  category: '',
  price: '',
  available: '',
});

const submitHandler = async (data) => {
  const { image, ...product } = data;

  try {
    await productsStore.createProduct({
      ...product,
      image: url.value,
    });
    router.push({ name: 'products' });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <Link to="products">Volver</Link>
  </div>
  <h1 class="text-4xl font-black my-10">Nuevo producto</h1>
  <div class="flex justify-center bg-white shadow">
    <div class="mt-10 p-10 w-full 2xl:w-2/4">
      <FormKit
        type="form"
        submit-label="Agregar Producto"
        incomplete-message="Completa todos los campos"
        @submit="submitHandler"
        :values="formData"
      >
        <FormKit
          type="text"
          label="Nombre"
          name="name"
          placeholder="nombre de producto"
          validation="required"
          :validation-messages="{
            required: 'El nombre del producto es requerido',
          }"
          v-model.trim="formData.name"
        />
        <FormKit
          type="file"
          label="Imagen Producto"
          name="image"
          validation="required"
          :validation-messages="{
            required: 'La imagen del producto es requerida',
          }"
          accept=".jpg,.png,.jpeg"
          @change="onFileChange"
          v-model="formData.image"
        />
        <div v-if="isImageUploaded">
          <p class="font-bold">Imagen del Producto:</p>
          <img
            :src="url"
            alt="Imagen del producto"
            class="w-32"
          />
        </div>
        <FormKit
          type="select"
          label="Categoría"
          name="category"
          validation="required"
          :validation-messages="{
            required: 'La categoría del producto es requerida',
          }"
          :options="productsStore.categoryOptions"
          v-model="formData.category"
        />
        <FormKit
          type="number"
          label="Precio"
          name="price"
          placeholder="precio del producto"
          validation="required"
          :validation-messages="{
            required: 'El precio del producto es requerido',
          }"
          min="1"
          v-model.number="formData.price"
        />
        <FormKit
          type="number"
          label="Disponible"
          name="available"
          placeholder="disponibilidad del producto"
          validation="required"
          :validation-messages="{
            required: 'La disponibilidad del producto es requerida',
          }"
          min="1"
          v-model.number="formData.available"
        />
      </FormKit>
    </div>
  </div>
</template>

<style scope></style>
