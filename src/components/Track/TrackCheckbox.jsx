import {bindTrackEvent} from './utils/hoc';
import {EventType, ElementType} from './utils/enum';
import {Checkbox} from 'antd-mobile';

const {CheckboxItem, AgreeItem} = Checkbox;

const eventList = [
  EventType.CHECKED,
]

const TrackCheckbox = bindTrackEvent(eventList, ElementType.CHECKBOX)(Checkbox);
TrackCheckbox.CheckboxItem = bindTrackEvent(eventList, ElementType.CHECKBOX)(CheckboxItem);
TrackCheckbox.AgreeItem = bindTrackEvent(eventList, ElementType.CHECKBOX)(AgreeItem);

export default TrackCheckbox;
