import {bindTrackEvent} from './utils/hoc';
import {EventType, ElementType} from './utils/enum';
import {Picker} from 'antd-mobile';

const TrackPicker = bindTrackEvent([
  EventType.PICKER,
  EventType.DISPLAY,
  EventType.SHOW,
  EventType.HIDE,
  EventType.CAMERA,
  EventType.SCREENSHOT,
], ElementType.PICKER)(Picker);

export default TrackPicker;
