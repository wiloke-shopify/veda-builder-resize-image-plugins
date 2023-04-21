import { Key } from 'react';

export type MimeType =
  | 'image/avif'
  | 'image/bmp'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/tiff'
  | 'image/webp';

export interface TargetResize {
  id: Key;
  name: string;
  url: string;
  width: number;
  height: number;
  mimeType: MimeType;
}
