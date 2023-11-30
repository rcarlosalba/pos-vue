<script setup>
import Link from '../../components/Link.vue';
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
        />
        <FormKit
          type="select"
          label="Categoría"
          name="category"
          validation="required"
          :validation-messages="{
            required: 'La categoría del producto es requerida',
          }"
          :options="[
            { label: 'Categoría 1', value: '1' },
            { label: 'Categoría 2', value: '2' },
            { label: 'Categoría 3', value: '3' },
          ]"
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
        />
      </FormKit>
    </div>
  </div>
</template>

<style scope></style>
