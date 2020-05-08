import React from 'react';
import { bindTrackEvent } from './utils/hoc';
import { EventType, ElementType } from './utils/enum';
import { Modal, Menu, List } from 'antd-mobile';

class PickerMenu extends React.Component {
  state = {
    value: [],
    label: '',
    visible: false,
  };

  componentDidMount() {
    if (this.props.value) {
      this.setState({
        value: this.props.value,
      });
      this.setLabel(this.props.value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
      this.setLabel(nextProps.value);
    }
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
    this.triggerParentEvent('onPickerChange', value);
  };

  handleOk = () => {
    this.setLabel(this.state.value);
    this.toggleVisible(false);
    this.triggerParentEvent('onOk', this.state.value);
  };

  handleClose = () => {
    this.toggleVisible(false);
    this.triggerParentEvent('onDismiss');
  };

  setLabel = (value) => {
    const { data } = this.props;
    let label = '';
    for (let i = 0; i < data.length; i++) {
      if (data[i].value === value[0]) {
        label = data[i].label + ',';
        if (data[i].children) {
          let tmp = data[i].children;
          for (let j = 0; j < tmp.length; j++) {
            if (tmp[j].value === value[1]) {
              label += tmp[j].label;
              break;
            }
          }
        }
        break;
      }
    }
    this.setState({
      label,
    });
  };

  toggleVisible = (visible) => {
    this.setState({
      visible,
    });
    this.triggerParentEvent('onVisibleChange', visible);
  };

  triggerParentEvent = (eventName, args) => {
    if (typeof this.props[eventName] === 'function') {
      this.props[eventName](args);
    }
  };

  render() {
    const { data, visible, onClose, ...rest } = this.props;
    const menuProps = {
      data,
    };
    return (
      <div>
        <List.Item
          arrow="horizontal"
          extra={this.state.label}
          onClick={() => this.toggleVisible(true)}
        >
          选择职业
        </List.Item>
        <Modal
          {...rest}
          animationType="slide-up"
          visible={this.state.visible}
          popup
        >
          <div className="am-picker-popup-header">
            <div
              className="am-picker-popup-item am-picker-popup-header-left"
              onClick={this.handleClose}
            >
              取消
            </div>
            <div className="am-picker-popup-item am-picker-popup-title"></div>
            <div
              className="am-picker-popup-item am-picker-popup-header-right"
              onClick={this.handleOk}
            >
              确定
            </div>
          </div>
          <Menu
            {...menuProps}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </Modal>
      </div>
    );
  }
}

const TrackPickerMenu = bindTrackEvent(
  [
    EventType.PICKER,
    EventType.DISPLAY,
    EventType.SHOW,
    EventType.HIDE,
    EventType.CAMERA,
    EventType.SCREENSHOT,
  ],
  ElementType.PICKERMENU
)(PickerMenu);

export default TrackPickerMenu;
