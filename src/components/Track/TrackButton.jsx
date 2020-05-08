import React from 'react';
import { bindTrackEvent } from './utils/hoc';
import { EventType, ElementType } from './utils/enum';
import { Button } from 'antd-mobile';

const TrackButton = bindTrackEvent(
  [EventType.CLICK],
  ElementType.BUTTON
)(Button);

function CustomAnchor(props) {
  return <a {...props}>{props.children}</a>;
}

function CustomImg(props) {
  return <img {...props} />;
}

const TrackA = bindTrackEvent(
  [EventType.CLICK],
  ElementType.BUTTON
)(CustomAnchor);
const TrackImg = bindTrackEvent(
  [EventType.CLICK],
  ElementType.BUTTON
)(CustomImg);

export default TrackButton;

export { TrackA, TrackImg };
