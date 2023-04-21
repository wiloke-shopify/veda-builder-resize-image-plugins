import { useAtom } from 'jotai';
import { PageTitle } from '../../components/PageTitle';
import { Upload } from '../../components/Upload';
import { TargetResize } from '../../models/TargetResize';
import { appState } from '../../storage/AppState';

export const StarterPage = () => {
  const [_, setState] = useAtom(appState);

  const handleUpload = (images: TargetResize[]) => {
    setState(state => {
      return {
        ...state,
        images,
      };
    });
  };

  return (
    <div>
      <div>
        <PageTitle
          title="Resize IMAGE"
          subTitle="Resize JPG, PNG, SVG or GIF by defining new height and width pixels. Change image dimensions in bulk."
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Upload onUpload={handleUpload} />
      </div>
    </div>
  );
};
