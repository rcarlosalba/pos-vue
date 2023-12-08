import { ref, computed, watchEffect } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const taxes = ref(0);
  const subtotal = ref(0);
  const total = ref(0);
  const MAX_PRODUCTS = 5;
  const TAX_RATES = 0.12;

  function addItem(item) {
    const itemExists = isItemInCart(item.id);
    if (itemExists >= 0) {
      if (isProductAvailable(item, itemExists)) return;
      items.value[itemExists].quantity += 1;
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id });
    }
  }

  watchEffect(() => {
    subtotal.value = items.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    taxes.value = subtotal.value * TAX_RATES;
    total.value = subtotal.value + taxes.value;
  });

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id);

  const isProductAvailable = (item, index) => {
    return (
      items.value[index].quantity >= item.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    );
  };

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  const isEmpty = computed(() => items.value.length === 0);

  const checkItemAvailability = computed(() => {
    return (item) =>
      item.availability < MAX_PRODUCTS ? item.availability : MAX_PRODUCTS;
  });

  return {
    addItem,
    updateQuantity,
    removeItem,
    items,
    subtotal,
    taxes,
    total,
    isEmpty,
    checkItemAvailability,
  };
});
