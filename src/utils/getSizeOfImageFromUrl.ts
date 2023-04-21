interface Size {
  width: number;
  height: number;
}

export const getSizeOfImageFromUrl = (url: string) => {
  return new Promise<Size>((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      resolve({
        width: image.width,
        height: image.height,
      });
    };
    image.onerror = error => {
      reject(error);
    };
  });
};
