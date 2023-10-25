export const parseBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (window.FileReader && file) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
