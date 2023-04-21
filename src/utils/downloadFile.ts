export interface DownloadFile {
  url: string;
  fileName: string;
}

export const downloadFile = ({ fileName, url }: DownloadFile) => {
  // Create a download link
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  // Click the download link
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
