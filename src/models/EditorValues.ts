export interface EditorValues {
  variant: 'by_pixels' | 'by_percentage';
  percentage: number;
  width: number;
  height: number | null;
  withMaintainAspectRatio: boolean;
  withEnlarge: boolean;
}
