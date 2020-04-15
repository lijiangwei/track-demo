import {bindTrackEvent} from './utils/hoc';
import {EventType, ElementType} from './utils/enum';
import {Picker} from 'antd-mobile';

const TrackPicker = bindTrackEvent([
  EventType.PICKER,
  EventType.DISPLAY,
], ElementType.SELECT)(Picker);

export default TrackPicker;
