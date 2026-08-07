export type DownloadButtonProps = {
  targetRef: React.RefObject<HTMLElement>;
  filename: string;
};

// Implemented in the PNG export step: html-to-image capture at >=2048px
// wide, triggers a browser download.
export function DownloadButton(_props: DownloadButtonProps) {
  return null;
}
