import {bindTrackEvent} from './utils/hoc';
import {EventType, ElementType} from './utils/enum';
import {InputItem} from 'antd-mobile';

const TrackInputItem = bindTrackEvent([
  EventType.FOCUS,
  EventType.BLUR,
  EventType.COPY,
  EventType.CUT,
  EventType.PASTE,
  EventType.SELECT,
  EventType.SELECTALL,
  EventType.DELETE,
  EventType.INPUT,
  EventType.MOVECURSOR,
], ElementType.INPUT)(InputItem);

export default TrackInputItem;
