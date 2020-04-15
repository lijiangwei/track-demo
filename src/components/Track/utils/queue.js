class TrackQueue {

  constructor(){
    this.queue = [];
  }

  /**
   * 添加操作事件类型
   * @param {*} trackEvent 一次操作事件
   */
  push(trackEvent){
    console.log(trackEvent.eventid);
    this.queue.push(trackEvent);
  }

  /**
   * 向后台发送收集的数据
   */
  send(){

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

}

const trackQueue = new TrackQueue();

export {trackQueue}
