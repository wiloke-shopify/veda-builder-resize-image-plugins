import { Segmented, SegmentedProps } from 'antd';
import { useAtom } from 'jotai';
import { EditorValues } from '../../../../../../models/EditorValues';
import { appState } from '../../../../../../storage/AppState';
import styles from './Header.module.css';
import ByPercentageImage from './images/by_percentage.svg';
import ByPixelsImage from './images/by_pixels.svg';
import './CustomAnt.css';

export const Header = () => {
  const [{ editorValues }, setState] = useAtom(appState);

  const handleChangeTab: SegmentedProps['onChange'] = value => {
    setState(state => {
      return {
        ...state,
        editorValues: {
          ...state.editorValues,
          variant: value as EditorValues['variant'],
        },
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Resize options</div>
      <Segmented
        className="custom_segmented"
        value={editorValues.variant}
        onChange={handleChangeTab}
        options={[
          {
            value: 'by_pixels' as EditorValues['variant'],
            label: (
              <div className={styles.tab}>
                <img src={ByPixelsImage} alt="" />
                <div>By pixels</div>
              </div>
            ),
          },
          {
            value: 'by_percentage' as EditorValues['variant'],
            label: (
              <div className={styles.tab}>
                <img src={ByPercentageImage} alt="" />
                <div>By percentage</div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};
