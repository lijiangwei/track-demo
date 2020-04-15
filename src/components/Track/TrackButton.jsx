import {bindTrackEvent} from './utils/hoc';
import {EventType, ElementType} from './utils/enum';
import {Button} from 'antd-mobile';

const TrackButton = bindTrackEvent([EventType.CLICK], ElementType.BUTTON)(Button);

export default TrackButton;
