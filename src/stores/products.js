import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore, useCollection } from 'vuefire';
import {
  collection,
  addDoc,
  where,
  query,
  limit,
  orderBy,
} from '@firebase/firestore';
export const useProductsStore = defineStore('products', () => {
  const db = useFirestore();
  const q = query(collection(db, 'products'));
  const productsCollection = useCollection(q);
  const categories = [
    {
      id: 1,
      name: 'Sudaderas',
    },
    {
      id: 2,
      name: 'Tenis',
    },
    {
      id: 3,
      name: 'Lentes',
    },
  ];
  const categoryOptions = computed(() => {
    const options = [
      {
        label: 'Selecciona una categoria',
        value: '',
        attrs: { disabled: true },
      },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ];
    return options;
  });

  async function createProduct(product) {
    await addDoc(collection(db, 'products'), product);
  }

  return {
    createProduct,
    categoryOptions,
    productsCollection,
  };
});
