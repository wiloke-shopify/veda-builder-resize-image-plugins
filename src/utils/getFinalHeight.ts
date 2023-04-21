import { EditorValues } from '../models/EditorValues';
import { TargetResize } from '../models/TargetResize';

const getAspectRatio = (image: TargetResize) => {
  return image.height / image.width;
};

export interface GetFinalHeight {
  image: TargetResize;
  editorValues: EditorValues;
}

export const getFinalHeight = ({ editorValues, image }: GetFinalHeight) => {
  const aspectRatio = getAspectRatio(image);
  const value_ =
    editorValues.variant === 'by_percentage'
      ? image.height * editorValues.percentage
      : editorValues.withMaintainAspectRatio || !editorValues.height
      ? editorValues.width * aspectRatio
      : editorValues.height;
  return editorValues.withEnlarge ? value_ : Math.min(value_, image.height);
};
