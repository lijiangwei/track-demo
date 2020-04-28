import {bindTrackEvent} from './utils/hoc';
import {EventType, ElementType} from './utils/enum';
import {Modal} from 'antd-mobile';
import PropTypes from "prop-types";

const eventList = [
  EventType.POP,
  EventType.SELECT,
  EventType.SELECTALL,
  EventType.COPY,
  EventType.SCREENSHOT,
  EventType.SHOW,
  EventType.HIDE,
  EventType.CAMERA,
]

const TrackModal = bindTrackEvent(eventList, ElementType.MODAL)(Modal);
TrackModal.propTypes = {
  visible: PropTypes.bool.isRequired,
}

export default TrackModal;
