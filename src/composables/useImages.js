import { ref, computed } from 'vue';
import { useFirebaseStorage } from 'vuefire';
import {
  ref as storegeRef,
  uploadBytesResumable,
  getDownloadURL,
} from '@firebase/storage';
import { uid } from 'uid';

export default function useImages() {
  const storage = useFirebaseStorage();
  const url = ref(null);
  const onFileChange = (e) => {
    // obtener el archivo
    const file = e.target.files[0];
    // generar un nombre unico para el archivo
    const fileName = uid() + '.jpg';
    // obtener la referencia al archivo
    const sRef = storegeRef(storage, '/products/' + fileName);
    // subir el archivo
    const uploadTask = uploadBytesResumable(sRef, file);
    // escuchar los cambios en la subida del archivo
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          url.value = downloadURL;
        });
      }
    );
  };

  const isImageUploaded = computed(() => {
    return url.value ? url.value : null;
  });

  return {
    onFileChange,
    isImageUploaded,
    url,
  };
}
