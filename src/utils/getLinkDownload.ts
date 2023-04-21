import { EditorValues } from '../models/EditorValues';
import { TargetResize } from '../models/TargetResize';
import { getFinalHeight } from './getFinalHeight';
import { getFinalWidth } from './getFinalWidth';

interface GetLinkDownload {
  image: TargetResize;
  editorValues: EditorValues;
}

interface Result {
  url: string;
  fileName: string;
}

export const getLinkDownload = ({ editorValues, image }: GetLinkDownload) => {
  return new Promise<Result>((resolve, reject) => {
    const finalWidth = getFinalWidth({ editorValues, image });
    const finalHeight = getFinalHeight({ editorValues, image });
    // Create an image element with the given src
    const $image = new Image();
    $image.src = image.url;
    $image.width = finalWidth;
    $image.height = finalHeight;
    $image.style.objectFit = 'contain';
    $image.onload = () => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = $image.width;
      canvas.height = $image.height;

      // Draw the image on the canvas
      const ctx = canvas.getContext('2d');
      ctx?.drawImage($image, 0, 0, finalWidth, finalHeight);

      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');
      resolve({
        url: dataUrl,
        fileName: `${image.name}_${finalWidth}x${finalHeight}_.${image.mimeType}`,
      });
    };
    $image.onerror = error => {
      reject(error);
    };
  });
};
