// import $nativeCall from 'zx-utils/nativeCall';

/**
 * 操作类型定义
 */
export const EventType = {
  //点击操作
  CLICK: {
    eventName: 'Click', //元素绑定的事件
    eventType: 'click', //传给后台的事件类型
  },
  //光标移入
  FOCUS: {
    eventName: 'Focus',
    eventType: 'focus',
  },
  //光标移出
  BLUR: {
    eventName: 'Blur',
    eventType: 'blur',
  },
  //输入
  INPUT: {
    eventName: 'Input',
    eventType: 'input',
  },
  //删除
  DELETE: {
    eventName: 'KeyDown',
    eventType: 'delete',
  },
  //拷贝
  COPY: {
    eventName: 'Copy',
    eventType: 'copy',
  },
  //粘贴
  PASTE: {
    eventName: 'Paste',
    eventType: 'paste',
  },
  //剪切
  CUT: {
    eventName: 'Cut',
    eventType: 'cut',
  },
  /**
   * 点选
   * 适用于checkbox、radio
   * */
  CHECKED: {
    eventName: 'Change',
    eventType: 'checked',
  },
  //文字-选中
  SELECT: {
    eventName: 'Select',
    eventType: 'select',
  },
  //文字-全选
  SELECTALL: {
    eventName: 'Select',
    eventType: 'selectall',
  },
  /**
   * 选择
   * select、picker控件
   */
  PICKER: {
    eventName: 'Ok',
    eventType: 'select',
  },
  /**
   * 反显
   * select、picker控件
   */
  DISPLAY: {
    eventName: 'Display',
    eventType: 'display',
  },
  //移动光标
  MOVECURSOR: {
    eventName: 'Select',
    eventType: 'movecursor',
  },
  //弹出
  POP: {
    eventName: 'Pop',
    eventType: 'pop',
  },
  //截屏
  SCREENSHOT: {
    eventName: 'CustomEvent',
    eventType: 'screenshot',
  },
  //跳入
  SHOW: {
    eventName: 'CustomEvent',
    eventType: 'show',
  },
  //跳出
  HIDE: {
    eventName: 'CustomEvent',
    eventType: 'hide',
  },
  //录屏
  CAMERA: {
    eventName: 'CustomEvent',
    eventType: 'camera',
  }
}

/**
 * 元素类型定义
 */
export const ElementType = {
  INPUT: 'input',
  CHECKBOX: 'checkbox',
  BUTTON: 'button',
  SELECT: 'select',
  PICKER: 'picker',
  MODAL: 'modal',
}

//过滤不支持的版本
// export const isSupportTrack = $nativeCall.getClientVersion() > 400 ? true : false;
export const isSupportTrack = true;
