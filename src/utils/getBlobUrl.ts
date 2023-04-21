import { RcFile } from 'antd/es/upload';
import { MIME_TYPES } from '../constants/MIME_TYPES';
import { MimeType } from '../models/TargetResize';

let counter = 0;
export const getBlobUrlFromUrl = async (url: string) => {
  counter++;
  const response = await fetch(url);
  const blob = await response.blob();
  const mimeType = MIME_TYPES[blob.type as keyof typeof MIME_TYPES];

  return {
    url: window.URL.createObjectURL(blob),
    name: `images_${counter}`,
    mimeType,
  };
};

export const getBlobUrlFromFile = async (file: RcFile) => {
  const url = window.URL.createObjectURL(file);
  const mimeType = file.type as MimeType;
  return {
    url,
    name: file.name.replace(MIME_TYPES[mimeType], ''),
    mimeType,
  };
};
