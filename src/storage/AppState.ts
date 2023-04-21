import { atom } from 'jotai';
import { EditorValues } from '../models/EditorValues';
import { TargetResize } from '../models/TargetResize';

export interface AppState {
  images: TargetResize[];
  editorValues: EditorValues;
}
export const appState = atom<AppState>({
  images: [],
  editorValues: {
    variant: 'by_percentage',
    height: null,
    width: 500,
    percentage: 0.5,
    withEnlarge: false,
    withMaintainAspectRatio: true,
  },
});
