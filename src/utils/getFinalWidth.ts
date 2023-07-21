import { EditorValues } from '../models/EditorValues';
import { TargetResize } from '../models/TargetResize';

interface GetFinalWidth {
  image: TargetResize;
  editorValues: EditorValues;
}

export const getFinalWidth = ({ editorValues, image }: GetFinalWidth) => {
  const value_ = editorValues.variant === 'by_percentage' ? image.width * editorValues.percentage : editorValues.width;
  return !editorValues.withEnlarge ? value_ : Math.min(value_, image.width);
};
