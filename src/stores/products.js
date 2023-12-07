import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire';
import {
  collection,
  addDoc,
  query,
  where,
  limit,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from '@firebase/firestore';
import { ref as storegeRef, deleteObject } from 'firebase/storage';
export const useProductsStore = defineStore('products', () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();
  const q = query(collection(db, 'products'));
  const productsCollection = useCollection(q);

  const selectedCategory = ref(1);

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

  const noResults = computed(() => {
    productsCollection.value.length === 0;
  });

  async function updateProduct(docRef, product) {
    const { image, url, ...productData } = product;
    if (image.length) {
      await updateDoc(docRef, {
        ...productData,
        image: url.value,
      });
    } else {
      await updateDoc(docRef, productData);
    }
  }

  async function deleteProduct(id) {
    if (confirm('¿Estas seguro de eliminar este producto?')) {
      // referencia al documento completo
      const docRef = doc(db, 'products', id);
      //  usamos getDoc para obtener la referencia del documento
      // y no todo el documento
      const docSnap = await getDoc(docRef);
      // sacamos la url de la imagen
      const { image } = docSnap.data();
      // referencia a la imagen en el storage
      const imageRef = storegeRef(storage, image);

      await Promise.all([deleteObject(imageRef), deleteDoc(docRef)]);
    }
  }

  const filterProducts = computed(() => {
    return productsCollection.value.filter(
      (product) => product.category === selectedCategory.value
    );
  });

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    categoryOptions,
    productsCollection,
    noResults,
    filterProducts,
    selectedCategory,
    categories,
  };
});
