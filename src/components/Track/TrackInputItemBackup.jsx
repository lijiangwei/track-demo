import React from 'react';
import {TrackContext} from './utils/context';
import { InputItem } from 'antd-mobile';
import PropTypes from 'prop-types';
import EventType from './utils/enum';


const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

class TrackInputItem extends React.PureComponent {

  constructor(){
    super();
    // let eventList = ['copy', 'paste', 'cut'];
    // this.eventHandleProps = {}
    // eventList.forEach(eventName => {
    //   const capitalizeEventName = capitalize(eventName);
    //   this.eventHandleProps['on' + capitalizeEventName] = () => {
    //     this.pushData({
    //       eventType: eventName,
    //     });
    //   }
    // });
  }

  inputFlag = false;  //标记一次输入,失去焦点时设置为false

  componentDidMount(){
    // console.log(this.eventHandleProps);
  }

  handleFocus = (e) => {
    this.pushData({
      eventType: EventType.FOCUS,
    });
    const {onFocus} = this.props;
    if(typeof onFocus === "function"){
      onFocus(e);
    }
  }

  handleBlur = (e) => {
    this.inputFlag = false;
    this.pushData({
      eventType: 'blur',
    });
  }

  handleInput = (e) => {
    if(!this.inputFlag){
      console.log(e);
      this.inputFlag = true;
      this.pushData({
        eventType: 'input',
      });
    }
  }

  // onCopy = (e) => {
  //   this.pushData({
  //     eventType: 'copy',
  //   });
  // }

  pushData = (params) => {
    const {elementId} = this.props;
    this.context.push({
      elementId,
      ...params
    });
  }

  render(){
    const {elementId,onFocus, ...rest} = this.props;
    return (
      <InputItem
        {...rest}
        {...this.eventHandleProps}
        onInput={this.handleInput}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus} />
    )
  }
}

TrackInputItem.contextType = TrackContext;

TrackInputItem.propTypes = {
  elementId: PropTypes.string.isRequired, //元素编号
}

export default TrackInputItem;
