import data from '@/lib/data';

export const getRandomProduct = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.products || data.products.length === 0) {
        reject('No products available');
        return;
      }
      const randomProduct = data.products[Math.floor(Math.random() * data.products.length)];
      resolve(randomProduct); 
    }, 1000); 
  });
};
