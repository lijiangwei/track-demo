import {bindTrackEvent} from './utils/hoc';
import {EventType, ElementType} from './utils/enum';
import {Modal} from 'antd-mobile';

const eventList = [
  EventType.POP,
  EventType.SELECT,
  EventType.SELECTALL,
  EventType.COPY,
]

const TrackModal = bindTrackEvent(eventList, ElementType.MODAL)(Modal);

export default TrackModal;
