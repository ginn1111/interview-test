import { useState } from 'react';

export function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const useUploadFile = () => {
  const [files, setFiles] = useState<{ name: string; image: string }[]>([]);

  async function handleUploadFile(file: File) {
    const base64 = await fileToBase64(file);
    setFiles([...files, { name: file.name, image: base64 }]);
  }

  return {
    files,
    handleUploadFile,
  };
};

export default useUploadFile;
