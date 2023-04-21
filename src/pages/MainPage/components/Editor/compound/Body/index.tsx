import { Form, InputNumber, InputNumberProps, Switch, SwitchProps } from 'antd';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { EditorValues } from '../../../../../../models/EditorValues';
import { appState } from '../../../../../../storage/AppState';
import styles from './Body.module.css';

const PERCENTAGES = [0.25, 0.5, 0.75];

export const Body = () => {
  const [{ editorValues }, setState] = useAtom(appState);

  const handleChangePercentage = (percentage: EditorValues['percentage']) => {
    setState(state => {
      return {
        ...state,
        editorValues: {
          ...state.editorValues,
          percentage,
        },
      };
    });
  };

  const handleChangeWidth: InputNumberProps<number>['onChange'] = value => {
    setState(state => ({
      ...state,
      editorValues: {
        ...state.editorValues,
        width: value ?? 1,
        height: state.editorValues.withMaintainAspectRatio ? null : state.editorValues.height,
      },
    }));
  };

  const handleChangeHeight: InputNumberProps<number>['onChange'] = value => {
    setState(state => ({
      ...state,
      editorValues: {
        ...state.editorValues,
        height: value,
      },
    }));
  };

  const handleChangeMaintainAspectRaio: SwitchProps['onChange'] = checked => {
    setState(state => {
      return {
        ...state,
        editorValues: {
          ...state.editorValues,
          withMaintainAspectRatio: checked,
          height: null,
        },
      };
    });
  };
  const handleChangeEnlarge: SwitchProps['onChange'] = checked => {
    setState(state => {
      return {
        ...state,
        editorValues: {
          ...state.editorValues,
          withEnlarge: checked,
        },
      };
    });
  };

  const renderTab = () => {
    if (editorValues.variant === 'by_pixels') {
      return (
        <div className={styles.pixels_tab}>
          <div className={styles.pixel_field}>RESIZE ALL IMAGES TO A EXACT SIZE</div>
          <Form.Item label="Width (px)" className={classNames(styles.pixel_field, 'custom_form_item')}>
            <InputNumber<number>
              onChange={handleChangeWidth}
              value={editorValues.width}
              size="large"
              min={1}
              placeholder="Auto"
            />
          </Form.Item>
          <Form.Item label="Height (px)" className={classNames(styles.pixel_field, 'custom_form_item')}>
            <InputNumber<number>
              onChange={handleChangeHeight}
              disabled={editorValues.withMaintainAspectRatio}
              readOnly={editorValues.withMaintainAspectRatio}
              value={editorValues.height}
              size="large"
              min={1}
              placeholder="Auto"
            />
          </Form.Item>
          <Form.Item label="Maintain aspect ratio" className={classNames(styles.pixel_field, 'custom_form_item')}>
            <Switch
              onChange={handleChangeMaintainAspectRaio}
              checked={editorValues.withMaintainAspectRatio}
              size="default"
            />
          </Form.Item>
          <Form.Item label="Do not enlarge if smaller" className={classNames(styles.pixel_field, 'custom_form_item')}>
            <Switch onChange={handleChangeEnlarge} checked={editorValues.withEnlarge} size="default" />
          </Form.Item>
        </div>
      );
    }
    if (editorValues.variant === 'by_percentage') {
      return (
        <div className={styles.percentage_tab}>
          {PERCENTAGES.map(percentage => {
            const selected = editorValues.percentage === percentage;
            return (
              <div
                key={percentage}
                onClick={() => handleChangePercentage(percentage)}
                className={classNames(styles.percentage_field, {
                  [styles.selected]: selected,
                })}
              >
                {(percentage * 100).toFixed(0)}% smaller
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return <div className={styles.container}>{renderTab()}</div>;
};
