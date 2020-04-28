import React from "react";
import { TrackContext } from "./context";
import { trackQueue } from "./queue";
import PropTypes from "prop-types";
import { EventType, ElementType, isSupportTrack } from "./enum";
import eventEmitter from './event';

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join("");

//不需要处理连续操作的事件
const ignoreEventTypeFlag = [
  EventType.COPY.eventType,
  EventType.PASTE.eventType,
  EventType.CUT.eventType,
  EventType.BLUR.eventType,
  EventType.CHECKED.eventType,
  EventType.SELECT.eventType,
  //select的选择和反显
  EventType.PICKER.eventType,
  EventType.DISPLAY.eventType,
  EventType.POP.eventType,
  EventType.SELECTALL.eventType,
];

//每个组件需要额外绑定的事件
const extraEvent = {
  [ElementType.PICKER]: ["VisibleChange"],
}

//当前激活的组件
let activeElement = null;

/**
 * form表单增加收集数据的功能
 * @param {string} pageId - 页面编号
 * @param {boolean} autoSend 是否自动发送数据
 */
function withTrack(pageId, autoSend=true) {
  /**
   * @param {Component} FormComponent 要采集数据的form表单
   */
  return function withTrack(FormComponent) {
    return class extends React.Component {

      constructor(props) {
        super(props);
        this.pageId = pageId;
        this.autoSend = autoSend;
        this.customEvent = {};
      }

      componentDidMount() {
        // trackQueue.clear();
        eventEmitter.on('CustomTrackEvent', this.handleCustomEvent);
      }

      componentWillUnmount() {
        //TODO 发送应该封装到queue，还是当前组件
        if(this.autoSend){
          trackQueue.send();
        }
        eventEmitter.removeListener('CustomTrackEvent', this.handleCustomEvent)
      }

      push = (data) => {
        //TODO 采集数据格式
        trackQueue.push({
          ...data,
          pageId: this.pageId,
        });
      };

      /**
       * 手动发送数据
       */
      send = () => {
        trackQueue.send();
      }

      /**
       * 设置当前激活的元素
       */
      setActiveElement = (elementCode) => {
        activeElement = elementCode;
      }

      removeActiveElement = (elementCode) => {
        if(activeElement === elementCode){
          activeElement = '';
        }
      }

      /**
       * 监听自定义事件
       * @param {Object} event
       */
      addEventListener = (event) => {
        for(let eventName in event){
          this.customEvent[eventName] = event[eventName].concat(this.customEvent[eventName] || []);
        }
      }

      handleCustomEvent = (eventType, elementId) => {
        if(elementId && this.customEvent[eventType]){
          let tmp = null;
          let flag = false;
          for(let i=0; i<this.customEvent[eventType].length; i++){
            tmp = this.customEvent[eventType][i];
            if(tmp.elementId === elementId){
              this.push({
                eventType,
                elementId,
                elementType: tmp.elementType,
              });
              flag = true;
              break;
            }
          }
          if(!flag){
            this.push({
              eventType,
            });
          }
        }else{  //页面级别
          this.push({
            eventType,
          });
        }
      }

      render() {
        const trackProps = {
          push: this.push,
          send: this.send,
          setActiveElement: this.setActiveElement,
          removeActiveElement: this.removeActiveElement,
          addEventListener: this.addEventListener,
        };
        return (
          <TrackContext.Provider value={trackProps}>
            <FormComponent {...this.props} />
          </TrackContext.Provider>
        );
      }
    };
  };
}

/**
 * 给组件添加监控事件
 * @param {Array} eventList - 监听的事件列表
 * @param {string} elementType - 元素类型
 */
function bindTrackEvent(eventList = [], elementType) {
  return function (WrappedComponent) {
    return class TrackEventComponent extends React.Component {
      static propTypes = {
        elementId: PropTypes.string.isRequired, //元素编号
      };

      static contextType = TrackContext;

      constructor(props) {
        super(props);
        this.elementType = elementType;
        //绑定所有事件
        this.eventHandleProps = {};

        if(isSupportTrack){
          //为了监控某些操作需要多绑定事件，触发这些事件时不发送数据，例如只监控输入，blur事件也需要绑定，要监控的原始操作保存在eventTypeList数组
          this.eventTypeList = [];
          this.customEventTypeList = {};
          //操作是否触发过的标记，触发过设置为true，某些事件连续触发算一次操作
          this.eventTypeFlag = {};

          //react不能绑定多个相同事件，把list转成map
          let bindEventMap = {};
          eventList.forEach(({ eventName, eventType }) => {
            if(eventName === 'CustomEvent'){
              if(!this.customEventTypeList[eventType]){
                this.customEventTypeList[eventType] = [{
                  elementId: this.props.elementId,
                  elementType,
                }];
              }else{
                this.customEventTypeList[eventType].push({
                  elementId: this.props.elementId,
                  elementType,
                });
              }
            }else{
              this.eventTypeList.push(eventType);
              if (!bindEventMap[eventName]) {
                bindEventMap[eventName] = [eventType];
              } else {
                bindEventMap[eventName].push(eventType);
              }
            }
          });

          //TODO 补充缺失的事件，采集输入操作，必须绑定focus和blur事件，传入的事件没有时需要补充进去
          if(extraEvent[elementType] && extraEvent[elementType].length > 0){
            extraEvent[elementType].forEach(eventName => {
              if (!bindEventMap[eventName]) {
                bindEventMap[eventName] = [];
              }
            })
          }

          for (let eventName in bindEventMap) {
            const capitalizeEventName = "on" + capitalize(eventName);
            this.eventHandleProps[capitalizeEventName] = this.bindEvent(
              capitalizeEventName,
              bindEventMap[eventName],
              elementType
            );
          }

        }

      }

      componentDidMount(){
        if(!isSupportTrack) return;
        this.context.addEventListener(this.customEventTypeList);
        if(this.elementType === ElementType.MODAL && this.props.visible){ //监控Modal弹出
          this.eventHandleProps['on' + EventType.POP.eventName]();
        }else if(this.elementType === ElementType.PICKER){ //Picker控件
          //TODO 如何判断初始值是正确的?
          if(this.props.value instanceof Array && this.props.value.length > 0){
            this.eventHandleProps['on' + EventType.DISPLAY.eventName]();
          }
        }
      }

      componentWillReceiveProps(nextProps){
        if(!isSupportTrack) return;
        if(this.elementType === ElementType.MODAL){ //监控Modal弹出
          if(!this.props.visible && nextProps.visible){
            this.eventHandleProps['on' + EventType.POP.eventName]();
            this.setActiveElement();
          }else if(this.props.visible && !nextProps.visible){
            this.removeActiveElement();
          }
        }else if(this.elementType === ElementType.PICKER){ //Picker控件
          //TODO 两个数组是否要深比较
          if(!this.isPickerOnOk && nextProps.value !== this.props.value){
            this.eventHandleProps['on' + EventType.DISPLAY.eventName]();
          }
          this.isPickerOnOk = false;
        }
      }

      /**
       * 设置某个操作已触发
       * @param {string} eventType 操作类型
       */
      setEventTypeFlag(eventType) {
        this.eventTypeFlag[eventType] = true;
      }

      /**
       * 重置事件标志位
       * @param {undefined|string|Array} eventType 操作类型
       */
      resetEventTypeFlag(eventType) {
        if(eventType){
          if(typeof eventType === "string"){
            eventType = [eventType];
          }
          eventType.forEach(type => delete this.eventTypeFlag[type]);
        }else{
          this.eventTypeFlag = {};
          this.hasDeletedText = false;
          this.hasPasted = false;
        }
      }

      /**
       * 给组件绑定事件
       * @param {string} eventName 事件名称
       * @param {Array} eventTypeList 要监控的操作列表
       * @param {string} elementType 元素类型
       */
      bindEvent = (eventName, eventTypeList, elementType) => {
        return (e, ...rest) => {
          // console.log(eventName);
          //TODO 处理特殊事件
          let lowerEventName = eventName.toLowerCase();
          switch (lowerEventName) {
            case 'onfocus':
              if(elementType === ElementType.INPUT){
                //antd-mobile InputItem组件没有传递事件对象
                let value = '';
                if(typeof e === "string"){
                  value = e;
                }else if(typeof e === "object" && e.currentTarget){
                  value = e.currentTarget.value;
                }
                this.prevSelectionEnd = this.prevValueLength = value.length;
                this.isSelectAll = ''; //select-选中 selectAll-选中全部

                //设置当前活动元素
                this.setActiveElement();
              }
              this.sendSelectType();
              this.pushData(eventTypeList);
              break;
            case "onblur":
                this.sendSelectType();
                this.pushData(eventTypeList);
                this.resetEventTypeFlag();
                this.removeActiveElement();
                break;
            case "oninput":
              //TODO 如何区分输入、删除、粘贴
              if(!this.hasPasted && !this.hasDeletedText){
                this.sendSelectType();
                //重置删除操作
                this.resetEventTypeFlag([
                  EventType.DELETE.eventType,
                ]);
                this.pushData(eventTypeList);
              }else{
                this.hasPasted = false;
                this.hasDeletedText = false;
              }
              this.resetEventTypeFlag([
                // EventType.DELETE.eventType,
                EventType.MOVECURSOR.eventType,
              ]);
              break;
            case "onkeydown":
              //删除操作
              if (typeof e === "object" && e.keyCode === 8) {
                this.hasDeletedText = true;
                this.sendSelectType();
                this.pushData(eventTypeList);
                //重置输入、移动光标操作
                this.resetEventTypeFlag([
                  EventType.MOVECURSOR.eventType,
                  EventType.INPUT.eventType
                ]);
              }
              break;
            case "onselect":
              //只处理了输入框
              if (
                elementType === ElementType.INPUT &&
                typeof e === "object" &&
                e.currentTarget
              ) {
                if (
                  "selectionStart" in e.currentTarget &&
                  "selectionEnd" in e.currentTarget
                ) {
                  const { selectionStart, selectionEnd, value } = e.currentTarget;

                  /**
                   * 移动光标
                   * 光标的位置变了 && 文本框内容长度没变 && 选择的开始位置==结束位置
                   */
                  if (
                    eventTypeList.indexOf(EventType.MOVECURSOR.eventType) > -1 &&
                    selectionStart === selectionEnd &&
                    this.prevValueLength === value.length && this.prevSelectionEnd !== selectionEnd
                  ) {
                    this.pushData([EventType.MOVECURSOR.eventType]);
                  }

                  /**
                   * 选中|全选
                   * 在粘贴|复制|剪切|输入|blur事件中发送操作
                   */
                  if((eventTypeList.indexOf(EventType.SELECT.eventType) > -1 ||
                      eventTypeList.indexOf(EventType.SELECTALL.eventType) > -1) && selectionEnd &&
                      selectionStart !== selectionEnd){
                        this.isSelectAll = selectionEnd - selectionStart === value.length ?
                        EventType.SELECTALL.eventType : EventType.SELECT.eventType;
                  }else if(this.isSelectAll){ //选择文字又取消-重置标志
                    this.isSelectAll = '';
                  }
                  //记录上次光标的位置和内容长度
                  this.prevSelectionEnd = selectionEnd;
                  this.prevValueLength = value.length;
                }
              }
              break;
            //TODO onpaste、oncut、oncopy是否要重置输入、删除操作
            case 'onpaste':
              this.hasPasted = true;
              this.sendSelectType();
              this.pushData(eventTypeList);
              //重置删除操作
              this.resetEventTypeFlag([
                EventType.DELETE.eventType
              ]);
              break;
            case 'oncut':
            case 'oncopy':
              this.sendSelectType();
              this.pushData(eventTypeList);
              break;
            case 'onok':
              if(elementType === ElementType.PICKER){ //选择框Picker
                this.isPickerOnOk = true;
                this.pushData(eventTypeList);
              }
              break;
            case 'onvisiblechange':
              if(elementType === ElementType.PICKER){ //选择框Picker
                if(e){
                  this.setActiveElement();
                }else{
                  this.removeActiveElement();
                }
              }
              break;
            default:
              this.pushData(eventTypeList);
              break;
          }

          //调用绑定的原始事件
          if (typeof this.props[eventName] === "function") {
            this.props[eventName](e, ...rest);
          }
        };
      };

      /**
       * 发送选中|全选操作
       */
      sendSelectType = () => {
        if(this.isSelectAll){
          this.pushData([this.isSelectAll]);
          this.isSelectAll = '';
        }
      }

      setActiveElement = () => {
        this.context.setActiveElement(this.props.elementId);
      }

      removeActiveElement = () => {
        this.context.removeActiveElement(this.props.elementId);
      }

      /**
       * 把操作类型放入发送队列
       * @param {Array} eventTypeList 操作类型
       */
      pushData = (eventTypeList) => {
        const { elementId } = this.props;
        eventTypeList.forEach(eventType => {
          if (ignoreEventTypeFlag.indexOf(eventType) > -1 || !this.eventTypeFlag[eventType]) {
            this.setEventTypeFlag(eventType);
            //TODO 采集数据格式
            this.context.push({
              elementId,
              elementType: elementType,
              eventType,
            });
          }
        });
      };

      render() {
        const { elementId, ...rest } = this.props;
        const newProps = {
          ...rest,
          ...this.eventHandleProps,
        };
        return <WrappedComponent {...newProps} />;
      }
    };
  };
}

/**
 * 接受客户端发送的事件
 * @param {String} eventType 事件名称
 */
window.receiveAppEvent = (eventType) => {
  if(isSupportTrack){
    eventEmitter.emit('CustomTrackEvent', eventType, activeElement);
  }
}

export { withTrack, bindTrackEvent };
