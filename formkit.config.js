import { generateClasses } from '@formkit/themes';
const formkitConfig = {
  config: {
    classes: generateClasses({
      global: {
        label: 'block mb-1 font-bold text-gray-700',
        message: 'text-red-500 mb-1',
        wrapper: 'mb-4 space-y-2',
        input: 'w-full px-3 py-2 border-gray-300 text-gray-700 rounded-md',
      },
      text: {
        message: '$reset text-green-600',
      },
      file: {
        noFiles: 'block my-2 text-gray-500',
        fileItem: 'hidden',
      },
      submit: {
        input:
          '$reset bg-green-500 hover:bg-green-600 font-bold py-2 px-4 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed',
      },
    }),
  },
};

export default formkitConfig;
