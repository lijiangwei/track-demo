import React from 'react';
import {bindTrackEvent} from './utils/hoc';
import {EventType, ElementType} from './utils/enum';

function Input(props){
  return <input {...props} />
}

const TrackInput = bindTrackEvent([
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
], ElementType.INPUT)(Input);

export default TrackInput;
