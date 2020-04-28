import { EventType, ElementType, isSupportTrack } from "./enum";
//版本定义
const version = "1.0.0";

class TrackQueue {

  constructor(){
    this.queue = [];
    this.extraInfo = {};
  }

  /**
   * 添加操作事件类型
   * @param {*} trackEvent 一次操作事件
   */
  push(trackEvent){
    if(isSupportTrack){
      const {
        elementId,
        elementType,
        pageId,
        eventType=EventType.CLICK.eventType
      } = trackEvent;
      let eventId = elementId ? `${pageId}_${elementId}_${eventType}_${version}`
        : `${pageId}__${eventType}_${version}`;
      this.queue.push({
        eventid: eventId,
        json: {
          V_DS: "ANDROID",
          V_SID: "",
          V_USER_ID: "",
          V_INDEX: Date.now(),
          V_PAGEID: pageId,
          V_PATH: encodeURIComponent(window.location.href),
          V_COMPONENT: elementId,
          V_TYPE: elementType,
          ...this.extraInfo,
        },
      });
      console.log(eventId);
    }
  }

  /**
   * 向后台发送收集的数据
   */
  send(){
    if(this.queue.length > 0){
      console.log(this.queue);
      this.clear();
    }
  }

  /**
   * 清空队列
   */
  clear(){
    this.queue = [];
  }

  /**
   * 获取队列大小
   * @returns {number} 队列大小
   */
  getSize(){
    return this.queue.length;
  }

  /**
   * 配置基础信息
   * @param {Object} data
   */
  configExtraInfo(data={}){
    this.extraInfo = data;
  }

}

const trackQueue = new TrackQueue();

export {trackQueue}
